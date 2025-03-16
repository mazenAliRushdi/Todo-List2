const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const allFilter = document.getElementById('allFilter');
const completedFilter = document.getElementById('completedFilter');
const uncompletedFilter = document.getElementById('uncompletedFilter');

let tasks = [];
let currentFilter = 'all';

addButton.addEventListener('click', addTask);
allFilter.addEventListener('click', () => {
    currentFilter = 'all';
    renderTasks();
});
completedFilter.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTasks();
});
uncompletedFilter.addEventListener('click', () => {
    currentFilter = 'uncompleted';
    renderTasks();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (currentFilter === 'all' ||
            (currentFilter === 'completed' && task.completed) ||
            (currentFilter === 'uncompleted' && !task.completed)) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-buttons">
                    <button class="editButton" data-index="${index}">تعديل</button>
                    <button class="deleteButton" data-index="${index}">حذف</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            const deleteButton = taskItem.querySelector('.deleteButton');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            const editButton = taskItem.querySelector('.editButton');
            editButton.addEventListener('click', () => {
                editTask(index);
            });

            const taskTextElement = taskItem.querySelector('.task-text');
            taskTextElement.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
            });
        }
    });
}

function editTask(index) {
    const taskText = tasks[index].text;
    taskInput.value = taskText;
    tasks.splice(index, 1);
    renderTasks();
    taskInput.focus();
}

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});