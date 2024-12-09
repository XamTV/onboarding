import * as Linking from "expo-linking";
import messaging from "@react-native-firebase/messaging";
import { firebase, runTransaction } from "@react-native-firebase/firestore";
import { t } from "i18next";

const useNotifications = () => {
  const createNotification = () => {
    const newNotificationId = firebase
      .firestore()
      .collection("notification")
      .doc().id;

    return newNotificationId;
  };

  const notification = async (uid: string) => {
    try {
      await runTransaction(firebase.firestore(), async (transaction) => {
        const getData = firebase.firestore().doc(`notification/${uid}`);

        const doc = await transaction.get(getData);

        if (!doc.exists) {
          throw new Error(
            t("errors.unspecific", { code: "Le document n'existe pas" })
          );
        }
        const updatedStudentCount = (doc.data()?.students || 0) + 1;
        console.log("here");

        transaction.update(getData, {
          students: updatedStudentCount,
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(t("errors.transaction", { message: error.message }));
      }
      console.error("ici", JSON.stringify(error));
    }
  };

  // if (Platform.OS === "android") {
  //   console.log("notificationId on android", notificationId);
  // } else {
  //   console.log("notificationId on ios", notificationId);
  // }

  const getInitialURL = async (): Promise<string | null> => {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    const message = await messaging().getInitialNotification();

    const deeplinkURL = message?.data?.url;
    const uid = message?.data?.uid;
    if (typeof deeplinkURL === "string") {
      return deeplinkURL;
    }
    if (typeof uid === "string") {
      await notification(uid);
    }
    return null;
  };

  const subscribe = (listener: (url: string) => void) => {
    const eventListenerSubscription = Linking.addEventListener(
      "url",
      ({ url }: { url: string }) => listener(url)
    );

    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        const url = remoteMessage.data?.url;
        const uid = remoteMessage.data?.uid;

        if (url) listener(url as string);
        if (typeof uid === "string") {
          await notification(uid);
        }
      }
    );

    return () => {
      eventListenerSubscription.remove();
      unsubscribe();
    };
  };

  return { getInitialURL, subscribe, createNotification };
};
export default useNotifications;
