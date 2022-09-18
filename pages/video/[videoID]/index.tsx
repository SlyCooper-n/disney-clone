import { gql } from "@apollo/client";
import { VIDEO_BY_ID } from "@core/graphql";
import { client } from "@core/services";
import { VideoByIDQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";

const Video = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <Head>
        <title>Disney+ clone | Playing video</title>
      </Head>

      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-20"
      >
        <ArrowLeft size={24} weight="bold" />
      </button>

      <video
        src={data.mp4[0].url}
        autoPlay
        // eslint-disable-next-line react/no-unknown-property
        controls
        // eslint-disable-next-line react/no-unknown-property
        onEnded={() => router.back()}
      />
    </div>
  );
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
  const { data } = await client.query<{
    videos: { id: string }[];
  }>({
    query: gql`
      query {
        videos {
          id
        }
      }
    `,
  });

  const parsedSlugs = data.videos.map((video) => ({
    params: { videoID: video.id },
  }));

  return {
    paths: parsedSlugs,
    fallback: "blocking",
  };
};
