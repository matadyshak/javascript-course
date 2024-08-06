let calculation = localStorage.getItem('calc') || '';
displayCalculation(calculation);

function updateCalculation(key) {

  calculation += key;  
  localStorage.setItem('calc', calculation);
  displayCalculation(calculation);
}

function displayCalculation(calculation) {
  document.querySelector('.js-display')
    .innerHTML = calculation;
  //.innerHTML = `${calculation}`;  //works either way
}