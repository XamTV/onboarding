
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
}
export const teacherNotification = onCall<teacherNotificationParams>(async (req, _res) => {
  try {
    const {chapterId, bookId} = req.data;
    const userDoc = await admin.firestore().doc(`login/${req.auth?.uid}`).get();
    const studentIds : string[] = userDoc.data()?.students || [];

    const tokens = await Promise.all(studentIds.map(async (studentId: string) => {
      const studentDoc = await admin.firestore().doc(`login/${studentId}`).get();
      return studentDoc.data()?.notification_token;
    }));

    await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: 'Bonjour',
        body: `Veuillez consulter le chapitre ${chapterId} du livre ${bookId}`,
      },

    });
    return {result: 'Success'};
  } catch (error) {
    console.error('Error fetching document:', error);
    return {error: 'Error fetching document'};
  }
});
