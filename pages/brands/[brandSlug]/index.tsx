import { gql } from "@apollo/client";
import { BRAND_PAGE } from "@core/graphql";
import { client } from "@core/services";
import { BrandPageQuery } from "@core/types";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

const Brand = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);

  return <div />;
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
      data: data.brand,
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
