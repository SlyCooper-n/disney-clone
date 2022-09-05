import { useTheme } from "@core/hooks";
import { PageContainerProps } from "@core/types";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export const PageContainer = ({
  headTitle,
  description,
  center,
  children,
}: PageContainerProps) => {
  const { appTheme } = useTheme();

  return (
    <>
      <Head>
        <title>{headTitle ?? "Next page with bash scripts"}</title>
        <meta name="description" content={description} />
      </Head>

      <div
        data-theme={appTheme}
        className={`container w-screen min-h-screen flex flex-col ${
          center && "justify-center items-center"
        }`}
      >
        {children}
      </div>

      <Toaster />
    </>
  );
};
