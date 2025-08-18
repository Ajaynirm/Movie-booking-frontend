"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";  

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <SignUp
        appearance={{
          baseTheme: dark,   
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white",
            card: "shadow-lg rounded-2xl",
          },
        }}
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
      />
    </div>
  );
}
