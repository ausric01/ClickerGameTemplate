import { type NextPage } from "next";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Clicker from "../../components/game/Clicker";
import Shop from "../../components/game/Shop";

const Home: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.replace("/"),
  });
  const router = useRouter();
  console.log(session);

  if (!!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-purple-600">
        <Clicker session={session} />
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
