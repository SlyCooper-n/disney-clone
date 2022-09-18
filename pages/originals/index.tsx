import { PageContainer } from "@components/layouts";
import { DisplayVideos } from "@components/modules";
import { ORIGINALS_VIDEOS } from "@core/graphql";
import { client } from "@core/services";
import { OriginalsVideosQuery } from "@core/types";
import { InferGetStaticPropsType } from "next";

const Originals = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const videos = data.map(
    ({ id, videoType, videoInfo: { slug, thumbnails } }) => ({
      id,
      slug,
      type: videoType,
      thumbnailX: thumbnails.horizontal.url,
      thumbnailY: thumbnails.vertical.url,
    })
  );

  return (
    <PageContainer headTitle="Disney+ clone | Originals">
      <DisplayVideos title="Originals" videos={videos} />
    </PageContainer>
  );
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
