
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import './config/firebase';

import admin from 'firebase-admin';
import {setGlobalOptions} from 'firebase-functions';
import {onCall} from 'firebase-functions/v2/https';


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const teacherNotification = onRequest((request, response) => {
//   logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
type teacherNotificationParams
= {
  chapterId: number;
  bookId: number;
  title: string;
}
setGlobalOptions({
  region: 'europe-west1',
});

export const teacherNotification = onCall<teacherNotificationParams>(async (req, _res) => {
  try {
    const {bookId, title, chapterId} = req.data;
    const userDoc = await admin.firestore().doc(`login/${req.auth?.uid}`).get();
    const studentIds : string[] = userDoc.data()?.students || [];
    const tokens = (await Promise.all(studentIds.map(async (studentId: string) => {
      const studentDoc = await admin.firestore().doc(`login/${studentId}`).get();
      return studentDoc.data()?.notification_tokens || [];
    }))).flat();

    console.info('Tokens being sent:', tokens);


    const pushReturn = await admin.messaging().sendEachForMulticast({
      tokens,
      data: {
        url: `com.siruplab.onboarding:///chapterpage/${encodeURIComponent(title)}/${bookId}/${chapterId}`},
      notification: {
        title: 'Bonjour',
        body: `Veuillez consulter le chapitre ${title} du livre ${bookId}`,

      },


    });
    console.info('PushResponse', pushReturn);

    if (pushReturn.failureCount > 0) {
      console.error('Error sending message:', pushReturn.responses);
      return {error: 'Error sending message'};
    }

    return {result: 'Success'};
  } catch (error) {
    console.error('Error fetching document:', error);
    return {error: 'Error fetching document'};
  }
});
