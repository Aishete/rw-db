import { toast } from "sonner";
import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, AuthError } from "firebase/auth";

const auth = getAuth(firebase_app);

interface SignInResult {
  result: any; // Adjust the type based on the actual result type
  error: AuthError | null;
}

export default async function signIn(
  email: string,
  password: string
): Promise<SignInResult> {
  let result: any = null;
  let error: AuthError | null = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    toast("You have successfully logged in");
    console.log(result);
  } catch (e) {
    error = e as AuthError;
    if (error) {
      // Handle specific authentication errors
      if (error.code === "auth/invalid-credential") {
        toast(
          "User not found or Wrong password. Please check your email and password."
        );
      } else if (error.code === "auth/too-many-requests") {
        toast(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later",
          { className: "custom-error-toast" }
        );
      } else if (error.code === "auth/network-request-failed") {
        toast(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later",
          { className: "custom-error-toast" }
        );
      } else {
        // General error handling
        console.error(error);
        toast("Something went wrong. Please try again.");
      }
    }
  }

  return { result, error };
}
