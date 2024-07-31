const moduleActions = document.querySelector('.module-actions');

moduleActions.addEventListener('click', (e) => {
    e.preventDefault();

    // Boton de info del usuario
    if(e.target.classList.contains('btn')) {
        
        const modulActive = moduleActions.querySelector('.active');
        if(modulActive){
            modulActive.classList.remove('active');
        }


        if(e.target.classList.contains('info')){
            if(!e.target.classList.contains('active')){
                e.target.classList.add('active');
                const moduleCard = document.querySelector('.module-card');
                if(moduleCard.clientHeight == 0){
                    moduleCard.style.padding = '20px';
                    moduleCard.style.height = `${moduleCard.scrollHeight}px`;
                    return;
                }
                moduleCard.style.height = '0';
                moduleCard.style.padding = '0';
                return;
            }
            
            if(e.target.classList.contains('active')){
                e.target.classList.remove('active');
                const moduleCard = document.querySelector('.module-card');
                if(moduleCard.clientHeight == 0){
                    moduleCard.style.padding = '20px';
                    moduleCard.style.height = `${moduleCard.scrollHeight}px`;
                    return;
                }
                moduleCard.style.height = '0';
                moduleCard.style.padding = '0';
                return;
            }
        }
    }
});