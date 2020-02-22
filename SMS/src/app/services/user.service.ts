import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User
  constructor(
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  setUser(user: User) {
		this.user = user
	}

	reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
	}

	getUsername(): string {
		return this.user.email
	}

	updateFirstName(newname: string) {
		this.firestore.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({firstname: newname});
	}

	updateLastName(newname: string) {
		this.firestore.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({lastname: newname});
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateNewPassword(newpassword: string) {
		this.firestore.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({password: newpassword});
	}
	getAuth() {
		return this.afAuth.auth
	}
}




// interface user {
// 	username: string,
// 	uid: string,
// 	lastname: string,
// 	firstname: string,
	
// }

// @Injectable()
// export class UserService {
// 	public user: user

// 	constructor(
// 		public afAuth: AngularFireAuth,
// 		public firestore: AngularFirestore
// 	) { }

// 	setUser(user: user) {
// 		this.user = user
// 	}

// 	getUID() {
// 		if (!this.user) {
// 			if (this.afAuth.auth.currentUser){
// 				const user = this.afAuth.auth.currentUser
// 				this.setUser({
// 					username: user.email.split('@')[0],
// 					uid: user.uid,
// 					lastname: "",
// 					firstname: "",
// 				})
// 				return user.uid
// 			} else {
// 				throw new Error("User not logged in")
// 			}
// 		} else {
// 			return this.user.uid
// 		}
// 	}

// 	reAuth(username: string, password: string) {
// 		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
// 	}

// 	getUsername(): string {
// 		return this.user.username
// 	}

// 	updateFirstName(uid, newname) {
// 		this.firestore.doc('users/' + uid).update({firstname: newname});
// 	}

// 	updateLastName(uid, newname) {
// 		this.firestore.doc('users/' + uid).update({lastname: newname});
// 	}

// 	updateEmail(newemail: string) {
// 		return this.afAuth.auth.currentUser.updateEmail(newemail)
// 	}

// 	updatePassword(newpassword: string) {
// 		return this.afAuth.auth.currentUser.updatePassword(newpassword)
// 	}

// 	updateNewPassword(uid, newpassword) {
// 		this.firestore.doc('users/' + uid).update({password: newpassword});
// 	}
// 	getAuth() {
// 		return this.afAuth.auth
// 	}
// }