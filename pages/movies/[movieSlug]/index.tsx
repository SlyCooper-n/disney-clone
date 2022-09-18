import { gql } from "@apollo/client";
import { DisplayVideoDetails } from "@components/modules";
import { VIDEO_BY_SLUG } from "@core/graphql";
import { client } from "@core/services";
import { VideoBySlugQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Movie = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DisplayVideoDetails videoID={data.id} videoInfo={data.videoInfo} />;
};

export default Movie;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { data } = await client.query<VideoBySlugQuery>({
    query: VIDEO_BY_SLUG,
    variables: {
      videoType: "movie",
      slug: ctx.params?.movieSlug,
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
      videoType: "movie",
    },
  });

  const parsedSlugs = data.videos.map((video) => ({
    params: { movieSlug: video.videoInfo.slug },
  }));

  return {
    paths: parsedSlugs,
    fallback: "blocking",
  };
};
