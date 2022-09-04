import { ORIGINALS_VIDEOS } from "@core/graphql";
import { client } from "@core/services";
import { OriginalsVideosQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Originals = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
};

export default Originals;

export const getStaticProps = async () => {
  const { data } = await client.query<OriginalsVideosQuery>({
    query: ORIGINALS_VIDEOS,
    variables: {
      isOriginal: true,
    },
  });

  return {
    props: {
      data: data.videos,
    },
  };
};
