import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageInput = document.querySelector('textarea');
const LOCAL_KEY = 'feedback-form-state';
form.addEventListener('input', throttle(saveFormData, 500));
form.addEventListener('submit', onSubmitClear);

const inputData = { email: '', message: '' };
fillFormData();

function saveFormData(evt) {
  inputData[evt.target.name] = evt.target.value;
  console.log(inputData);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(inputData));
}

function fillFormData() {
  const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY));

  if (savedData) {
    emailInput.value = savedData.email;
    inputData.email = savedData.email;
    messageInput.value = savedData.message;
    inputData.message = savedData.message;
  }
}

function onSubmitClear(evt) {
  evt.preventDefault();
  if (emailInput.value === '' || messageInput.value === '') {
    alert('Не заповнені всі поля');
    return;
  }
  console.log(JSON.parse(localStorage.getItem(LOCAL_KEY)));

  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}
