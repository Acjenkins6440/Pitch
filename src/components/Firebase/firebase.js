import app from 'firebase/app'
import firebaseConfig from './config';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
    }
}

export default Firebase;