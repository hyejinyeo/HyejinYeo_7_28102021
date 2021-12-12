import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const MY_ICONS = {
    accueil: 'mdi-home-outline',
    feed: 'mdi-bell-ring-outline',
    chat: 'mdi-chat-outline',
    account: 'mdi-account-circle-outline',
    profil: 'mdi-account-outline',
    admin: 'mdi-check-decagram',
    eyeon: 'mdi-eye',
    eyeoff: 'mdi-eye-off',
    logout: 'mdi-power',
    addphoto: 'mdi-camera-plus',
    plus: 'mdi-plus',
    delete: 'mdi-trash-can-outline',
    update: 'mdi-update',
    file: 'mdi-paperclip',
    image: 'mdi-image',
    gif: 'mdi-file-gif-box',
    close: 'mdi-close-circle',
    //ADD MORE ICONS HERE
    lock: 'mdi-lock-outline',
    friends: 'mdi-account-supervisor-circle',
    comment: 'mdi-comment-text-outline',
    like: 'mdi-emoticon-outline',
    home: 'mdi-home',
    mail: 'mdi-email-outline',
}

export default new Vuetify({
    icons: {
        iconfont: 'mdi', 
        values: MY_ICONS
    }
})
