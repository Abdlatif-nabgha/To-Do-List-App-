const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getToDo();
updateToDoList();

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addToDo();
});

function addToDo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);
        saveToDo();
        updateToDoList();
        todoInput.value = "";
    }
}

function updateToDoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, index) => {
        const todoItem = createToDoItem(todo, index);
        todoListUL.append(todoItem);
    });
}

function createToDoItem(todo, index) {
    const todoId = `todo-${index}`;
    const todoLI = document.createElement("li");
    todoLI.classList.add("todo"); // 🔥 ADD THIS LINE FOR STYLING

    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </label>
        <label class="todo-text" for="${todoId}">${todo.text}</label>
        <button class="delete-button" type="button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
        </button>
    `;

    // Event listener for delete button
    todoLI.querySelector(".delete-button").addEventListener("click", () => {
        deleteToDoItem(index);
    });

    // Event listener for checkbox
    todoLI.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
        allTodos[index].completed = e.target.checked;
        saveToDo();
        updateToDoList(); // optional: for live visual update
    });

    return todoLI;
}

function deleteToDoItem(index) {
    allTodos.splice(index, 1);
    saveToDo();
    updateToDoList();
}

function saveToDo() {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

function getToDo() {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}
