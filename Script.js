const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = (evt)=>{
    let userData = inputBox.value;
    if(evt.keyCode == 13){
        addData();
    }
    if(userData.trim() != 0){
        addBtn.classList.add("active");
    }
    else{
        addBtn.classList.remove("active");  
    }
}
function addData(){
    let userData = inputBox.value;
    let getLocalStroge = localStorage.getItem("New Todo");
    if(getLocalStroge == null){
        listArr = [];
    }
    else{
        listArr = JSON.parse(getLocalStroge);
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
showTasks();
addBtn.onclick = ()=>{
    addData();
}

// Function  to add task list inside ul
function showTasks(){
    let getLocalStroge = localStorage.getItem("New Todo");
    if(getLocalStroge == null){//if LocalStorage is null
        listArr = [];//Creating Blank array
    }
    else{
        listArr = JSON.parse(getLocalStroge);//Transforming JSOS string into a js object
        addBtn.classList.remove("active");  
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//passing the length value in pendingNumb
    if(listArr.length > 0){ // if array length is greator than 0
        deleteAllBtn.classList.add("active");//active the clearall button 
    }else{
        deleteAllBtn.classList.remove("active");//unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element, index)  => {
        newLiTag  += `<li class="element"> ${element} <span onclick = "deleteTask(${index})"; ><i class = "fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = "";//once task added leave the input field blank
}

//Delete task from list
function deleteTask(index){
    let getLocalStroge = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStroge);
    listArr.splice(index, 1);//delete or remove the particular index
    //after removing the li again update the local Storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
} 
//Delete  all task function
deleteAllBtn.onclick = () =>{
    listArr = [];//Empty an array
     //after delete all task again update the local Storage
     localStorage.setItem("New Todo", JSON.stringify(listArr));
     showTasks();
}
