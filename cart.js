import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://addcart-5f551-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
    
    //appendItemToShoppingListEl(inputValue)
    
    //shoppingListEl.innerHTML += `<li>${inputValue}</li>`
})






onValue(shoppingListInDB,function(snapshot){
    //console.log(snapshot.val());
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    //console.log(itemsArray)

    // console.log(snapshot.val());

    clearShoppingListEl()
    //shoppingListEl.innerHTML= ""

    for(let i = 0; i< itemsArray.length;i++){
        //itemsArray[i]
        let currentitem = itemsArray[i]

        let currentitemID = currentitem[0]
        let currentitemValue = currentitem[1]
        
        //appendItemToShoppingListEl(currentitemValue)
        appendItemToShoppingListEl(currentitem)
        //appendItemToShoppingListEl(itemsArray[i])

        //console.log(itemsArray[i]);

    }
    } else{
        shoppingListEl.innerHTML ="yet, No itemsss!🧐"
    }


    // let itemsArray = Object.entries(snapshot.val())
    // //console.log(itemsArray)

    // // console.log(snapshot.val());

    // clearShoppingListEl()
    // //shoppingListEl.innerHTML= ""

    // for(let i = 0; i< itemsArray.length;i++){
    //     //itemsArray[i]
    //     let currentitem = itemsArray[i]

    //     let currentitemID = currentitem[0]
    //     let currentitemValue = currentitem[1]
        
    //     //appendItemToShoppingListEl(currentitemValue)
    //     appendItemToShoppingListEl(currentitem)
    //     //appendItemToShoppingListEl(itemsArray[i])

    //     //console.log(itemsArray[i]);

    // }


})

function clearShoppingListEl(){
    shoppingListEl.innerHTML= ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item){   //item replaces itemValue
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() { 
        let exactLocationofItemInDB = ref(database,`shoppingList/${itemID}`)
        //console.log(itemID);

        remove(exactLocationofItemInDB) 
    })

    shoppingListEl.append(newEl)
}