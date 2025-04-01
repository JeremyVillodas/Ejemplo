var baseURL = " http://26.184.59.112:8000/api/";

var rows = document.getElementById("tbody");

var form = document.getElementById("form-student");

var select = document.getElementById("language");

async function getStudents() {
  try {
    const response = await fetch(baseURL + "students");
    const data = await response.json();
    console.log(response);
    console.log(data);

    return data.students;
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    return [];
  }
}
async function insertStudents() {
  try {
    var students = await getStudents();

    console.log(students);
    rows.innerHTML = "";
    students.forEach((element) => {
      lenguaje = element.languages;
      lenguajes =
        element.languages?.map((item) => item.name).join(", ") ||
        "Sin lenguaje seleccionado";
      console.log(lenguajes);
      rows.innerHTML += `<tr>
      <td>${element.name}</td>
      <td>${element.email}</td>
      <td>${element.phone}</td>
      <td>${lenguajes}</td>
      
      <td><button onclick="editStudent(${element.id})">Editar</button>
      <button onclick="deleteStudent(${element.id})">Eliminar</button>
      
      
      </td></tr>`;
    });
  } catch (error) {
    console.log(error);
  }
}
////////////////////

async function deleteStudent(id) {
  try {
    const response = await fetch(baseURL + "students/" + id, {
      method: "DELETE",
    });
    if (response.ok) {
      insertStudents();
    }
    return await response.json;
  } catch (error) {}
}

////////////////

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
    return await response.json;
  } catch (error) {}
}

insertStudents();
