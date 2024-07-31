const panel = document.querySelector('.panel');

panel.addEventListener('click', function(e) {
    e.preventDefault();
    const listItem = e.target.closest('li');
    const childPanel = listItem.querySelector('.panel-child');

    // Abir el submenu
    if(childPanel){
        if(childPanel.clientHeight == 0){
            childPanel.style.height = `${childPanel.scrollHeight}px`;
            return;
        }
        childPanel.style.height = '0px';   
    }

    // Redireccionar a la pagina seleccionada
    if(!childPanel){
        const href = listItem.querySelector('a').getAttribute('href');
        if(href){
            window.location.href = `${href}`;
        }
    }
});