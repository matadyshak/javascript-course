/*

function toggleButtons(clickedButton, otherButton1, otherButton2) {
  const clickedElement = document.querySelector(clickedButton);      
  const otherElement1  = document.querySelector(otherButton1);      
  const otherElement2  = document.querySelector(otherButton2);      

  if(clickedElement.classList.contains('is-enabled') ) {
    clickedElement.classList.remove('is-enabled');
  } else {
    clickedElement.classList.add('is-enabled');
    otherElement1.classList.remove('is-enabled');
    otherElement2.classList.remove('is-enabled');
  }
}

*/


function toggleButtons(clickedButton) {
  const clickedElement = document.querySelector(clickedButton);      

  if(!clickedElement.classList.contains('is-enabled') ) {
    turnOffPreviousButton();
    clickedElement.classList.add('is-enabled');
  } else {
    clickedElement.classList.remove('is-enabled');
  }
}

function turnOffPreviousButton() {
  // Can return a list of buttons but only 1 will be enabled at a time by design
  const previousButton = document.querySelector('.is-enabled');
  if (previousButton) {
    previousButton.classList.remove('is-enabled');
  }
}