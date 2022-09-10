import { PageContainer } from "@components/layouts";
import { VisuallyHidden } from "@components/radixUI/";
import { Button, Loading, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { api, myGetDoc, mySetDoc } from "@core/services";
import { GoogleAuthProvider } from "firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GoogleLogo } from "phosphor-react";
import { useEffect } from "react";

const Index: NextPage = () => {
  const { account, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // verify if user is new
    // if so, create a document on Firestore
    // and an account on Hygraph
    async function verifyNewUser() {
      if (!account) return;

      const docSnap = await myGetDoc(`account/${account.id}`);

      if (!docSnap.exists()) {
        await mySetDoc(`account/${account.id}`, {
          profiles: [account.name],
        });

        await api.post("/accounts", {
          id: account.id,
          username: account.name,
          avatar: account.avatar,
        });
      }
    }
    verifyNewUser();
  }, [account]);

  async function signInWithGoogle() {
    await signIn(new GoogleAuthProvider());

    router.push("/profiles");
  }

  if (loading) return <Loading page />;

  return (
    <PageContainer headTitle="Disney+ clone | Login" navbar={false}>
      <main className="pt-12 text-center">
        <VisuallyHidden asChild>
          <h1>Disney+ clone</h1>
        </VisuallyHidden>

        <Logo className="w-[200px] mx-auto" />

        <h2 className="mt-12 mb-8 text-3xl">Login</h2>

        <Button
          onClick={signInWithGoogle}
          className="mx-auto flex items-center gap-4 bg-white hover:brightness-75 hover:bg-white text-black ring-white"
        >
          <GoogleLogo size={24} weight="bold" />
          Enter with Google
        </Button>
      </main>
    </PageContainer>
  );
};

export default Index;
