// import * as Linking from "expo-linking";
// import messaging from "@react-native-firebase/messaging";

// const useNotifications = () => {
//   // Fonction pour gérer l'URL initiale de l'app
//   const getAppInitialURL = async () => {
//     // Vérification du lien profond au lancement de l'app
//     const url = await Linking.getInitialURL();
//     if (typeof url === "string") {
//       console.log("getInitialUrl", url);
//       return url;
//     }

//     // Vérification d'une notification reçue lorsque l'application est lancée depuis le background
//     const message = await messaging().getInitialNotification();
//     console.log("Message", message);

//     const deeplinkURL = message?.data?.url;
//     console.log("deepLinks", deeplinkURL);

//     if (typeof deeplinkURL === "string") {
//       return deeplinkURL;
//     }
//   };

//   // Fonction pour s'abonner aux liens profonds pendant l'exécution de l'app
//   const subscribeToDeepLinks = (listener: (url: string) => void) => {
//     // Écoute des événements de changement de lien profond dans l'app
//     const onReceiveURL = ({ url }: { url: string }) => {
//       console.log("OnReceiveUrl", url);
//       listener(url); // Appelle le listener avec l'URL reçue
//     };

//     // Abonnement aux événements de lien profond
//     const linkingSubscription = Linking.addEventListener("url", onReceiveURL);

//     // Écoute les notifications lorsque l'app est en arrière-plan ou fermée
//     const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
//       const url = remoteMessage.data?.url;
//       console.log("remoteMessage", remoteMessage);

//       if (typeof url === "string") {
//         listener(url); // Appelle le listener avec l'URL de la notification
//       }
//     });

//     // Retourne une fonction pour annuler l'abonnement au démontage du hook
//     return () => {
//       linkingSubscription.remove(); // Désabonne de l'événement "url"
//       unsubscribe(); // Désabonne de l'événement de notification
//     };
//   };

//   return { getAppInitialURL, subscribeToDeepLinks };
// };

// export default useNotifications;
