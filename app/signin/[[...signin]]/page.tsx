import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center py-20 min-h-screen">
      <SignIn />
    </div>
  );
}