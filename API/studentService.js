var baseURL = " http://26.63.41.255:8000/api/";

var rows = document.getElementById("tbody");

var form = document.getElementById("form-student");

var select = document.getElementById("language");

var completeName = document.getElementById("name");

var email = document.getElementById("email");

var phone = document.getElementById("phone");

var btn = document.getElementById("btn-form");

var editing = null;

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
  } catch (error) {
    console.log(error.message);
  }
}

////////////////

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: completeName.value,
    email: email.value,
    phone: phone.value,
    language: tagSelector.getSelectedTags().map((tag) => tag.id),
  };

  console.log("Estudiante a enviar:", student);

  if (editing) {
    // Si editingId tiene un valor, significa que estamos editando
    await updateStudent(editing, student);
    editing = null; // Resetear el ID después de actualizar
    btn.innerHTML = "Guardar"; // Volver a cambiar el botón
  } else {
    // Si editingId es null, estamos creando un nuevo estudiante
    await postStudents(student);
  }

  insertStudents(); // Actualizar la tabla después de guardar
  form.reset(); // Limpiar el formulario
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
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.message);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {}
}
async function editStudent(id) {
  try {
    const response = await fetch(baseURL + "students/" + id, {
      method: "GET",
    });
    const data = await response.json();

    completeName.value = data.name;
    email.value = data.email;
    phone.value = data.phone;
    initializeLanguages(true, id);

    editing = id;
    btn.innerHTML = "Actualizar";
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function updateStudent(id, student) {
  try {
    const response = await fetch(baseURL + "students/" + id, {
      method: "PATCH",
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
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.message);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {}
}
insertStudents();
