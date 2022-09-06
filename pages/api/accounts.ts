// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  CREATE_ACCOUNT,
  PUBLISH_INITIAL_ACCOUNT,
} from "@core/graphql/mutations";
import { client } from "@core/services";
import type { NextApiRequest, NextApiResponse } from "next";

type SuccessMessage = {
  success: string;
};

type ErrorMessage = {
  message: string;
};

type BodyParams = {
  id: string;
  username: string;
  avatar: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessMessage | ErrorMessage>
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Method not allowed" });

  const { id, username, avatar } = req.body as BodyParams;

  if (!id || !username || !avatar) {
    res.status(400).json({ message: "Missing body params" });
  }

  try {
    //
    await client.mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        firestoreId: id,
        profileUsername: username,
        avatarUrl: avatar,
      },
    });

    await client.mutate({
      mutation: PUBLISH_INITIAL_ACCOUNT,
      variables: {
        firestoreId: id,
      },
    });

    res.status(201).json({ success: "Account created" });
    //
  } catch (error) {
    //
    res.status(500).json({ message: "Internal error" });
    //
  }
}
