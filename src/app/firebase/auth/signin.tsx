import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, AuthError } from "firebase/auth";

const auth = getAuth(firebase_app);

interface SignInResult {
    result: any; // Adjust the type based on the actual result type
    error: AuthError | null;
}

export default async function signIn(email: string, password: string): Promise < SignInResult > {
    let result: any = null;
    let error: AuthError | null = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e as AuthError;
    }

    return { result, error };
}