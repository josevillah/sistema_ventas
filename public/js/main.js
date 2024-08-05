// Funcionamienfo del selector de opciones
const inputSelector = document.querySelector('.input-selector');

if (inputSelector) {
    inputSelector.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownOptions = document.querySelector('.dropdown-options');
        if (dropdownOptions.style.height === '' || dropdownOptions.style.height === '0px') {
            dropdownOptions.style.height = `${dropdownOptions.scrollHeight}px`;
        } else {
            dropdownOptions.style.height = '0px';
        }
    });
}

document.addEventListener('click', (e) => {
    const dropdownOptions = document.querySelector('.dropdown-options');
    if(dropdownOptions){
        if (dropdownOptions && e.target !== dropdownOptions && e.target !== inputSelector) {
            dropdownOptions.style.height = '0px';
        }
    }
});

const dropdownOptions = document.querySelector('.dropdown-options');
if (dropdownOptions) {
    dropdownOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const type_id = document.querySelector('.type_id');
            type_id.value = e.target.getAttribute('data-id');
            inputSelector.value = e.target.textContent;
            dropdownOptions.style.height = '0px';
        }
    });
}
// fin del selector de opciones