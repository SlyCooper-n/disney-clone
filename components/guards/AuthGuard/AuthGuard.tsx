import { useAuth } from "@core/hooks";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { account, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!account) {
      router.push("/");
    }
  }, [account, loading, router]);

  return <>{children}</>;
};
