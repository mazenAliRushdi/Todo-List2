const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let tasks = [];

addButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push(taskText);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((taskText, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
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
    });
}

function editTask(index) {
    const taskText = tasks[index];
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