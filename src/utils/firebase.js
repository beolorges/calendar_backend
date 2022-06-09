const firebase = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyBH7pJ75r70cZ95YtF3iPGoxVA50YM3IAM",
    authDomain: "calendar-9e7c7.firebaseapp.com",
    projectId: "calendar-9e7c7",
    storageBucket: "calendar-9e7c7.appspot.com",
    messagingSenderId: "591638788622",
    appId: "1:591638788622:web:53c0e64f4a55d02da05a5f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
    async createNewUser(email, senha) {
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha);

        return result.user.uid;
    },

    async login(email, senha) {
        const result = await firebase
            .auth()
            .signInWithEmailAndPassword(email, senha);

        return result.user.uid;
    },
    async deleteUser(uid) {
        console.log(uid, admin)
        const result = await admin.auth().deleteUser(uid);
        return result;
    },
};