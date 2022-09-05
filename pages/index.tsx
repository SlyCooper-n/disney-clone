import { PageContainer } from "@components/layouts";
import { VisuallyHidden } from "@components/radixUI/";
import { Button, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { GoogleAuthProvider } from "firebase/auth";
import type { NextPage } from "next";
import { CircleNotch, GoogleLogo } from "phosphor-react";

const Index: NextPage = () => {
  const { account, loading, signIn, signUserOut } = useAuth();

  function signInWithGoogle() {
    signIn(new GoogleAuthProvider());
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircleNotch size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <PageContainer>
      <main className="pt-12 text-center">
        <VisuallyHidden asChild>
          <h1>Disney+ clone</h1>
        </VisuallyHidden>

        <Logo className="w-[200px] mx-auto" />

        {/* no user */}
        {!account && (
          <>
            <h2 className="mt-12 mb-8 text-3xl">Login</h2>

            <Button
              onClick={signInWithGoogle}
              className="mx-auto flex items-center gap-4 bg-white hover:brightness-75 hover:bg-white text-black ring-white"
            >
              <GoogleLogo size={24} weight="bold" />
              Enter with Google
            </Button>
          </>
        )}

        {/* user logged in */}
        {account && (
          <>
            <h2>Who&apos;s watching?</h2>

            <Button onClick={signUserOut}>Log out</Button>
          </>
        )}
      </main>
    </PageContainer>
  );
};

export default Index;
