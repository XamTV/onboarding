import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";
import firestore, { arrayUnion } from "@react-native-firebase/firestore";
import { t } from "i18next";

export async function requestUserPermission(uid: string) {
  try {
    let permission = false;

    permission =
      Platform.OS == "ios"
        ? (await messaging().requestPermission()) ===
          messaging.AuthorizationStatus.AUTHORIZED
        : (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          )) === PermissionsAndroid.RESULTS.GRANTED;

    if (!permission) {
      return;
    }

    if (Platform.OS === "android") {
      await messaging().registerDeviceForRemoteMessages();
    }

    const token = await messaging().getToken();
    const userDoc = firestore().doc(`login/${uid}`);
    const user = await userDoc.get();
    const existingTokens = user.data()?.notification_tokens ?? [];
    const updatedTokens = arrayUnion(...existingTokens, token);
    await userDoc.update({ notification_tokens: updatedTokens });
  } catch (error) {
    if (error instanceof Error) {
      console.error(t("errors.resquestPermission", { message: error.message }));
    }
    console.error(JSON.stringify(error));
  }
}
