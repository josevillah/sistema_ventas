import { Alert, Modal } from '../alerts.js';

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formClass = e.target.classList[0];
    const data = Object.fromEntries(
        new FormData(e.target)
    );

    const modal = new Modal();
    modal.showModal().then( async (result) => {
        if (result.action === 'confirm') {
            // proceso para cambiar la clave
            if(formClass === 'changePassword'){
                if(data){
                    if(data.pass === '' || data.newPasword === '' || data.repetPassword === ''){
                        const alert = new Alert('w', 'Todos los campos son obligatorios.');
                        alert.showAlert();
                        return;
                    }
            
                    if(data.newPasword !== data.repetPassword){
                        const alert = new Alert('w', 'Las contraseñas no coinciden.');
                        alert.showAlert();
                        return;
                    }
            
                    const response = await fetch('/user/changePassword', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
            
                    const result = await response.json();
            
                    if(result.message === 'La contraseña es incorrecta'){
                        const alert = new Alert('w', 'La contraseña actual es incorrecta.');
                        alert.showAlert();
                        return;
                    }
            
                    if(result == true){
                        const alert = new Alert('c', 'Contraseña actualizada correctamente.');
                        alert.showAlert();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                    }
                }
            }
        
            // proceso para actualizar la información de la cuenta
            if(formClass === 'infoAccount'){
                if(data.username === '' || data.full_name === '', data.password === ''){
                    const alert = new Alert('w', 'Todos los campos son obligatorios.');
                    alert.showAlert();
                    return;
                }
        
                const response = await fetch('/user/updateUser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
        
                const result = await response.json();
                
                if(result.message === 'La contraseña es incorrecta'){
                    const alert = new Alert('w', 'La contraseña es incorrecta.');
                    alert.showAlert();
                    return;
                }
        
                if(result.message === 'El usuario ya existe'){
                    const alert = new Alert('w', 'El usuario ya existe.');
                    alert.showAlert();
                    return;
                }
        
                if(result.username.length > 0){
                    const alert = new Alert('c', 'Información actualizada correctamente.');
                    alert.showAlert();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                }
            }
        }
    });
});