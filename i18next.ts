import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "intl-pluralrules";

const resources = {
  fr: {
    translation: {
      accountCreation: "Créer mon compte",
      categories: {
        subjects: "Tous sujets",
        levels: "Tous niveaux",
      },
      close: "Fermer",
      connect: "Se connecter",
      chapters: "Chapitres",
      chapterRange: "P.{{from}} - P.{{to}}",
      disconnect: "Deconnexion",
      email: "email",
      emptyPages: {
        bookPage:
          "Aie, il semblerait qu'il n'y ait pas de chapitres pour ce livre …",
        chapterPage:
          "Aie, il semblerait qu'il n'y ait pas de pages pour ce chapitre …",
        homePage: "Aie, il semblerait qu'il n'y ait pas de livres …",
        favoritePage: "Aie, il semblerait que vous n'ayez pas de favoris …",
      },
      error: {
        unspecific: "Something went wrong.",
        "404": "The page was not found.",
      },
      errors: {
        unspecific: "Erreur inconnu : {{code}}",
        "auth/email-already-in-use": "Cet adresse email est deja utilisé",
        "auth/invalid-email": "Adresse email invalide",
        "auth/invalid-credential": "Email et/ou mot de passe invalide",
        fromQuery: "Erreur : {{message}}",
        emptyPasswordField: "Le champ mot de passe ne peut pas être vide",
        emptyEmailField: "Le champ email ne peut pas être vide",
        emailRequired: "L'adresse email est requise",
        passwordLength: "Votre mot de passe doit faire plus de 6 caractères",
        passwordsDoesntMatch: "Les mots de passe ne sont pas identique",
      },
      favorites: {
        myFavorites: "Mes Favoris",
        addToFavorites: "Ajouter aux favoris",
        removeFromFavorites: "Retirer des favoris",
      },
      filterReset: "Réinitialiser le filtre",
      homePage: "Page d'accueil",
      noAccount: "Pas de compte ?",
      pageNumber: "p.{{pageNumber}}",
      password: "mot de passe",
      reference: "ref.{{bookId}}",
      requiredInput: {
        email: "email *",
        password: "mot de passe *",
        confirmPassword: "confirmation du mot de passe *",
      },
      searchBooks: "Rechercher un livre",
      sendNotification: "Envoyer la notification",
      success: {
        accountCreated: "Compte crée",
      },
      welcomeMessage: `Bonjour {{user}}`,
    },
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "fr",
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
