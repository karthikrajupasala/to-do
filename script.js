document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Please enter a task.');
    }
});

function addTask(taskText) {
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');
    taskSpan.addEventListener('click', function() {
        taskSpan.classList.toggle('completed');
        saveTasks();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
    deleteButton.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
}

function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#taskList li');
    taskItems.forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const completed = item.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const taskItems = document.querySelectorAll('#taskList li');
            const lastTask = taskItems[taskItems.length - 1].querySelector('.task-text');
            lastTask.classList.add('completed');
        }
    });
}