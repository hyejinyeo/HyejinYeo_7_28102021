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
    },
    likePost(id) {
        return Api().post('feed/' + id + '/like')
    },
    commentPost(id, data) {
        return Api().post('feed/' + id + '/comment', data)
    },
    deleteComment(id) {
        return Api().delete('feed/comment/' + id)
    }
}