import { Alert, Modal, FormModal } from '../alerts.js';
import { Main } from '../main.js';

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formClass = e.target.classList[0];
    const data = Object.fromEntries(
        new FormData(e.target)
    );

    if(formClass === 'backstoreNew'){

        const modal = new Modal();
        modal.showModal().then( async (result) => {
            if (result.action === 'confirm') {
                if(data.backstore === '' || data.direction === '' || data.phone === ''){
                    const alert = new Alert('w', 'Todos los campos son obligatorios');
                    alert.showAlert();
                    return;
                }
                
                const main = new Main();

                if(!main.verifyPhoneNumber(data.phone)){
                    const alert = new Alert('w', 'Número de teléfono inválido');
                    alert.showAlert();
                    return;
                }
                
                const response = await main.fetchMethod('POST', '/backstore/new', data);

                if(!response){
                    const alert = new Alert('e', 'Ups! Algo salió mal');
                    alert.showAlert();
                }

                if(response){
                    const alert = new Alert('c', 'Nueva bodega creada correctamente');
                    alert.showAlert();
                    setTimeout(() => {
                        location.reload();
                    }, 2500);
                }
            }
        });

    }
});

const table = document.querySelector('.table-container');

table.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if(e.target.closest('.editBackstore')){
        const id = e.target.closest('tr').dataset.id;
        
        const main = new Main();

        const response = await main.fetchMethod('POST', '/backstore/getDataForUpdate', {id});

        if(response.message === 'Error inesperado'){
            const alert = new Alert('e', 'Ups! Algo salió mal');
            alert.showAlert();
        }

        const properties = Object.keys(response);

        if(properties.length > 0){
            const formModal = new FormModal();

            formModal.body.innerHTML = '';

            const form = document.createElement('form');
            form.classList.add('editBackstoreForId');

            form.innerHTML = `
                <input type="hidden" name="idBackstore" value="${response.id}">
                <h2>Actualizar datos</h2>
                <a class="close-form-modal">
                    <svg width="30"  height="30"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" /></svg>
                </a>
                <div class="form-control mt-40">
                    <label for="backstore">Nombre de bodega:</label>
                    <input id="backstore" type="text" name="backstore" placeholder="Ingresa el nombre de la bodega" value="${response.name}">
                    <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                </div>
                <div class="form-control mt-10">
                    <label for="direction">Dirección:</label>
                    <input id="direction" type="text" name="direction" placeholder="Ingresa la dirección" value="${response.address}">
                    <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" /><path d="M9 15l-4.5 4.5" /><path d="M14.5 4l5.5 5.5" /></svg>
                </div>
                <div class="form-control mt-10">
                    <label for="phone">Teléfono:</label>
                    <input class="phone" id="phone" type="number" name="phone" placeholder="Ingresa el numero telefónico" value="${response.phone}">
                    <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" /><path d="M11 4h2" /><path d="M12 17v.01" /></svg>
                </div>
                <div class="form-control mt-20">
                    <button type="submit" class="btn btn-dark">Confirmar cambios</button>
                </div>
            `;
            formModal.showFormModal();
            formModal.body.appendChild(form);
        }

        const closeFormModal = document.querySelector('.close-form-modal');
        if(closeFormModal){
            closeFormModal.addEventListener('click', () => {
                const formModal = new FormModal();
                formModal.hideFormModal();
            });
        }
    }

    if(e.target.closest('.deleteBackstore')){
        const id = e.target.closest('tr').dataset.id;
        
        const modal = new Modal();
        modal.showModal().then( async (result) => {
            if (result.action === 'confirm') {
                const main = new Main();

                const response = await main.fetchMethod('DELETE', '/backstore/deleteBackstoreForId', {id});

                if(response.message === 'Error inesperado'){
                    const alert = new Alert('e', 'Ups! Algo salió mal');
                    alert.showAlert();
                }

                if(response){
                    const alert = new Alert('c', 'Bodega eliminada correctamente');
                    alert.showAlert();
                    setTimeout(() => {
                        location.reload();
                    }, 2500);
                }
            }
            return;
        });
    }

});

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formClass = e.target.classList[0];
    const data = Object.fromEntries(
        new FormData(e.target)
    );

    if(formClass === 'editBackstoreForId'){
        const modal = new Modal();
        modal.showModal().then( async (result) => {
            if (result.action === 'confirm') {
                if(data.backstore === '' || data.direction === '' || data.phone === ''){
                    const alert = new Alert('w', 'Todos los campos son obligatorios');
                    alert.showAlert();
                    return;
                }
                
                const main = new Main();

                if(!main.verifyPhoneNumber(data.phone)){
                    const alert = new Alert('w', 'Número de teléfono inválido');
                    alert.showAlert();
                    return;
                }
                
                const response = await main.fetchMethod('PUT', '/backstore/updateBackstoreForId', data);

                if(!response){
                    const alert = new Alert('e', 'Ups! Algo salió mal');
                    alert.showAlert();
                }

                if(response){
                    const alert = new Alert('c', 'Datos actualizados correctamente');
                    alert.showAlert();
                    setTimeout(() => {
                        location.reload();
                    }, 2500);
                }
            }
        });

    }
});