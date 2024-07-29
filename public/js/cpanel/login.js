import { Alert } from '../alerts.js';

const btnLogin = document.querySelector('.btn-primary');

btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    if (username === '' || password === '') {
        const alert = new Alert('w', 'Por favor, rellene todos los campos.');
        alert.showAlert();
        return;
    }

    const data = { username, password };
    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.message === 'El usuario no existe' || result.message === 'La contraseña es incorrecta') {
        const alert = new Alert('w', 'Usuario o contraseña incorrectos.');
        alert.showAlert();
        return;
    }

    if(result.username.length > 0) {
        const alert = new Alert('c', 'Bienvenido!');
        alert.showAlert();
        setTimeout(() => {
            window.location.href = `${window.location.href}/dashboard`;
        }, 2500);
    }
});