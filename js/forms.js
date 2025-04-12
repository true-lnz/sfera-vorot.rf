const workemailList = document.querySelectorAll('.workemail');
const formAllInputs = document.querySelectorAll('.form__group-input, .form__group-textarea');

workemailList.forEach((item) => {
  item.value = '';
  item.removeAttribute('required');
});
const removeErrorClass = (event) => {
  const inputWrapp = event.target.closest('.form__group');
  if (!inputWrapp.classList.contains('form__group--error')) {
    return false;
  }
  inputWrapp.classList.remove('form__group--error');
  inputWrapp.removeAttribute('title');
};

formAllInputs.forEach((item) => {
  item.addEventListener('input', removeErrorClass);
  item.addEventListener('change', removeErrorClass);
});

let tokenRecaptcha = null;
const ReCaptchaCallbackV3 = function() {
    grecaptcha.ready(function() {
        grecaptcha.reset = grecaptchaExecute;
        grecaptcha.reset();
    });
};
function grecaptchaExecute() {
    grecaptcha.execute('6LegYH4pAAAAAEmV8qeFEUi8q-RoIZ4ZfAHebybF', { action: 'form_submit' }).then(function(token) {
        tokenRecaptcha = token;
    });
};

/* try {
    var script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6LegYH4pAAAAAEmV8qeFEUi8q-RoIZ4ZfAHebybF&trustedtypes=true';
    script.async = true;
    script.onload = ReCaptchaCallbackV3;
    document.querySelector('body').appendChild(script);
  
    setInterval(function() {
        grecaptcha.reset();
    }, 60000); // 60 sec
} catch (error) {
    console.log('Failed grecaptcha: ' + error);
}
 */
const formModule = (selectorForm, url) => {
  const currentForm = document.querySelector(selectorForm);
  if (!currentForm) return false;

  currentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const thisForm = event.target;
    const formData = new FormData(thisForm);
    const buttonSubmit = thisForm.querySelector('button[type="submit"]');

    buttonSubmit.setAttribute('disabled', 'disabled');
    buttonSubmit.classList.add('button--loader');

    if (tokenRecaptcha) {
      formData.append("g_recaptcha_response", tokenRecaptcha);
    }
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        const inputName = thisForm.querySelector('input[name="user_name"]');
        const inputPhone = thisForm.querySelector('input[name="user_phone"]');
        const inputSocial = thisForm.querySelector('input[name="user_social"]');
        const inputMessage = thisForm.querySelector('textarea[name="user_message"]');
        if (result.status == "success") {
          try {
            ym(41093949, 'reachGoal', 'request', {}, function () { console.log('Цель request - успешно отправлена!') });
          } catch (error) {
            console.log('Ошибка при отправке цели в метрику');
          }
          window.api.modals.close();
          setTimeout(() => {
            window.api.modals.open('#success');
          }, 300);
          if (inputName)
            inputName.value = '';
          if (inputPhone)
            inputPhone.value = '';
          if (inputSocial)
            inputSocial.value = '';
          if (inputMessage)
            inputMessage.value = '';


        } else {

          if (result.user_name && inputName) {
            inputName.closest('.form__group').classList.add('form__group--error');
            inputName.closest('.form__group').setAttribute('title', result.user_name.trim());
          }
          if (result.user_phone && inputPhone) {
            inputPhone.closest('.form__group').classList.add('form__group--error');
            inputPhone.closest('.form__group').setAttribute('title', result.user_phone.trim());
          }
          if (result.user_social && inputSocial) {
            inputSocial.closest('.form__group').classList.add('form__group--error');
            inputSocial.closest('.form__group').setAttribute('title', result.user_social.trim());
          }
          if (result.user_message && inputMessage) {
            inputMessage.closest('.form__group').classList.add('form__group--error');
            inputMessage.closest('.form__group').setAttribute('title', result.user_message.trim());
          }

          if (!result.user_name && !result.user_phone && !result.user_social && !result.user_message) {
            window.api.modals.close();
            setTimeout(() => {
              window.api.modals.open('#error');
            }, 300);
          }
        }
        buttonSubmit.removeAttribute('disabled');
        buttonSubmit.classList.remove('button--loader');
      }).catch((error) => {
        console.log(error);
        window.api.modals.close();
        setTimeout(() => {
          window.api.modals.open('#error');
        }, 300);
        buttonSubmit.removeAttribute('disabled');
        buttonSubmit.classList.remove('button--loader');
      });
  });
};
formModule('#feedback .form', '/form_handler_feedback/');
formModule('#instruction_form', '/form_handler_feedback/');
formModule('#repair_form', '/form_handler_feedback/');
formModule('#review_form', '/form_handler_review/');
formModule('#calculator .form', '/form_handler_calculator/');
