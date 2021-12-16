import Api from '@/services/Api';

export default {
    createPost(data) {
        return Api().post('feed/', data);
    },
    getPosts() {
        return Api().get('feed');
    },
    // updatePost(data) {
    //     return Api().put('feed', data);
    // },
    // deletePost(id) {
    //     return Api().delete('feed' + id);
    // }
}