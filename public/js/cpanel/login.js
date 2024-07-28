import { Alert } from '../alerts.js';

const btnLogin = document.querySelector('.btn-primary');

btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const user = document.querySelector('input[name="user"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    if (user === '' || password === '') {
        const alert = new Alert('w', 'Por favor, rellene todos los campos.');
        alert.showAlert();
        return;
    }

    const data = { user, password };
    const response = await fetch('/cpanel/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    // const alert = new Alert('c', 'Bienvenido!');
    // alert.showAlert();
    // setTimeout(() => {
    //     window.location.href = `${window.location.href}/dashboard`;
    // }, 2500);
});