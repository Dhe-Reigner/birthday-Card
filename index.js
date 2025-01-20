import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    databaseURL:"https://birthday-cada1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "gifts")

const birthdayInputField = document.getElementById("birthday-input");
const submitButton = document.getElementById("submit-button");
const giftInputEL = document.getElementById("gift-input");
const addButtonEl = document.getElementById("add-button");
const deleteAllButtonEl = document.getElementById("delete-all-button");
const ulEl = document.getElementById("gifts-list");


function render(gifts){
    let listItems = ""
    for (let i = 0; i < gifts.length; i++){
        listItems += `
        <li>${gifts[i]}</li>
        `
    }
    ulEl.innerHTML = listItems
}
onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const gifts = Object.values(snapshotValues)
        render(gifts)
    }
    console.log(snapshot.val())
})

submitButton.addEventListener("click", function(){
    push(referenceInDB, birthdayInputField.value)
    birthdayInputField.value = ""
})
deleteAllButtonEl.addEventListener("dblclick", function(){
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

addButtonEl.addEventListener("click", function(){
    push(referenceInDB, giftInputEL.value)
    giftInputEL.value = ""
    })