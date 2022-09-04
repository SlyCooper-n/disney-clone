import { VIDEOS_BY_TYPE } from "@core/graphql";
import { client } from "@core/services";
import { VideosByTypeQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Movies = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
};

export default Movies;

export const getStaticProps = async () => {
  const { data } = await client.query<VideosByTypeQuery>({
    query: VIDEOS_BY_TYPE,
    variables: {
      videoType: "movie",
    },
  });

  return {
    props: {
      data: data.videos,
    },
  };
};
