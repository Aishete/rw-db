"use client";
import { Input } from "@/components/ui/input";
import React, { useState, FormEvent, useEffect } from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";

interface PageSignInProps {}

const PageSignIn: React.FC<PageSignInProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user != null) router.push("/home/candidate");
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
    router.push("/home/candidate");
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
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PageSignIn;
