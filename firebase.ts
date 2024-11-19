import { initializeApp } from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// No necesitamos el firebaseConfig explícito
// React Native Firebase leerá automáticamente la configuración
// del archivo google-services.json
const app = initializeApp({
    appId: '',
    projectId: ''
});

export default app;