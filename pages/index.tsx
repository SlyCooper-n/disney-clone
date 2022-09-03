import { PageContainer } from "@components/layouts";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer center>
      <main className="prose">
        <h1>Next.js app with bash scripts</h1>

        <p>Hello there!</p>
      </main>
    </PageContainer>
  );
};

export default Home;
