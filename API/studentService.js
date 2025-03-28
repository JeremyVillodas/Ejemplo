var baseURL = " http://26.26.10.104:8000/api/";

var rows = document.getElementById("tbody");

var form = document.getElementById("form-student");

var select = document.getElementById("language");

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
    rows.innerHTML = "";
    students.forEach((element) => {
      rows.innerHTML += `<tr><td>${element.name}</td><td>${element.email}</td><td>${element.phone}</td><td>Ingles</td><td><button>Editar</button><button>Eliminar</button></td></tr>`;
    });
  } catch (error) {
    console.log(error);
  }
}

async function postStudents(student) {
  try {
    const response = await fetch(baseURL + "students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: student.name,
        email: student.email,
        phone: student.phone,
        languages: student.language,
      }),
    });
    console.log(response);
    console.log(response.json.ok);
    return await response.json;
  } catch (error) {}
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    language: selectedLanguages,
  };

  console.log(student);
  await postStudents(student);
  insertStudents();
});

insertStudents();
console.log(getStudents());
