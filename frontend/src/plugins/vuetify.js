import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const MY_ICONS = {
    accueil: 'mdi-home-outline',
    feed: 'mdi-bell-outline',
    chat: 'mdi-comment-text-outline',
    account: 'mdi-account-circle-outline',
    //ADD MORE ICONS HERE
    friends: 'mdi-account-supervisor-circle',
    delete: 'mdi-trash-can-outline',
    update: 'mdi-update',
    comment: 'mdi-comment-text-outline',
    like: 'mdi-emoticon-outline',
    home: 'mdi-home',
    mail: 'mdi-email'
}

export default new Vuetify({
    icons: {
        iconfont: 'mdi', 
        values: MY_ICONS
    }
})
