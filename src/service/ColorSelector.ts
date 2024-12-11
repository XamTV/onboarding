export const colorSelector = (subjectFilter: string) => {
  switch (subjectFilter) {
    case "Français":
      return "#52B5EA";
    case "Mathématiques":
      return "#F59401";
    case "Espagnol":
      return "#78b853";
    case "Philosophie":
      return "#ed4381";
    case "Physique-Chimie":
      return "#8F227F";
    case "HSciences économiques et sociales":
      return "#ff8033";
    case "Sciences de la vie et de la Terre":
      return "#2FBFBF";
    case "Sciences":
      return "#lightblue";
    case "Anglais":
      return "#D35400";
    case "Cycle 2":
      return "#lightblue";
    case "Enseignement scientifique":
      return "#lightblue";
    case "Science et Technologie":
      return "#lightblue";
    case "Allemand":
      return "#lightblue";
    case "Sciences numériques et technologie":
      return "#D49C3A";
    case "Autre enseignement professionnel":
      return "#lightblue";
    case "Prévention Santé Environnement":
      return "#009cb3";

    default:
      return "lightblue"; // Replace with your default color
  }
};
