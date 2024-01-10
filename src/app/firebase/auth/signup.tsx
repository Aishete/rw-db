import { createUserWithEmailAndPassword, getAuth, AuthError } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

interface SignUpResult {
    result: any; // Adjust the type based on the actual result type
    error: AuthError | null;
}

export default async function signUp(email: string, password: string): Promise < SignUpResult > {
    let result: any = null;
    let error: AuthError | null = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e as AuthError;
    }

    return { result, error };
}