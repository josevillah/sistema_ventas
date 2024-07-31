import { Alert } from '../alerts.js';

const moduleActions = document.querySelector('.module-actions');

const handlerModule = (moduleBtn) => {
    const moduleActions = document.querySelector('.module-actions');
    const modulActive = moduleActions.querySelector('.active');
    
    if(modulActive){
        modulActive.classList.remove('active');
        moduleBtn.classList.add('active');
        const moduleCardActive = document.querySelector('.module-card.active');
        moduleCardActive.classList.remove('active');
    }

    if(moduleBtn.classList.contains(`${moduleBtn.classList[2]}`)){
        const moduleCard = document.querySelector(`.module-card.${moduleBtn.classList[2]}`);
        if(!moduleCard.classList.contains('active')){
            moduleCard.classList.add('active');
        }
    }
};

moduleActions.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')) {
        handlerModule(e.target);
    }
});

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formClass = e.target.classList[0];
    const data = Object.fromEntries(
        new FormData(e.target)
    );
    
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
    
            data.info = formClass;
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

});