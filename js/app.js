// if (!localStorage.getItem("allUsers")) {
  const usersArray = [];
  localStorage.setItem("allUsers", JSON.stringify(usersArray));
// }
// save the array to local storage, we use local storage as our database for now
// localStorage.setItem('allUsers', JSON.stringify(usersArray));
class User {
  constructor(username, idNumber, country, language) {
    this._username = username;
    this._idNumber = idNumber;
    this._country = country;
    this._language = language;
  }
}

// All elements selection
const usernameInput = document.getElementById("username");
const idNumberInput = document.getElementById("id-number");
const countryInput = document.getElementById("country");
const languageInput = document.getElementById("language");
const addUserButton = document.getElementById("add");
const usersTable = document.getElementById("users-table");
const idNumberInputSearch = document.getElementById("id-number-search");
const searchButton = document.getElementById("search");
const usernameInputUpdate = document.getElementById("username-update");
const idNumberInputUpdate = document.getElementById("id-number-update");
const countryInputUpdate = document.getElementById("country-update");
const languageInputUpdate = document.getElementById("language-update");
const updateButton = document.getElementById("update");

// Create a user
function createUser() {
  // use the values from the html input elements to create the user
  // if any of them is empty, the function should fail
  const username = usernameInput.value;
  const idNumber = idNumberInput.value;
  const country = countryInput.value;
  const language = languageInput.value;
  if (username == "" || idNumber == "" || country == "" || language == "") {
    alert("Please fill all the inputs provided");
    return;
  }
  // otherwise, create a new instance of the user
  const newUser = new User(username, idNumber, country, language);
  // retrive the stored users array, push this current user and  store it again
  const storedUsers = JSON.parse(localStorage.getItem("allUsers"));
  storedUsers.push(newUser);
  localStorage.setItem("allUsers", JSON.stringify(storedUsers));
}

addUserButton.addEventListener("click", (event) => {
  // prevent the button from refreshing the page thus loosing all the user input
  event.preventDefault();
  createUser();
  getAndRenderAllUsers();
});

function test() {
  console.log("Hello world");
}

// Get all users
function getAndRenderAllUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("allUsers"));
  const userTableBody = document.getElementById("user-table-body");
  userTableBody.innerHTML = "";
  for (let user of storedUsers) {
    let tableRow = document.createElement("tr");
    for (const [key, value] of Object.entries(user)) {
      const tableData = document.createElement("td");
      tableData.innerText = value;
      tableRow.appendChild(tableData);
    }
    userTableBody.appendChild(tableRow);
  }
}
getAndRenderAllUsers();

// search for a user to update
function search_user(id_number) {
  const storedUsers = JSON.parse(localStorage.getItem("allUsers"));
  for (let user of storedUsers) {
    if (user._idNumber === id_number) {
      return user;
    }
  }
  // if the user is not found, return Null
  return null;
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const userToUpdate = search_user(idNumberInputSearch.value);
  if (!userToUpdate) {
    const formSide = document.querySelector(".update-form-side");
    formSide.innerHTML = `<h2>User with id ${idNumberInputSearch.value} does not exist, try again</h2>`;
    return;
  }
  usernameInputUpdate.value = userToUpdate._username;
  idNumberInputUpdate.value = userToUpdate._idNumber;
  countryInputUpdate.value = userToUpdate._country;
  languageInputUpdate.value = userToUpdate._language;
});

// function for updating
function update(username, idNumber, country, language) {
  const userToUpdate = search_user(idNumber);
  if (!userToUpdate) return null;
  const storedUsers = JSON.parse(localStorage.getItem("allUsers"));
  for (let user of storedUsers) {
    if (user._idNumber === idNumber) {
      user._username = username;
      user._country = country;
      user._language = language;
      localStorage.setItem("allUsers", JSON.stringify(storedUsers));
    }
  }
  console.log(storedUsers);
}

updateButton.addEventListener("click", (event) => {
  event.preventDefault();

  update(
    usernameInputUpdate.value,
    idNumberInputSearch.value,
    countryInputUpdate.value,
    languageInputUpdate.value
  );
  const formSide = document.querySelector(".update-form-side");
  // formSide.appendChild('h2').innerHTML = "<h3>Record Updated, check the table</h3>"
  const h2 = document.createElement("h2");
  h2.innerHTML = "<h3>Record Updated, check the table</h3>";
  formSide.appendChild(h2);
  //   also update the table view
  getAndRenderAllUsers();
});
