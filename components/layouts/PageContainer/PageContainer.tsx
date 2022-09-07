import { Navbar } from "@components/modules";
import { useTheme } from "@core/hooks";
import { PageContainerProps } from "@core/types";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export const PageContainer = (props: PageContainerProps) => {
  const { appTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{props.headTitle ?? "Next page with bash scripts"}</title>
        <meta name="description" content={props.description} />
      </Head>

      <div
        data-theme={appTheme}
        className={`container relative w-screen min-h-screen flex flex-col ${
          props.center && "justify-center items-center"
        }`}
      >
        {(props.navbar ?? true) && <Navbar />}

        {props.children}
      </div>

      <Toaster />
    </>
  );
};
