// app/sign-in/[[...sign-in]]/page.tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
      appearance={{
        baseTheme: dark, // 👈 forces dark mode
        elements: {
          formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white", 
          card: "shadow-lg rounded-2xl", 
        },
      }}
      path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
    </div>
  );
}
