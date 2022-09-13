'use strict'

class Todo {
    constructor(form, input, todoList, todoComleted, todoButtons){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoComleted = document.querySelector(todoComleted);
        this.todoData = JSON.parse(localStorage.getItem('toDoList')) || {};
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify(this.todoData));
    }

    render(){
        this.todoList.textContent = '';
        this.todoComleted.textContent = '';
        Object.entries(this.todoData).forEach(this.createItem);
        this.addToStorage();
    }

    createItem = ([key, {value, completed}]) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);
        

        if(completed){
            this.todoComleted.append(li)
        } else {
            this.todoList.append(li);
        }

        li.addEventListener('click', (event) => {
            let target = event.target;
        
            if(target.matches('.todo-remove')){
                this.deleteItem(key);
            } else if(target.matches('.todo-complete')){
                this.completedItem(key);
            }
        });

    }

    addTodo(event){
        event.preventDefault();
        if(this.input.value.trim()){
            this.todoData[this.generateKey()] =  {  
                value: this.input.value,
                completed: false  
            };
            this.input.value = '';
            this.render();
        }
    }

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key){
        delete this.todoData[key]
        this.render();
    }

    completedItem(k){
        const currentItem =  this.todoData[k];
        this.todoData[k] = { ...currentItem, completed: !currentItem.completed}
        this.render();
    }

    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
