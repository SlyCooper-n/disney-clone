// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ADD_PROFILE, PUBLISH_ACCOUNT_AND_PROFILE } from "@core/graphql";
import { client } from "@core/services";
import { AddProfileMutation, Profile } from "@core/types";
import type { NextApiRequest, NextApiResponse } from "next";

export type SuccessResponse = {
  profile: Profile;
};

type ErrorMessage = {
  message: string;
  error?: any;
};

export type ProfilesBodyParams = {
  accountId: string;
  username: string;
  avatarUrl: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorMessage>
) {
  switch (req.method) {
    case "POST":
      const { accountId, username, avatarUrl } = req.body as ProfilesBodyParams;

      if (!accountId || !username) {
        return res.status(400).json({ message: "Missing body params" });
      }

      try {
        //
        const { data } = await client.mutate<AddProfileMutation>({
          mutation: ADD_PROFILE,
          variables: {
            firestoreId: accountId,
            username: username,
            avatarUrl: avatarUrl ?? null,
          },
        });

        await client.mutate({
          mutation: PUBLISH_ACCOUNT_AND_PROFILE,
          variables: {
            firestoreId: accountId,
          },
        });

        if (!data) {
          throw new Error("Error adding profile with GQL mutation");
        }

        const profileData = data.updateAccount.profiles[0];

        res.status(201).send({
          profile: {
            id: profileData.id,
            username: profileData.username,
            avatarUrl: profileData.avatarUrl,
          },
        });
        break;
        //
      } catch (error) {
        //
        res.status(500).json({ message: "Internal error", error });
        break;
        //
      }

    default:
      res.status(400).json({ message: "Method not allowed" });
      break;
  }
}
