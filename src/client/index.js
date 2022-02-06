import { handleSubmit } from './js/formHandler'
import { updateUi } from './js/formHandler'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

const city = document.getElementById('city');
const date = document.getElementById('date');
let pic = document.getElementById('pic');
let weather = document.getElementById('weather');
let error = document.getElementById('error');
let clear = document.getElementById('clear');
let print = document.getElementById('print');

document.getElementById('generate').addEventListener('click', goAPI);

function goAPI(e) {
  e.preventDefault();

  handleSubmit('/postData', {
    City: city.value,
    Date: date.value,
  })
  .then(() => {
    updateUi();
  });
};

// Allow the user to remove the trip.
document.getElementById('clear').addEventListener('click', clearUi);

function clearUi(e) {
  e.preventDefault();
  pic.innerHTML = ``;
  weather.innerHTML = ``;
  error.innerHTML = ``;
}

// Allow user to Print their trip and/or export to PDF. window.print()
document.getElementById('print').addEventListener('click', printUi);

function printUi(e) {
  e.preventDefault();
  window.print();
}

export {
  handleSubmit,
  updateUi
}