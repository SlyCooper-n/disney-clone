import { useQuery } from "@apollo/client";
import { PageContainer } from "@components/layouts";
import { Avatar, VisuallyHidden } from "@components/radixUI";
import { Loading, Logo } from "@components/widgets";
import { PROFILES } from "@core/graphql";
import { useAuth, useProfile } from "@core/hooks";
import { ProfileQuery, ProfilesQuery } from "@core/types";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { PlusCircle } from "phosphor-react";

const Profiles = () => {
  const { account, loading, signIn, signUserOut } = useAuth();
  const { selectedProfile, selectProfile } = useProfile();
  const {
    data,
    loading: queryLoading,
    error,
  } = useQuery<ProfilesQuery>(PROFILES, {
    variables: {
      firestoreId: parseCookies()["disney_clone_account_id"],
    },
  });
  const router = useRouter();

  function chooseProfile(profile: ProfileQuery["profile"]) {
    selectProfile(profile);

    router.push("/home");
  }

  if (loading || queryLoading) return <Loading page />;
  if (error) return <div>Error</div>;

  return (
    <PageContainer headTitle="Disney+ clone | Select profile">
      <main className="pt-12 text-center">
        <VisuallyHidden asChild>
          <h1>Disney+ clone</h1>
        </VisuallyHidden>

        <Logo className="w-[200px] mx-auto" />

        <h2 className="mt-12 mb-8 text-3xl">Who&apos;s watching?</h2>

        <section className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-8">
          {data?.profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-center gap-4">
              <button
                onClick={() => chooseProfile(profile)}
                className="flex flex-col items-center"
              >
                <Avatar
                  src={profile.avatarUrl}
                  placeholder={profile.username[0]}
                  className="w-16 sm:w-24 lg:w-32 hover:scale-105 outline-none hover:outline-4 hover:outline-white transition-all duration-300"
                />
              </button>

              <span className="sm:text-xl font-semibold">
                {profile.username}
              </span>
            </div>
          ))}
        </section>

        {data?.profiles.length! < 4 && (
          <div className="flex flex-col items-center gap-4">
            <button className="flex flex-col items-center">
              <PlusCircle
                size={"auto"}
                weight="fill"
                className="w-16 sm:w-24 lg:w-32 rounded-full hover:scale-105 hover:brightness-50 transition-all duration-300"
              />
            </button>

            <span className="sm:text-xl font-semibold">Add profile</span>
          </div>
        )}
      </main>
    </PageContainer>
  );
};

export default Profiles;
