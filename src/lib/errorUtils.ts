import { FirebaseError } from 'firebase/app';

export const handleFirebaseError = (error: unknown) => {
    console.error('Firebase error:', error);
    if (error instanceof FirebaseError) {
        if (error.code === 'permission-denied') {
            return 'Trop de tentatives. Veuillez réessayer plus tard.';
        }
        if (error.code === 'unavailable') {
            return 'Service temporairement indisponible. Veuillez réessayer.';
        }
    }
    return 'Une erreur est survenue. Veuillez réessayer.';
};