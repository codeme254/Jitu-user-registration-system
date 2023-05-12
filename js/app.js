if (!localStorage.getItem('allUsers')) {
    const usersArray = [];
    localStorage.setItem('allUsers', JSON.stringify(usersArray));
  }
// save the array to local storage, we use local storage as our database for now
// localStorage.setItem('allUsers', JSON.stringify(usersArray));
class User{
    constructor(username, idNumber, country, language){
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

// Create a user
function createUser(){
    // use the values from the html input elements to create the user
    // if any of them is empty, the function should fail
    const username = usernameInput.value;
    const idNumber = idNumberInput.value;
    const country = countryInput.value;
    const language = languageInput.value;
    if (username == "" || idNumber == "" || country == "" || language == ""){
        alert("Please fill all the inputs provided")
        return;
    }
    // otherwise, create a new instance of the user
    const newUser = new User(username, idNumber, country, language);
    // retrive the stored users array, push this current user and  store it again
    const storedUsers = JSON.parse(localStorage.getItem('allUsers'));
    console.log(storedUsers)
    storedUsers.push(newUser)
    localStorage.setItem('allUsers', JSON.stringify(storedUsers));
    return newUser;
}

addUserButton.addEventListener('click', (event) => {
    // prevent the button from refreshing the page thus loosing all the user input
    event.preventDefault();
    createUser();
    getAndRenderAllUsers();
})


// Get all users
function getAndRenderAllUsers(){
    const storedUsers = JSON.parse(localStorage.getItem('allUsers'));
    for (let user of storedUsers){
        console.log(user)
        tableRow = document.createElement('tr');
        for (const[ key, value] of Object.entries(user)){
            const tableData = document.createElement('td');
            tableData.innerText = value;
            tableRow.appendChild(tableData);
        }
    }
    usersTable.appendChild(tableRow)
    // return storedUsers;
}
// console.log(usersArray)
getAndRenderAllUsers();