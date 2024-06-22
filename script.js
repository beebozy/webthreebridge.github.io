document.addEventListener('DOMContentLoaded', () => {
    // the reason we use the dom content load is to make all the html element document load fullu
   
   // grad the html elements here 
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');
    // this initialize the arrays to store tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // this operations basically embeded what happens when we click on the submit button 
    taskForm.addEventListener('submit', event => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const dueDate = document.getElementById('due-date').value;

        const task = { id: Date.now(), title, dueDate, completed: false };
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        addTaskToList(task);
        taskForm.reset();
    });

    // when we add task to the list here 

    function addTaskToList(task) {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('complete');
        }
        li.dataset.id = task.id;
        li.innerHTML = `
            ${task.title} (Due: ${task.dueDate})
            <span class="edit">Edit</span>
            <span class="delete">Delete</span>
            ${!task.completed ? '<span class="complete-btn">Complete</span>' : ''}
        `;

        if (task.completed) {
            completedTasksList.appendChild(li);
        } else {
            tasksList.appendChild(li);
        }

        //Thesse operations are for the edete, delete and the complete bttons
        li.querySelector('.delete').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.remove();
        });




        li.querySelector('.complete-btn')?.addEventListener('click', () => {
            task.completed = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.remove();
            addTaskToList(task);
        });

        li.querySelector('.edit').addEventListener('click', () => {
            const newTitle = prompt('Edit task title', task.title);
            const newDueDate = prompt('Edit due date', task.dueDate);

            if (newTitle && newDueDate) {
                task.title = newTitle;
                task.dueDate = newDueDate;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                li.innerHTML = `
                    ${task.title} (Due: ${task.dueDate})
                    <span class="edit">Edit</span>
                    <span class="delete">Delete</span>
                    ${!task.completed ? '<span class="complete-btn">Complete</span>' : ''}
                `;
                li.querySelector('.delete').addEventListener('click', () => {
                    tasks = tasks.filter(t => t.id !== task.id);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    li.remove();
                });

                li.querySelector('.complete-btn')?.addEventListener('click', () => {
                    task.completed = true;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    li.remove();
                    addTaskToList(task);
                });
            }
        });
    }

    tasks.forEach(addTaskToList);
});
