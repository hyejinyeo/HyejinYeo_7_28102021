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
    lock: 'mdi-lock-outline',
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
    search: 'mdi-magnify',
    link: 'mdi-link-box-variant',
    selectedlink: 'mdi-link-variant',
    close: 'mdi-close-circle',
    more: 'mdi-dots-vertical',
    modifyPost: 'mdi-lead-pencil',
    deletePost: 'mdi-trash-can',
    comment: 'mdi-comment-outline',
    like: 'mdi-thumb-up-outline',
    send: 'mdi-send',
    adminplus: 'mdi-account-plus-outline',
    adminremove: 'mdi-account-remove-outline',
    
    //ADD MORE ICONS HERE
    // friends: 'mdi-account-supervisor-circle',
    // change: 'mdi-swap-horizontal',
    // heart: 'mdi-heart',
    // mail: 'mdi-email-outline',
    // help: 'mdi-help',
    // settings: 'mdi-cog-outline',
    // hashtag: 'mdi-pound'

}

export default new Vuetify({
    icons: {
        iconfont: 'mdi', 
        values: MY_ICONS
    }
})
