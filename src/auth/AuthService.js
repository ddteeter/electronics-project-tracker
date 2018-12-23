import app from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_AUTH_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

class AuthService {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  createUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut = () => {
    return this.auth.signOut();
  };

  resetPassword = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  updatePassword = password => {
    return this.auth.currentUser.updatePassword(password);
  };
}

export default AuthService;
