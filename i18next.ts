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
      connect: "Se connecter",
      chapters: "Chapitres",
      chapterRange: "P.{{from}} - P.{{to}} ",
      disconnect: "Deconnexion",
      email: "email",
      emptyPages:
        "Aie, {{prefix}} {{container}} semble ne pas contenir de {{data}} ",
      errors: {
        fromQuery: "Erreur : {{message}} ",
        emptyPasswordField: "Le champ mot de passe ne peut pas être vide",
        emptyEmailField: "Le champ email ne peut pas être vide ",
        emailAlreadyInUse: "Cet adresse email est deja utilisé",
        emailInvalid: "Adresse email invalide",
        emailAndOrPasswordInvalid: "Email et/ou mot de passe invalide",
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
      noAccount: "Pas de compte ?",
      pageNumber: "p.{{pageNumber}} ",
      password: "mot de passe",
      reference: "ref.{{bookId}} ",
      requiredInput: {
        email: "email *",
        password: "mot de passe *",
        confirmPassword: "confirmation du mot de passe *",
      },
      searchBooks: "Rechercher un livre",
      success: {
        accountCreated: "compte crée",
      },
      welcome: `Bonjour`,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
