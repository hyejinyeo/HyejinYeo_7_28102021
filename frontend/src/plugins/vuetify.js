import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const MY_ICONS = {
    account: 'mdi-account-circle',
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
