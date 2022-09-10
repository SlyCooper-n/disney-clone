import { useQuery } from "@apollo/client";
import { AuthGuard } from "@components/guards";
import { PageContainer } from "@components/layouts";
import { Avatar, Dialog, VisuallyHidden } from "@components/radixUI";
import { Loading, Logo } from "@components/widgets";
import { PROFILES } from "@core/graphql";
import { useAuth, useDialog, useProfile } from "@core/hooks";
import { Profile, ProfilesQuery } from "@core/types";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { PlusCircle } from "phosphor-react";

const Profiles = () => {
  const { loading } = useAuth();
  const { selectProfile } = useProfile();
  const { dialogOpen, toggleDialog, addProfile } = useDialog();
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

  function chooseProfile(profile: Profile) {
    selectProfile(profile);

    router.push("/home");
  }

  if (loading || queryLoading) return <Loading page />;
  if (error) return <div>Error</div>;

  return (
    <AuthGuard>
      <PageContainer headTitle="Disney+ clone | Select profile" navbar={false}>
        <main className="pt-12 text-center">
          <VisuallyHidden asChild>
            <h1>Disney+ clone</h1>
          </VisuallyHidden>

          <Logo className="w-[200px] mx-auto" />

          <h2 className="mt-12 mb-8 text-3xl">Who&apos;s watching?</h2>

          <section className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-8">
            {data?.profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col items-center gap-4"
              >
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
              <Dialog
                open={dialogOpen}
                toggleDialog={toggleDialog}
                title="Add profile"
                description="Create a new profile here. Click add when you're done."
                labelFields={[
                  {
                    label: "Username",
                    inputName: "username",
                    required: true,
                  },
                  { label: "Avatar url", inputName: "avatarUrl" },
                ]}
                submitButtonText="Add"
                onSubmit={addProfile}
              >
                <button className="flex flex-col items-center">
                  <PlusCircle
                    size={"auto"}
                    weight="fill"
                    className="w-16 sm:w-24 lg:w-32 rounded-full hover:scale-105 hover:brightness-50 transition-all duration-300"
                  />
                </button>
              </Dialog>

              <span className="sm:text-xl font-semibold">Add profile</span>
            </div>
          )}
        </main>
      </PageContainer>
    </AuthGuard>
  );
};

export default Profiles;
