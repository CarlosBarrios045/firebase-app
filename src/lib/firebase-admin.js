import admin from "firebase-admin"

import { config } from "./config"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: config.projectId,
    }),
    databaseURL: config.databaseURL,
  })
}

const db = admin.firestore()
const auth = admin.auth()

export { db, auth }
