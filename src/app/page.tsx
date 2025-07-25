"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  if (data) {
    return (
      <>
        <p>Signed in as {data.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-3.5">
      <button onClick={() => signIn("github")}>Sign in with github</button>
    </div>
  );
}
