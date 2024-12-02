

import './config/firebase';

import admin from 'firebase-admin';
import {setGlobalOptions} from 'firebase-functions';
import {onCall} from 'firebase-functions/v2/https';


type teacherNotificationParams = {
  bookId: number;
  bookTitle: string;
  chapterId: number;
  chapterTitle: string;
};
setGlobalOptions({
  region: 'europe-west1',
});

export const teacherNotification = onCall<teacherNotificationParams>(
    async (req, _res) => {
      try {
        const {bookId, chapterTitle, chapterId, bookTitle} = req.data;

        const userDoc = await admin
            .firestore()
            .doc(`login/${req.auth?.uid}`)
            .get();
        const studentIds: string[] = userDoc.data()?.students || [];
        const tokens = (
          await Promise.all(
              studentIds.map(async (studentId: string) => {
                const studentDoc = await admin
                    .firestore()
                    .doc(`login/${studentId}`)
                    .get();
                return studentDoc.data()?.notification_tokens || [];
              }),
          )
        ).flat();


        const pushReturn = await admin.messaging().sendEachForMulticast({
          tokens,
          data: {
            url: `com.siruplab.onboarding://chapterpage/${chapterTitle}/${bookId}/${chapterId}`,
          },
          notification: {
            title: 'Bonjour',
            body: `Veuillez consulter le chapitre ${chapterTitle} du livre ${bookTitle}`,
          },
        });
        console.info('PushResponse', pushReturn);

        return {result: 'Success'};
      } catch (error) {
        console.error('Error fetching document:', error);
        return {error: 'Error fetching document'};
      }
    },
);
