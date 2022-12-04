const addBtn = document.querySelector(".addButton");
const clear = document.querySelector("#Clear");
const DivContainer = document.getElementById("incomplete-tasks");
let newTaskInput = document.querySelector("#newTask");

let id = 0;
let list = [];
let lastClick = "All";


addBtn.addEventListener("click", newEntry);
clear.addEventListener("click", deleteCompleted);


function reRender() {
DivContainer.innerHTML= "";

 let Filtered = list.filter((item) => {
    if(lastClick === "Active") {
        return !item.isComplete;
    }
    if(lastClick === "Completed") {
        return item.isComplete;
    }
    return true;
})



Filtered.forEach((item) => {

    if (item.isRemoved) {
        return;
    }



// Add new tasks
    const newDiv = document.createElement("div");
    console.log("add");
    newDiv.classList.add('div-style');
    newDiv.innerText = item.text;
    newDiv.setAttribute("id", `newDiv${item.id}`);

// Checkbox
    const taskCheckBox = document.createElement("input");
    taskCheckBox.setAttribute("type", "checkbox");
    taskCheckBox.setAttribute("id", `taskCheckBox${item.id}`);
    taskCheckBox.classList.add('taskCheckBox');
    taskCheckBox.addEventListener("change", (event) => {checkedbox(event, item)});

// Delete button
    const newButton = document.createElement("button");
    newButton.setAttribute("id", `newButton${item.id}`);
    newButton.classList.add("newButton");
    newButton.innerHTML = "X";
    newButton.addEventListener("click", () => deleteTask(item));
    
// Checked  
    if (item.isComplete) {
        newDiv.classList.add("crossed");
        taskCheckBox.setAttribute("checked", "true");
    }

    newDiv.appendChild(taskCheckBox);
    newDiv.appendChild(newButton);
    DivContainer.appendChild(newDiv);
 }) 
}

function newEntry() {
    if (newTaskInput.value==="") {
         return;
    }
    list.push({text: newTaskInput.value, id: id++, isComplete: false, isRemoved: false});

    reRender();

    newTaskInput.value="";
}

function deleteTask(item) {
    item.isRemoved = true;

    reRender();
}

function deleteCompleted(item) {
if (isComplete === true) {
 item.isRemoved = true;
}
reRender();
}

function addid() {
    if (newTaskInput.value !== "") {
        id++;
        addTask(newTaskInput.value)
    }
}

function checkedbox(event, item) {
    let checkboxElement = event.target;
     item.isComplete = checkboxElement.checked;
     reRender();
}

function ShowAll() {
    lastClick = "All";
    
    reRender();
}

function ShowActive() {
   lastClick = "Active";
   
   reRender();
}

function ShowCompleted() {
    lastClick = "Completed";

    reRender();
}