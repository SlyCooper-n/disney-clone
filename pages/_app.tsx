import { ApolloProvider } from "@apollo/client";
import { FirebaseAuthProvider } from "@core/contexts/AuthContext";
import { client } from "@core/services";
import type { AppProps } from "next/app";
import "../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <FirebaseAuthProvider>
        <Component {...pageProps} />
      </FirebaseAuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
