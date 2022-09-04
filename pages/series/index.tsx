import { VIDEOS_BY_TYPE } from "@core/graphql";
import { client } from "@core/services";
import { VideosByTypeQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Series = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
};

export default Series;

export const getStaticProps = async () => {
  const { data } = await client.query<VideosByTypeQuery>({
    query: VIDEOS_BY_TYPE,
    variables: {
      videoType: "serie",
    },
  });

  return {
    props: {
      data: data.videos,
    },
  };
};
