import Api from '@/services/Api';

export default {
    signup(data) {
        return Api().post('signup', data);
    }
}

/*
AuthentificationService.signup({
    lastName: '',
    firstName: '',
    email: '',
    password: ''   
}) 
*/