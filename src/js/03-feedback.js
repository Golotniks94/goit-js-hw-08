import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  submit: document.querySelector('button'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
let formData = {};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onFormInput, 1000));
refs.form.addEventListener('submit', onFormSubmit);

populateInput();

function populateInput() {
  if (localStorage[STORAGE_KEY]) {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsedData = JSON.parse(savedData);

    if (parsedData.email) {
      refs.input.value = parsedData.email;
    }

    if (parsedData.message) {
      refs.textarea.value = parsedData.message;
    }
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  formData.email = e.currentTarget.elements.email.value;
  formData.message = e.currentTarget.elements.message.value;
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
