import { HOMEPAGE } from "@core/graphql";
import { client } from "@core/services";
import { HomepageQuery } from "@core/types";
import type { InferGetStaticPropsType } from "next";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div />;
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
