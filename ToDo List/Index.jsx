

// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAll = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userData = inputBox.value; 
	//getting user entered value
  if(userData.trim() != 0){ 
	//if the user value isn't only spaces
    addBtn.classList.add("active");
	//active the add button
  }else{
    addBtn.classList.remove("active"); 
	//unactive the add button
  }
}

showtask();
 //if user click on the plus button
 addBtn.onclick = ()=>{ //when user click on plus icon button
  let userData = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userData); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
	showtask();
}

//function to add task in todo list

function showtask(){
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
	const pendingNum = document.querySelector(".pendingNum");
  pendingNum.textContent = listArray.length;
	if(listArray.length>0){
		deleteAll.classList.add("active");
	}else{
		deleteAll.classList.remove("active");
	}


	let newiTag ='';
	listArray.forEach((element, index)=>{
		newiTag += `<li>${element}<span onclick='deleteTask(${index})'; 
		<i class="fas fa-trash"></i></span></li>`;
	})
	todoList.innerHTML = newiTag;//adding new task in todo list
  inputBox.value = ''; //clearing input field
}

//deleting task from todo list

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showtask(); //call the showTasks function
}

//delete all tasks

deleteAll.onclick = ()=>{
	listArray = [];
	localStorage.setItem("New Todo", JSON.stringify(listArray));
	showtask();
}