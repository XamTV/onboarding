import * as Linking from "expo-linking";
import messaging from "@react-native-firebase/messaging";

const useNotifications = () => {
  const getInitialURL = async (): Promise<string | null> => {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    const message = await messaging().getInitialNotification();

    const deeplinkURL = message?.data?.url;
    if (typeof deeplinkURL === "string") {
      console.log("Deep link URL from notification:", deeplinkURL);
      return deeplinkURL;
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

        if (url) listener(url as string);
      }
    );

    return () => {
      eventListenerSubscription.remove();
      unsubscribe();
    };
  };

  return { getInitialURL, subscribe };
};
export default useNotifications;
