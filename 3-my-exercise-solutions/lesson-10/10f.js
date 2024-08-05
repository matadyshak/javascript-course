function toggleButton(theClass) {
  const buttonElement = document.querySelector(theClass);      
  if(buttonElement.classList.contains('is-enabled') ) {
    buttonElement.classList.remove('is-enabled');
  } else {
    buttonElement.classList.add('is-enabled');
  }
}