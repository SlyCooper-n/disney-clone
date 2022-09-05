import { gql } from "@apollo/client";
import { VIDEO_BY_SLUG } from "@core/graphql";
import { client } from "@core/services";
import { VideoBySlugQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Serie = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
};

export default Serie;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { data } = await client.query<VideoBySlugQuery>({
    query: VIDEO_BY_SLUG,
    variables: {
      videoType: "serie",
      slug: ctx.params?.serieSlug,
    },
  });

  return {
    props: {
      data: data.videos[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{
    videos: { videoInfo: { slug: string } }[];
  }>({
    query: gql`
      query Videos($videoType: VideoType!) {
        videos(where: { videoType: $videoType }) {
          videoInfo {
            slug
          }
        }
      }
    `,
    variables: {
      videoType: "serie",
    },
  });

  const parsedSlugs = data.videos.map((video) => ({
    params: { serieSlug: video.videoInfo.slug },
  }));

  return {
    paths: parsedSlugs,
    fallback: "blocking",
  };
};
