
document.addEventListener("DOMContentLoaded", function() {
    loadTasks() 
}) 

function addTask() {
    const serialInput = document.getElementById("serialInput") 
    const dateInput = document.getElementById("dateInput") 
    const taskInput = document.getElementById("taskInput") 
    const taskTable = document.getElementById("taskTable") 

    // Check if input fields are not empty
    if (serialInput.value.trim() !== "" && dateInput.value.trim() !== "" && taskInput.value.trim() !== "") {
        // Create a new table row
        let row = taskTable.insertRow(-1) 

        // Insert cells for serial number, date, task, and action
        let serialCell = row.insertCell(0) 
        let dateCell = row.insertCell(1) 
        let taskCell = row.insertCell(2) 
        let actionCell = row.insertCell(3) 

        // Set values for serial number, date, and task
        serialCell.innerHTML = serialInput.value 
        dateCell.innerHTML = dateInput.value 
        taskCell.innerHTML = taskInput.value 


        //   // Add event listener to mark task as completed when clicked
        //   taskCell.addEventListener("click", function() {
        //     this.classList.toggle("completed");
        //     updateDeleteButtons();
        //     saveTasks();
        // });

        // Add delete button
        const deleteButton = document.createElement("button") 
        deleteButton.appendChild(document.createTextNode("Delete")) 
        deleteButton.addEventListener("click", function() {
            let rowIndex = this.parentElement.parentElement.rowIndex 
            taskTable.deleteRow(rowIndex) 
            updateSerialNumbers() 
            updateDeleteButtons() 
            saveTasks() 
        }) 
        actionCell.appendChild(deleteButton) 


        // Save tasks to local storage
        saveTasks() 
    } else {
        alert("Please enter serial number, date, and task.") 
    }
}

function updateSerialNumbers() {
    const taskTable = document.getElementById("taskTable") 
    for (let i = 1; i < taskTable.rows.length; i++) {
        taskTable.rows[i].cells[0].innerHTML = i 
    }
}

function updateDeleteButtons() {
    const taskTable = document.getElementById("taskTable") 
    for (let i = 1; i < taskTable.rows.length; i++) {
        let taskCell = taskTable.rows[i].cells[2]
        let deleteButton = taskTable.rows[i].cells[3].querySelector("button") 
        if (taskCell.classList.contains("completed")) {
            deleteButton.disabled = false 
        } else {
            deleteButton.disabled = true 
        }
    }
}

function saveTasks() {
    const taskTable = document.getElementById("taskTable")
    let tasks = [] 
    for (let i = 1; i < taskTable.rows.length; i++) {
        let serialCell = taskTable.rows[i].cells[0]
        let dateCell = taskTable.rows[i].cells[1]
        let taskCell = taskTable.rows[i].cells[2]
        let task = taskCell.innerHTML
        let completed = taskCell.classList.contains("completed")
        tasks.push({ serial: serialCell.innerHTML, date: dateCell.innerHTML, task: task, completed: completed })
    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    let taskTable = document.getElementById("taskTable") 
    let tasks = localStorage.getItem("tasks") 
    if (tasks) {
        tasks = JSON.parse(tasks) 
        for (let i = 0;  i < tasks.length;  i++) {
            let row = taskTable.insertRow(-1)
            let serialCell = row.insertCell(0) 
            let dateCell = row.insertCell(1) 
            let taskCell = row.insertCell(2) 
            let actionCell = row.insertCell(3) 
            serialCell.innerHTML = tasks[i].serial 
            dateCell.innerHTML = tasks[i].date 
            taskCell.innerHTML = tasks[i].task 
            if (tasks[i].completed) {
                taskCell.classList.add("completed") 
            }
            let deleteButton = document.createElement("button") 
            deleteButton.appendChild(document.createTextNode("Delete")) 
            deleteButton.addEventListener("click", function() {
                let rowIndex = this.parentElement.parentElement.rowIndex 
                taskTable.deleteRow(rowIndex) 
                updateSerialNumbers() 
                updateDeleteButtons() 
                saveTasks() 
            }) 
            actionCell.appendChild(deleteButton) 
        }
    }
}

function reset(){
    serialInput.value = "" 
    dateInput.value = "" 
    taskInput.value = "" 
}