import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, 
         ref,
         push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    databaseURL:"https://birthday-cada1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "birthdays")

const birthdayInputField = document.getElementById("birthday-input");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function(){
    push(referenceInDB, birthdayInputField.value)
    birthdayInputField.value = ""
})