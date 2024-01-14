"use client";
import { Input } from "@/components/ui/input";
import React, { useState, FormEvent, useEffect } from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import { LogUsers } from "@/components/ui/popup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/app/context/AuthContext";

import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

interface PageSignInProps {}

const PageSignIn: React.FC<PageSignInProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user != null) router.push("/home");
  }, [user, router]);

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      console.error(error);
      // Handle error feedback if needed
      return;
    }

    // Successful sign-in
    console.log(result);
    router.push("/home");
  };

  return (
    <Card>
      <form onSubmit={handleForm} className="form">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Please enter your email and password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <label htmlFor="email">
            <p>Email</p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
        </CardContent>
        <CardFooter>
          <LogUsers />
        </CardFooter>
      </form>
    </Card>
  );
};

export default PageSignIn;

export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
}
