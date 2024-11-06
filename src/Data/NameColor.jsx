export const getColorByName = (name) => {
  switch (name) {
    case "Donkeynote":
      return "#FF10F0";
    case "Sun_Sun":
    case "VDews":
      return "#FF3131";
    case "Samdaron":
      return "white";
    case "Elduderino":
      return "cyan";
    case "Shadow4209":
      return "#1F51FF";
    case "Snaps":
      return "#00A36C";
    case "Roach":
    case "Bitis":
      return "#b743ec";
    default:
      return "yellow";
  }
};
