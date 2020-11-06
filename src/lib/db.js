import firebase from "./firebase"

const db = firebase.firestore()

export async function createUser(uid, data) {
  return await db
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}
