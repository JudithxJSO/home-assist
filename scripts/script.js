document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const todoBar = document.getElementById('todo-bar');

    // Verify if elements are correctly referenced
    if (!addButton || !todoInput || !todoBar) {
        console.error('Essential elements are missing in the HTML.');
        return;
    }

    // Load saved todos
    loadTodos();

    // Add event listener to the add button
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = todoInput.value.trim();
        console.log('Adding task:', taskText); // Debug statement
        if (taskText === '') return; // Prevent adding empty tasks

        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const newTodo = { text: taskText, completed: false };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        todoInput.value = ''; // Clear the input field
        loadTodos();
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        console.log('Loading todos:', todos); // Debug statement
        todoBar.innerHTML = '';

        todos.forEach((todo, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            if (todo.completed) {
                taskElement.classList.add('completed');
            }

            const taskSpan = document.createElement('span');
            taskSpan.textContent = todo.text;
            taskElement.appendChild(taskSpan);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.className = 'complete-button';
            completeButton.addEventListener('click', function() {
                toggleComplete(index);
            });
            taskElement.appendChild(completeButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function() {
                deleteTask(index);
            });
            taskElement.appendChild(deleteButton);

            todoBar.appendChild(taskElement);
        });
    }

    function toggleComplete(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    function deleteTask(index) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }
});

