import { api, myGetDoc, myUpdateDoc } from "@core/services";
import { useRouter } from "next/router";
import { SuccessResponse } from "pages/api/profiles";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useDialog = () => {
  const { account } = useAuth();
  const { selectProfile } = useProfile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  function toggleDialog() {
    setDialogOpen((prev) => !prev);
  }

  async function addProfile(inputObject: Record<string, FormDataEntryValue>) {
    try {
      //
      const snapDoc = await myGetDoc(`/account/${account?.id}`);

      const { profiles } = snapDoc.data() as { profiles: string[] };

      if (profiles.length >= 4) {
        throw new Error("Account has reached the profiles limit");
      }

      await myUpdateDoc(`/account/${account?.id}`, {
        profiles: [...profiles, inputObject["username"]],
      });

      const { data } = await api.post<SuccessResponse>("/profiles", {
        accountId: account?.id,
        username: inputObject["username"],
        avatarUrl: inputObject["avatarUrl"],
      });

      data && selectProfile(data.profile);

      toggleDialog();

      router.push("/home");
      //
    } catch (error) {
      console.log(error);
    }
  }

  return { dialogOpen, toggleDialog, addProfile };
};
