const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const fileInput = document.getElementById('recta');
const instructionsInput = document.getElementById('instructions');


const validateForm = () => {
  let isValid = true;
  let errorMessage = '';

  //nombre 
  if (nameInput.value.trim().length < 3) {
    isValid = false;
    errorMessage += 'El nombre debe tener al menos 3 caracteres.\n';
  }

  // correo electrónico 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    isValid = false;
    errorMessage += 'Por favor, introduce un correo electrónico válido.\n';
  }

  // subir archivo
  if (!fileInput.files.length) {
    isValid = false;
    errorMessage += 'Debes subir un archivo con la receta.\n';
  }

  // instruccionesss
  if (instructionsInput.value.trim().length < 10) {
    isValid = false;
    errorMessage += 'Las instrucciones deben tener al menos 10 caracteres.\n';
  }

  // Mostrar los erroes
  if (!isValid) {
    alert(errorMessage);
  }

  return isValid;
};

// Manejo del evento de envío
form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  // Crear los datos del formulario

  if (validateForm()) {
    const formData = new FormData(form);  
    fetch('http://localhost:3000/submit-Recipe', {
      method: 'POST',
      body: formData  
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      form.reset();  
    })
    .catch(error => {
      alert('Hubo un error al enviar la receta.');
      console.error('Error:', error);
    });
  }
});
