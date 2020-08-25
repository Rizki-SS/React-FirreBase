import app from "firebase/app";
import 'firebase/auth';

// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

const config = {
    apiKey: "AIzaSyDfx2XNLXE8YKQDSfPE7zP3_7Vus6Xa0SA",
    authDomain: "wise-scene-252504.firebaseapp.com",
    databaseURL: "https://wise-scene-252504.firebaseio.com",
    projectId: "wise-scene-252504",
    storageBucket: "wise-scene-252504.appspot.com",
    messagingSenderId: "958656594783",
    appId: "1:958656594783:web:437dc51f7fce1c36a4ecea",
    measurementId: "G-K4GVJE3QEL"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    doSingOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password)
}

export default Firebase;