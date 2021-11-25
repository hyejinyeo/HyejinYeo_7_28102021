import Api from '@/services/Api';

export default {
    signup(data) {
        return Api().post('signup', data);
    },
    login(data) {
        return Api().post('login', data);
    }
}

