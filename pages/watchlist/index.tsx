import { useQuery } from "@apollo/client";
import { AuthGuard } from "@components/guards";
import { PageContainer } from "@components/layouts";
import { DisplayVideos } from "@components/modules";
import { Loading } from "@components/widgets";
import { VIDEOS_BY_WATCHLIST } from "@core/graphql";
import { useProfile } from "@core/hooks";
import { VideosByWatchlistQuery } from "@core/types";

const Watchlist = () => {
  const { selectedProfile } = useProfile();
  const { data, loading, error } = useQuery<VideosByWatchlistQuery>(
    VIDEOS_BY_WATCHLIST,
    {
      variables: {
        profileID: selectedProfile?.id,
      },
    }
  );

  if (loading) return <Loading page />;
  if (error) return <div>Error</div>;

  const videos = data?.profile.watchlist.map(
    ({ id, videoInfo, videoType }) => ({
      id,
      type: videoType,
      slug: videoInfo.slug,
      thumbnailX: videoInfo.thumbnails.horizontal.url,
      thumbnailY: videoInfo.thumbnails.vertical.url,
    })
  );

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Watchlist">
        <DisplayVideos title="Watchlist" videos={videos!} />
      </PageContainer>
    </AuthGuard>
  );
};

export default Watchlist;
