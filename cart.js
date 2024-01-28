
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 
const appSettings= {
    databaseURL : "https://addcart-5f551-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

const inputfieldEl = document.getElementById("input-field")
const addbuttonEl = document.getElementById("add-button")

const shoppingListEl = document.getElementById("shopping-list")

addbuttonEl.addEventListener("click",function(){
    let inputvalue = inputfieldEl.value
    push(shoppingListInDB,inputvalue)

    shoppingListEl.innerHTML += '<li>${inputvalue}</li> '


}) 