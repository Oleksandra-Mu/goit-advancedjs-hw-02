const formData = { email: '', message: '' };
const feedbackForm = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const load = key => {
  try {
    const dataFromLS = localStorage.getItem(key);

    return dataFromLS === null ? undefined : JSON.parse(dataFromLS);
  } catch (err) {
    console.log(err);
  }
};

const fillFormField = () => {
  const formDataFromLS = load(localStorageKey);

  if (formDataFromLS === undefined) {
    return;
  }

  const formDataFromLSKeys = Object.keys(formDataFromLS);

  formDataFromLSKeys.forEach(key => {
    feedbackForm.elements[key].value = formDataFromLS[key];
    formData[key] = formDataFromLS[key];
  });

  console.log(formData);
};

fillFormField();

feedbackForm.addEventListener('input', evt => {
  const { target: formField } = evt;

  const fieldName = formField.name;
  const fieldValue = formField.value;

  formData[fieldName] = fieldValue;

  save(localStorageKey, formData);
});

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const formDataValues = Object.values(formData);

  if (formDataValues.some(el => el === '')) {
    alert('Fill please all fields');
  }

  evt.currentTarget.reset();
  localStorage.removeItem(localStorageKey);
});
