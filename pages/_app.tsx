import { ApolloProvider } from "@apollo/client";
import { ProfileProvider } from "@core/contexts";
import { FirebaseAuthProvider } from "@core/contexts/AuthContext";
import { client } from "@core/services";
import type { AppProps } from "next/app";
import "../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <FirebaseAuthProvider>
        <ProfileProvider>
          <Component {...pageProps} />
        </ProfileProvider>
      </FirebaseAuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
