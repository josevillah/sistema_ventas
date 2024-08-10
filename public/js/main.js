export class Main{

    constructor(){}

    // method to match a valid phone number
    verifyPhoneNumber(phoneNumber) {
        const phoneRegex = /^\d{9}$/;
    
        return phoneRegex.test(phoneNumber);
    };

    async fetchMethod(method, url, data){
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    };
}