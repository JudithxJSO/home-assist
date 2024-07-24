document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const todoBar = document.getElementById('todo-bar');

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return; // Prevent adding empty tasks

        // Create a new task element
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        // Create a span for the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskElement.appendChild(taskSpan);

        // Create a button to mark the task as completed
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-button';
        completeButton.addEventListener('click', function() {
            taskElement.classList.toggle('completed');
        });
        taskElement.appendChild(completeButton);

        // Create a button to delete the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function() {
            todoBar.removeChild(taskElement);
        });
        taskElement.appendChild(deleteButton);

        // Add the task element to the task bar
        todoBar.appendChild(taskElement);

        // Clear the input field
        todoInput.value = '';
    }

    // Add a task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

