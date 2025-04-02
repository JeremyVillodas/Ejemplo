var baseURL = "http://26.63.41.255:8000/api/";
var select = document.getElementById("language");
var selectedLanguages = [];
var tagSelector;
var selectMultiple = document.getElementById("selected-tags");

async function initializeLanguages(editing = false, id = null) {
  await insertLanguages(editing, id);

  const previousMultiSelect = document.querySelector(".multi-select-tag");
  if (previousMultiSelect) {
    previousMultiSelect.remove();
  }
  tagSelector = new MultiSelectTag("language", {
    maxSelection: 5, // default unlimited.
    required: true, // default false.
    placeholder: "Ingresa un lenguaje", // default 'Search'.
    onChange: function (selected) {
      // Callback when selection changes.
      console.log("Selection changed:", selected);
      selectedLanguages = selected.map((item) => parseInt(item.id));
    },
  });
}

initializeLanguages();

async function getLanguages(endpoint) {
  try {
    const response = await fetch(baseURL + endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getLanguagesForStudent(id) {
  try {
    const response = await fetch(baseURL + "students/" + id);
    const data = await response.json();
    return data.languages;
  } catch (error) {
    console.log(error);
  }
}

async function insertLanguages(editing = false, id = null) {
  try {
    const allLanguages = await getLanguages("languages");
    let selectedLanguages = [];

    if (editing && id) {
      selectedLanguages = await getLanguagesForStudent(id);
    }

    select.innerHTML = ""; // Limpiar el select antes de llenarlo

    allLanguages.forEach((language) => {
      const isSelected = selectedLanguages.some((l) => l.id === language.id)
        ? "selected"
        : "";
      select.innerHTML += `<option value="${language.id}" ${isSelected}>${language.name}</option>`;
      console.log(select);
    });
  } catch (error) {
    console.log(error);
  }
}
