import firebase, { firestore } from './config';

export const handleLogout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err);
  }
}

export const writeUserData = async (userId, name, email) => {
  try {
    firestore.collection('users').doc(userId).set({
      username: name,
      email: email
    })
  } catch (err) {
    console.log(err);
  }
}

export const getUserData = async (userId) => {
  try {
    const userRef = await firestore.collection('users').doc(userId).get();
    return userRef.data();
  } catch (err) {
    console.log(err);
  }
}