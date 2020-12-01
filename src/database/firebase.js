//firebase for this project
const admin = require("firebase-admin");
const serviceAccount = require("../secrets/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT}.firebaseio.com`
});
