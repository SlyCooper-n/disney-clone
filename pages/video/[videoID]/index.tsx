import { gql } from "@apollo/client";
import { VIDEO_BY_ID } from "@core/graphql";
import { client } from "@core/services";
import { VideoByIDQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Video = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
};

export default Video;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { data } = await client.query<VideoByIDQuery>({
    query: VIDEO_BY_ID,
    variables: {
      id: ctx.params?.videoID,
    },
  });

  return {
    props: {
      data: data.video,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ videos: { id: string }[] }>({
    query: gql`
      query {
        videos {
          id
        }
      }
    `,
  });

  const parsedIDs = data.videos.map((video) => ({
    params: { videoID: video.id },
  }));

  return {
    paths: parsedIDs,
    fallback: "blocking",
  };
};
