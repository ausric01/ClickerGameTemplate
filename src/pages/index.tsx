import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Spinner from "../components/Spinner";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  status === "authenticated" && router.replace("/home");

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-purple-600">
        {status === "unauthenticated" && (
          <div className="flex w-1/4 flex-col items-center justify-center gap-4">
            <h1 className="text-center text-5xl font-medium text-white">
              Login to Play
            </h1>
            <button
              onClick={() => signIn("discord")}
              className="w-48 rounded-full bg-zinc-200/75 py-1 text-xl transition-colors hover:bg-zinc-200"
            >
              Here
            </button>
          </div>
        )}
      </main>
    );
  }

  //Otherwise return a Spinner
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-purple-600">
      <Spinner />
    </div>
  );
};

export default Home;
