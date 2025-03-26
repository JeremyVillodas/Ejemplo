var baseURL = " http://26.184.59.112:8000/api/";
var select = document.getElementById("language");

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
