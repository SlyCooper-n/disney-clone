import { AuthGuard } from "@components/guards";
import { PageContainer } from "@components/layouts";
import { DisplayVideos } from "@components/modules";
import { VIDEOS_BY_TYPE } from "@core/graphql";
import { client } from "@core/services";
import { VideosByTypeQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Series = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const videos = data.map(({ id, videoInfo: { genre, slug, thumbnails } }) => ({
    id,
    slug,
    type: "serie" as "serie",
    thumbnailX: thumbnails.horizontal.url,
    thumbnailY: thumbnails.vertical.url,
  }));

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Series">
        <DisplayVideos title="Series" videos={videos} />
      </PageContainer>
    </AuthGuard>
  );
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
