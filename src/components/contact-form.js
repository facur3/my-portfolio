function updateCounter() {
  const messageField = document.getElementById('message');
  const counterSpan = document.getElementById('char-counter');
  if (messageField && counterSpan) {
    counterSpan.textContent = `${messageField.value.length}/300`;
  }
}

function clearErrors() {
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  if (messageError) messageError.textContent = "";
}

function validateFields() {
  let valid = true;
  clearErrors();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!name) {
    const nameError = document.getElementById('name-error');
    if (nameError) nameError.textContent = "El nombre es requerido.";
    valid = false;
  }

  if (!email) {
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.textContent = "El email es requerido.";
    valid = false;
  } else if (!email.includes('@')) {
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.textContent = "Ingrese un email válido.";
    valid = false;
  }

  if (!message) {
    const messageError = document.getElementById('message-error');
    if (messageError) messageError.textContent = "El mensaje es requerido.";
    valid = false;
  } else if (message.length > 300) {
    const messageError = document.getElementById('message-error');
    if (messageError) messageError.textContent = "El mensaje no puede exceder 300 caracteres.";
    valid = false;
  }

  return valid;
}

document.addEventListener('astro:page-load', () => {
  const form = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-button');
  const messageField = document.getElementById('message');

  if (messageField) {
    messageField.addEventListener('input', updateCounter);
    updateCounter(); // Initial call
  }

  if (form && submitButton) {
    form.addEventListener('submit', function(e) {
      if (!validateFields()) {
        e.preventDefault();
      } else {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }
    });
  }
});