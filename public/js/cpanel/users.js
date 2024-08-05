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
            if(formClass === 'newUser'){
                if(data){
                    if(data.username === '' || data.full_name === '' || data.password === '' || data.type_id === ''){
                        const alert = new Alert('w', 'Todos los campos son obligatorios.');
                        alert.showAlert();
                        return;
                    }

                    if(typeof data.type_id === 'string'){
                        data.type_id = parseInt(data.type_id);
                    }
        
                    const response = await fetch('/user/createUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
            
                    const result = await response.json();
                    
                    if(result.message === 'El nombre de usuario ya está en uso'){
                        const alert = new Alert('w', 'El nombre de usuario ya está en uso.');
                        alert.showAlert();
                        return;
                    }

                    if(result.username){
                        const alert = new Alert('c', 'Usuario creado correctamente.');
                        alert.showAlert();
                        window.location.reload();
                        return;
                    }
                }
            }

            // Proceso para buscar usuarios
            if(formClass == 'searchUsers'){
                console.log(data);
            }

        }
    });

});