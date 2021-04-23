const sidebutton = document.querySelector(".sidebutton");
const sidelist = document.querySelector('.sidelist');
const todoform = document.querySelector(".input");
const doinput = document.querySelector(".writetodo");
const todolist = document.querySelector(".todolist");
const currentdate = document.getElementById('currentDate');
const inputdate = document.querySelector(".dateinput");


let todos = [];
const TODO_LS = "todo";

currentdate.value = new Date().toISOString().substring(0, 10);


function opensidebar(){
    sidelist.classList.toggle("act");
    sidebutton.classList.toggle("open");
    
}

if(sidebutton){
    sidebutton.addEventListener("click", opensidebar);
};

function savetodo(){
    localStorage.setItem("USER", JSON.stringify(todos));
}


function todopaint(text, year, month, date){
    const li = document.createElement("li");
    const delbtn = document.createElement("button");
    const newid = todos.length+1;
    const span = document.createElement("span");
    delbtn.innerHTML="X"
    delbtn.addEventListener("click", dellist);
    span.innerText=text;
    li.appendChild(delbtn);
    li.appendChild(span);
    li.id = newid;
    todolist.appendChild(li);
    const todoobj = {
        text,
        id: newid,
        date,
        month,
        year,
    };
    todos.push(todoobj);
    savetodo();
}

function dellist(event){
    const li = event.target.parentNode; 
    todolist.removeChild(event.target.parentNode);
    const clean = todos.filter(function(x){
        return x.id === parseInt(li.id);
    });
    todos=clean;
    savetodo();

}


function handlesubmit(event){
    event.preventDefault();
    todopaint(doinput.value, 
        event.target[0].value.substring(0,4),
        event.target[0].value.substring(5,7),
        event.target[0].value.substring(8,10));
        doinput.value="";
}

function todoload(){
    const todos = localStorage.getItem("USER");
    if(todos !==null){
        const jsontodos = JSON.parse(todos);
        jsontodos.forEach(function(todo){
            todopaint(todo.text, todo.year, todo.month, todo.date);
        });
    }

}


function init(){
    todoload();
    todoform.addEventListener("submit", handlesubmit);
}

init();