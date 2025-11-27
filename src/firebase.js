// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "empowerme-demo.firebaseapp.com",
  projectId: "empowerme-demo",
  storageBucket: "empowerme-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Mock Firebase for demo
export const auth = {
  currentUser: null,
  signInWithEmailAndPassword: (email, password) => Promise.resolve({ user: { uid: '1', email } }),
  createUserWithEmailAndPassword: (email, password) => Promise.resolve({ user: { uid: '1', email } }),
  signOut: () => Promise.resolve()
};

export const db = {
  collection: (name) => ({
    doc: (id) => ({
      set: (data) => Promise.resolve(),
      get: () => Promise.resolve({ exists: true, data: () => ({}) }),
      update: (data) => Promise.resolve()
    }),
    add: (data) => Promise.resolve({ id: Date.now().toString() }),
    where: (field, op, value) => ({
      get: () => Promise.resolve({ docs: [] })
    })
  })
};