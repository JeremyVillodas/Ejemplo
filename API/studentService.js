var baseURL = " http://26.26.10.104:8000/api/";

var rows = document.getElementById("tbody");
async function getStudents() {
  try {
    const response = await fetch(baseURL + "students");
    const data = await response.json();
    return data.students;
  } catch (error) {
    console.log(error);
  }
}

async function insertStudents() {
  try {
    var students = await getStudents();

    console.log(students);

    students.forEach((element) => {
      rows.innerHTML += `<tr><td>${element.name}</td><td>${element.email}</td><td>${element.phone}</td><td>${element.name}</td><td><button>Editar</button><button>Eliminar</button></td></tr>`;
    });
  } catch (error) {
    console.log(error);
  }
}

insertStudents();
console.log(getStudents());
