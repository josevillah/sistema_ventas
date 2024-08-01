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