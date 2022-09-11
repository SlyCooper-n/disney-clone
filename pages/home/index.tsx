import { AuthGuard } from "@components/guards/AuthGuard/AuthGuard";
import { PageContainer } from "@components/layouts";
import { Brands, Showcase } from "@components/modules";
import { BannerSwiper, Logo } from "@components/widgets";
import { HOMEPAGE } from "@core/graphql";
import { client } from "@core/services";
import { Brand, HomepageQuery, Slide, Video, VideoList } from "@core/types";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const slides = data.page.homepage.slider.videos.map(
    ({ id, videoInfo, videoType }) =>
      ({
        id,
        imageUrl: videoInfo.banner.url,
        title: videoInfo.title,
        slug: videoInfo.slug,
        logo: videoInfo.videoLogo.url,
        type: videoType === "movie" ? "movies" : "series",
      } as Slide)
  );
  const brands = data.page.homepage.brands.map(
    ({ id, brandLogo, backgroundGif, slug }) =>
      ({
        id,
        logo: brandLogo.url,
        backgroundGif: backgroundGif.url,
        slug,
      } as Brand)
  );
  const showcases = data.page.homepage.showcase.map(
    ({ id, title, videos }) =>
      ({
        id,
        title,
        videos: videos.map(
          ({ id, videoInfo, videoType }) =>
            ({
              id,
              type: videoType,
              slug: videoInfo.slug,
              thumbnailX: videoInfo.thumbnails.horizontal.url,
              thumbnailY: videoInfo.thumbnails.vertical.url,
            } as Video)
        ),
      } as VideoList)
  );

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Home">
        <Link href="/home">
          <a className="w-[100px] mx-auto my-4">
            <Logo className="lg:hidden" />
          </a>
        </Link>

        <BannerSwiper slides={slides} />

        <Brands brands={brands} />

        <Showcase videosList={showcases} />
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
