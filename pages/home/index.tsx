import { PageContainer } from "@components/layouts";
import { HOMEPAGE } from "@core/graphql";
import { client } from "@core/services";
import { HomepageQuery } from "@core/types";
import type { InferGetStaticPropsType } from "next";

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageContainer>
      <h1>Hello World</h1>
    </PageContainer>
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
