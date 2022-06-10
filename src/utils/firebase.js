const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
require('firebase/auth');


// Initialize Firebase
firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
});



module.exports = {
    async createNewUser(email, senha) {
        const result = await createUserWithEmailAndPassword(getAuth(), email, senha);
        return result.user.uid;
    },

    async login(email, senha) {
        const result = await signInWithEmailAndPassword(getAuth(), email, senha);
        return result.user.uid;
    },

    async deleteUser() {
        const result = await getAuth().currentUser.delete();
        return result;
    }

};