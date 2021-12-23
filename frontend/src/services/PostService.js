import Api from '@/services/Api';

export default {
    createPost(data) {
        return Api().post('feed/', data);
    },
    getAllPosts() {
        return Api().get('feed');
    },
    getPostById(id) {
        return Api().get('feed/' + id);
    },
    updatePost(data) {
        return Api().put('feed', data);
    },
    deletePost(id) {
        return Api().delete('feed/' + id);
    }
}