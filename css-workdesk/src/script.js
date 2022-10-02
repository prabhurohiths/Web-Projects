const input = document.querySelector('input');
const autocomplete = document.querySelector('.auto-complete');

const search = (e) => {
  const inputVal = e.target.value;

  if(inputVal !== null || inputVal !== '') {
    autocomplete.classList.add('shown');
  }

  if(e.keyCode === 13){
    window.open(`https://www.skroutz.gr/search?keyphrase=${input.value}`, '_blank');
  }
}

const clearAutoComplete = (e) => {
  const inputVal = e.target.value;
  const isEmpty = inputVal === '' || inputVal === null;  
  
  if(isEmpty) {
    autocomplete.classList.remove('shown');
  }
  
  calculateAutoCompleteHeight(inputVal);
}

calculateAutoCompleteHeight = (value) => {
  if(value.length % 5 == 0 && value.length < 30){
    autocomplete.style.height = `${50 - (value.length * 1.6)}px`;
  }
}
