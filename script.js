window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodo = document.querySelector("#new-todo-form");
  

    newTodo.addEventListener("submit", e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

function DisplayTodos () {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        span.classList.add("bubble");
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("todo-content")
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions")
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        const editButton = document.createElement("button");
        editButton.classList.add("edit");

        input.type = "checkbox";
        input.checked = todo.done;

        if (todo.category == "business") {
            span.classList.add("business")
        } else {
            span.classList.add("personal")
        }

        contentDiv.innerHTML = ` <input type="text" value = "${todo.content}" readonly>`;
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);


        todoItem.appendChild(label);
        todoItem.appendChild(contentDiv);
        todoItem.appendChild(actionsDiv);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add("done");
        }

        input.addEventListener("click", e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))

            if (todo.done) {
                todoItem.classList.add("done");
            } else {
                todoItem.classList.remove("done");
            }

        })

        editButton.addEventListener("click", e => {
            const input = contentDiv.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener("blur", e => {
                input.setAttribute("readonly", true)
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })


        deleteButton.addEventListener("click", e => {
           todos = todos.filter(t => t != todo);
           localStorage.setItem('todos', JSON.stringify(todos))
           DisplayTodos();
        })
    })
}