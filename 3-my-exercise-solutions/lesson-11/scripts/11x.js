const storageKey = 'TODO-LIST';
// Get strings from localStorage and convert strings to object todoList
// If item does not exist in localStorage it returns a NULL
let todoList = JSON.parse(localStorage.getItem(storageKey));
if (!todoList) {
  todoList = [
    { name: 'make dinner', dueDate: '2022-12-22'},
    { name: 'wash dishes', dueDate: '2022-12-22'}
  ];
  localStorage.setItem(storageKey, JSON.stringify(todoList));
}
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);   
        renderTodoList();
      " class="delete-todo-button">Delete</button> 
    `;

    // .splice(${i}, 1)   deletes one object at index i
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
  console.log(todoListHTML);  
  // convert object todoList to strings and save in localStorage
  localStorage.setItem(storageKey, JSON.stringify(todoList));
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  if(!name) {
    return;
  }

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  if (!isValidDate(dueDate)) {
    return;
  }

  todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}

// Getting YYYY-MM-DD but on screen it is MM
function isValidDate(dateString) {
  // Check if the date string matches the mm/dd/yyyy format
  
  console.log(`dateString1: ${dateString}`);   //2024-12-31
  if (dateString.length === 0) {
    return false;
  }
  // For MM/DD/YYYY
  //const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

  // For YYYY/MM/DD
  //const regex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  
  // For YYYY-MM-DD
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


  if (!regex.test(dateString)) {
      console.log('Failed regex test.');
      return false;
  }

  // Parse the date parts to integers
  //const parts = dateString.split("/");
  //const month = parseInt(parts[0], 10);
  //const day = parseInt(parts[1], 10);
  //const year = parseInt(parts[2], 10);

  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Check the validity of the date
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Example usage
//console.log(isValidDate("08/12/2024")); // true
//console.log(isValidDate("02/30/2024")); // false
