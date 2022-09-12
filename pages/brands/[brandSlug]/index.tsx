import { gql } from "@apollo/client";
import { PageContainer } from "@components/layouts";
import { DisplayVideos } from "@components/modules";
import { BRAND_PAGE } from "@core/graphql";
import { client } from "@core/services";
import { BrandPageQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Brand = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const brand = {
    name: data.brand.name,
    backgroundVideo: data.brand.backgroundVideo.url,
    backgroundImage: data.brand.backgroundImage.url,
  };
  const videos = data.videos.map(
    ({ id, videoInfo: { slug, thumbnails }, videoType }) => ({
      id,
      slug,
      type: videoType,
      thumbnailX: thumbnails.horizontal.url,
      thumbnailY: thumbnails.vertical.url,
    })
  );

  return (
    <PageContainer headTitle={`Disney+ clone | ${data.brand.name}`}>
      <DisplayVideos
        variant="brand"
        title="Disney"
        brandData={brand}
        videos={videos}
      />
    </PageContainer>
  );
};

export default Brand;

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { data } = await client.query<BrandPageQuery>({
    query: BRAND_PAGE,
    variables: {
      slug: ctx.params?.brandSlug,
    },
  });

  return {
    props: {
      data: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<{ brands: { slug: string }[] }>({
    query: gql`
      query {
        brands {
          slug
        }
      }
    `,
  });

  const parsedSlugs = data.brands.map((brand) => ({
    params: { brandSlug: brand.slug },
  }));

  return {
    paths: parsedSlugs,
    fallback: false,
  };
};
