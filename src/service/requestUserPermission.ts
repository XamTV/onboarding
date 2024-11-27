import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import firestore from "@react-native-firebase/firestore";

export async function requestUserPermission(uid: string) {
  try {
    // IOS

    // const authStatus = await messaging().requestPermission();
    // const enabled  = authStatus === messaging.AuthorizationStatus.AUTHORIZED ;

    // if (enabled) {
    //   await messaging().registerDeviceForRemoteMessages();
    //   const token  = await messaging().getToken()
    //   firestore()
    //     .doc(`login/${uid}`)
    //     .update({ notification_token: token });
    // }

    // Android
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      firestore().doc(`login/${uid}`).update({ notification_token: token });
    }
  } catch (error) {
    console.error("Permission request failed", error);
  }
}
