var baseURL = "http://26.26.10.104:8000/api/";
var select = document.getElementById("language");
var selectedLanguages = [];

async function initializeLanguages() {
  await insertLanguages();

  var tagSelector = new MultiSelectTag("language", {
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

async function insertLanguages() {
  try {
    var languages = await getLanguages("languages");
    console.log(languages);
    languages.forEach((element) => {
      select.innerHTML += `<option value="${element.id}">${element.name}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
}
