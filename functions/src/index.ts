import './config/firebase';

import admin from 'firebase-admin';
import {setGlobalOptions} from 'firebase-functions';
import {onCall} from 'firebase-functions/v2/https';

type teacherNotificationParams = {
  bookId: number;
  bookTitle: string;
  chapterId: number;
  chapterTitle: string;
  notificationId: string;
};
setGlobalOptions({
  region: 'europe-west1',
});

export const scheme = 'com.siruplab.onboarding://';

export const teacherNotification = onCall<teacherNotificationParams>(
    async (req, _res) => {
      try {
        const {bookId, chapterTitle, chapterId, bookTitle, notificationId} =
        req.data;

        const userDoc = await admin
            .firestore()
            .doc(`login/${req.auth?.uid}`)
            .get();
        if (userDoc.data()?.role !== 'teacher') {
          throw new Error('User is not a teacher');
        }

        const studentIds: string[] = userDoc.data()?.students ?? [];
        const tokens = (
          await Promise.all(
              studentIds.map(async (studentId: string) => {
                const studentDoc = await admin
                    .firestore()
                    .doc(`login/${studentId}`)
                    .get();
                return studentDoc.data()?.notification_tokens ?? [];
              }),
          )
        ).flat();

        const pushReturn = await admin.messaging().sendEachForMulticast({
          tokens,
          data: {
            url: `${scheme}/chapterpage/${chapterTitle}/${bookId}/${chapterId}`,
            uid: notificationId,
          },
          notification: {
            title: 'Bonjour',
            body: `Veuillez consulter le chapitre ${chapterTitle} du livre ${bookTitle}`,
          },
        });
        console.info('PushResponse', pushReturn, tokens);

        return {
          result: userDoc.data()?.students.length,
          test: `Message envoyé à ${pushReturn.successCount} élèves`,
        };
      } catch (error) {
        console.error('Error fetching document:', error);
        return {error: 'Error fetching document'};
      }
    },
);
