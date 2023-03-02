import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyA5OzUVN4wktTU8_Rx1NBKIGPG8CKM4Xgs',
	authDomain: 'librosapp-f614f.firebaseapp.com',
	projectId: 'librosapp-f614f',
	storageBucket: 'librosapp-f614f.appspot.com',
	messagingSenderId: '932677323143',
	appId: '1:932677323143:web:bd6ce27dc2eb65e3aeeb22',
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export { firebase }
