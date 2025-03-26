var text = document.getElementById("miNombre");
var columns = document.getElementById("tbody");

const personas = [
  {
    name: "Jeremy",
    age: 20,
  },

  {
    name: "Sergio",
    age: 20,
  },
  {
    name: "Diego",
    age: 20,
  },
];

function createLocalStorage() {
  localStorage.clear;
  localStorage.setItem("mi nombre", JSON.stringify(personas));
}
