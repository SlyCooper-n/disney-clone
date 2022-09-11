import { AuthGuard } from "@components/guards/AuthGuard/AuthGuard";
import { PageContainer } from "@components/layouts";
import { BannerSwiper } from "@components/widgets";
import { HOMEPAGE } from "@core/graphql";
import { client } from "@core/services";
import { HomepageQuery } from "@core/types";
import type { InferGetStaticPropsType } from "next";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const slides = data.page.homepage.slider.videos.map(({ id, videoInfo }) => ({
    id,
    imageUrl: videoInfo.banner.url,
    title: videoInfo.title,
    slug: videoInfo.slug,
    logo: videoInfo.videoLogo.url,
  }));

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Home">
        <BannerSwiper slides={slides} />
      </PageContainer>
    </AuthGuard>
  );
};

export default Home;

export const getStaticProps = async () => {
  const { data } = await client.query<HomepageQuery>({
    query: HOMEPAGE,
  });

  return {
    props: {
      data,
    },
  };
};
