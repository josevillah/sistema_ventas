import { Alert, Modal, FormModal } from '../alerts.js';
import { Main } from '../main.js';

document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formClass = e.target.classList[0];
    const data = Object.fromEntries(
        new FormData(e.target)
    );

    if(formClass === 'editUserForId'){

        const modal = new Modal();
        modal.showModal().then( async (result) => {
            if (result.action === 'confirm') {
                const keys = Object.keys(data);
                if(keys.length > 0){
                    data.type_id = parseInt(data.type_id);            
                    const response = await fetch('/user/editUserForId', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
        
                    const result = await response.json();
        
                    if(result.username){
                        const alert = new Alert('c', 'Usuario actualizado correctamente.');
                        alert.showAlert();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                    }
                }
                return;
            }
        });

    }

    // Proceso para buscar usuarios
    if(formClass == 'searchUsers'){
        const formatData = data.search.trim();

        if(formatData.length > 0){
            const response = await fetch('/user/searchUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            table.querySelector('tbody').innerHTML = '';
            if(result.users.length > 0){
                const table = document.querySelector('.styled-table');
                result.users.forEach(oneUser => {
                    const typeUser = result.typeUsers.find(type => type.id === oneUser.type_id);
                    const typeName = typeUser ? typeUser.name : 'No definido';
                    const tr = document.createElement('tr');
                    tr.dataset.id = oneUser.id;
                    tr.innerHTML = `
                        <td>${oneUser.username}</td>
                        <td>${oneUser.full_name}</td>
                        <td class="colorTypeUser">
                            ${ oneUser.type_id == 1 ? 'Desarrollador' : typeName }
                        </td>
                        <td class="statusActive">
                            ${oneUser.status == 1 ? '<span class="colorStatusActive"></span>' : '<span class="colorStatusInactive"></span>'}
                        </td>
                        <td>${oneUser.created_at}</td>
                        <td class="table-options">
                            ${ oneUser.type_id != 1 ? `
                                <a class="editUser" href="">
                                    <svg width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                </a>
                                <a class="deleteUser" href="">
                                    <svg width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </a> 
                            ` : 'Sin opciones'
                            }
                            
                        </td>
                    `;
                    table.querySelector('tbody').appendChild(tr);
                });
            }else{
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td colspan="6">No se encontraron resultados.</td>
                `;
                table.querySelector('tbody').appendChild(tr);
            }
        }
        return;
    }
    
    const modal = new Modal();
    modal.showModal().then( async (result) => {
        if (result.action === 'confirm') {
            // proceso para cambiar la clave
            if(formClass === 'newUser'){
                if(data){

                    if(!data.type_id){
                        const alert = new Alert('w', 'Todos los campos son obligatorios.');
                        alert.showAlert();
                        return;
                    }

                    if(data.username === '' || data.full_name === '' || data.password === ''){
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
                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                    }
                }
            }
        }
    });

});

const table = document.querySelector('.styled-table');

table.addEventListener('click', async (e) => {
    e.preventDefault();

    // Esta porción de código se encarga de eliminar un usuario
    if(e.target.closest('.deleteUser')){
        const id = e.target.closest('tr').dataset.id;
        const modal = new Modal();
        modal.showModal().then( async (result) => {
            if(result.action === 'confirm'){

                const main = new Main();
                const response = await main.fetchMethod('DELETE', '/user/deleteUser', {id});

                if(response.username.length > 0){
                    const alert = new Alert('c', 'Usuario eliminado correctamente.');
                    alert.showAlert();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                }
            }
        });
    }

    // Esta porción de código se encarga de editar un usuario
    if(e.target.closest('.editUser')){
        const id = e.target.closest('tr').dataset.id;

        const main = new Main();
        const response = await main.fetchMethod('POST', '/user/getUserForId', {id});
        const properties = Object.keys(response);

        if(properties.length > 0){
            const formModal = new FormModal();

            formModal.body.innerHTML = '';

            const form = document.createElement('form');
            form.classList.add('editUserForId');
            const typeUserId = response.typeUsers.find(type => type.id === response.user.type_id);

            form.innerHTML = `
                <form action="" method="POST">
                    <input type="hidden" name="idUser" value="${response.user.id}">
                    <h2>Actualizar datos</h2>
                    <a class="close-form-modal">
                        <svg width="30"  height="30"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" /></svg>
                    </a>
                    <div class="form-control mt-40">
                        <p>
                            Nombre del usuario:
                            <span>${response.user.username}</span>
                        </p>
                    </div>
                    <div class="form-control dropdown mt-10">
                        <label for="type_id">Selecciona el tipo de usuario: </label>
                        <select name="type_id" id="type_id">
                            <option value="${typeUserId.id}" selected>${typeUserId.name}</option>
                            ${response.typeUsers.map(type => 
                                type.id !== response.user.type_id ? 
                                `<option value=" ${type.id}"> ${type.name}</option>` :
                                ''
                            )}
                        </select>
                    </div>
                    <div class="form-control mt-20">
                        <div class="switch-container">
                            <p>Estado:</p>
                            <input type="checkbox" name="btnSwitch" id="btnSwitch" ${response.user.status ? 'checked': ''}>
                            <label for="btnSwitch"></label>
                        </div>
                    </div>
                    <div class="form-control mt-20">
                        <button type="submit" class="btn btn-dark">Modificar</button>
                    </div>
                </form>
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
});