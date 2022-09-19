import { AuthGuard } from "@components/guards";
import { PageContainer } from "@components/layouts";
import { DisplayVideos } from "@components/modules";
import { VIDEOS_BY_TYPE } from "@core/graphql";
import { client } from "@core/services";
import { VideosByTypeQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Movies = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const videos = data.map(({ id, videoInfo: { genre, slug, thumbnails } }) => ({
    id,
    slug,
    type: "movie" as "movie",
    thumbnailX: thumbnails.horizontal.url,
    thumbnailY: thumbnails.vertical.url,
  }));

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Movies">
        <DisplayVideos title="Movies" videos={videos} />
      </PageContainer>
    </AuthGuard>
  );
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
