import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";

export async function requestUserPermission(uid: string) {
  try {
    const authStatus = await messaging().requestPermission();
    const iosPermission =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    const androidPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (
      iosPermission ||
      androidPermission === PermissionsAndroid.RESULTS.GRANTED
    ) {
      if (Platform.OS === "android") {
        await messaging().registerDeviceForRemoteMessages();
      }
      const token = await messaging().getToken();
      const userDoc = firestore().doc(`login/${uid}`);
      const userSnapshot = await userDoc.get();
      const existingTokens = userSnapshot.data()?.notification_tokens || [];
      const updatedTokens = Array.from(new Set([...existingTokens, token]));
      await userDoc.update({ notification_tokens: updatedTokens });
    }
  } catch (error) {
    console.error("Permission request failed", error);
  }
}
