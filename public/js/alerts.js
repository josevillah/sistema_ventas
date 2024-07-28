export class Alert {
    constructor(type, message) {
        this.alertType = type;
        this.message = message;
        this.alertContainer = document.querySelector('.alert-container');
        this.alert = document.querySelector('.alert');
        this.alertText = document.querySelector('.alert-text');
    }

    showAlert() {
        this.alertContainer.classList.remove('hide');
        this.alert.classList.remove('hide');

        // Si la alerta es error
        if(this.alertType === 'e') {
            const icon = document.querySelector('.alert-icon .danger');
            this.alert.classList.add('danger');
            icon.classList.remove('hide');
            this.alertText.textContent = this.message;
        }
        
        // Si la alerta es warning
        if(this.alertType === 'w') {
            const icon = document.querySelector('.alert-icon .warning');
            this.alert.classList.add('warning');
            icon.classList.remove('hide');
            this.alertText.textContent = this.message;
        }
        
        // Si la alerta es complete
        if(this.alertType === 'c') {
            const icon = document.querySelector('.alert-icon .complete');
            this.alert.classList.add('complete');
            icon.classList.remove('hide');
            this.alertText.textContent = this.message;
        }
        
        setTimeout(() => {
            this.hideAlert();
        }, 2000);
    }

    hideAlert() {
        this.alertContainer.classList.add('hide');
        this.alert.classList.add('hide');

        // Si la alerta es error
        if(this.alertType === 'e') {
            const icon = document.querySelector('.alert-icon .danger');
            this.alert.classList.remove('danger');
            icon.classList.add('hide');
            this.alertText.textContent = '';
        }
        
        // Si la alerta es warning
        if(this.alertType === 'w') {
            const icon = document.querySelector('.alert-icon .warning');
            this.alert.classList.remove('warning');
            icon.classList.add('hide');
            this.alertText.textContent = '';
        }
        
        // Si la alerta es complete
        if(this.alertType === 'c') {
            const icon = document.querySelector('.alert-icon .complete');
            this.alert.classList.remove('complete');
            icon.classList.add('hide');
            this.alertText.textContent = '';
        }

        return;
    }
}