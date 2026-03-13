
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;


const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme); 
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.classList.remove('bi-moon-stars-fill');
    themeIcon.classList.add('bi-sun-fill', 'text-warning');
  } else {
    themeIcon.classList.remove('bi-sun-fill', 'text-warning');
    themeIcon.classList.add('bi-moon-stars-fill');
  }
}


const form = document.querySelector('#formulario');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  if (!peso) {
    setResultado('Peso inválido. Por favor, insira um número válido.', false);
    return;
  }

  if (!altura) {
    setResultado('Altura inválida. Por favor, insira um número válido.', false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é <strong>${imc}</strong> (${nivelImc}).`;
  setResultado(msg, true);
});

function getNivelImc(imc) {
  const nivel = [
    'Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'
  ];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  return nivel[0];
}

function getImc(peso, altura) {
  const imc = peso / (altura ** 2);
  return imc.toFixed(2);
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = ''; 

 
  const divAlert = document.createElement('div');
  divAlert.setAttribute('role', 'alert');
  
  
  const iconClass = isValid ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
  const alertClass = isValid ? 'alert-success' : 'alert-danger';
  
  divAlert.className = `alert ${alertClass} d-flex align-items-center mb-0 mt-3 shadow-sm`;
  divAlert.innerHTML = `
    <i class="bi ${iconClass} flex-shrink-0 me-2" style="font-size: 1.2rem;"></i>
    <div>${msg}</div>
  `;

  resultado.appendChild(divAlert);
}