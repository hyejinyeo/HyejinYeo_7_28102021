import Api from '@/services/Api';

export default {
    signup(data) {
        return Api().post('signup', data);
    },
    login(data) {
        return Api().post('login', data);
    },
    getUserById(id) {
        return Api().get('account/' + id);
    },
    updateAccount(id, data) {
        return Api().put('account/' + id, data);
    },
    deleteAccount(id) {
        return Api().delete('account/' + id);
    },
    getAllUsers() {
        return Api().get('users');
    },
    updateAdmin(id) {
        return Api().get('user/' + id);
    },
    deleteUser(id) {
        return Api().get('user/' + id);
    },
}

