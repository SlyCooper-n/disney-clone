import { useQuery } from "@apollo/client";
import { Loading } from "@components/widgets";
import { PROFILES } from "@core/graphql";
import { useAuth, useProfile } from "@core/hooks";
import { ProfilesQuery } from "@core/types";
import {
  Arrow,
  Content,
  Group,
  Item,
  Portal,
  Root,
  Separator,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import { parseCookies } from "nookies";
import { PlusCircle } from "phosphor-react";
import { Avatar } from "../Avatar";

export const Dropdown = ({ ref }: { ref: HTMLElement }) => {
  const { signUserOut } = useAuth();
  const { selectedProfile } = useProfile();
  const { data, loading, error } = useQuery<ProfilesQuery>(PROFILES, {
    variables: {
      firestoreId: parseCookies()["disney_clone_account_id"],
    },
  });

  if (loading) return <Loading />;
  if (error || !data) return <div>Error</div>;

  const filteredProfiles = data.profiles.filter(
    (profile) => profile.id !== selectedProfile?.id
  );

  return (
    <Root>
      <Trigger>
        <Avatar
          src={selectedProfile?.avatarUrl!}
          placeholder={selectedProfile?.username[0]!}
          className="w-10 hidden lg:block"
        />
      </Trigger>

      <Portal container={ref}>
        <Content
          sideOffset={16}
          className="w-72 p-4 bg-base-300 text-sm rounded-sm border border-white border-opacity-10"
        >
          <Arrow className="fill-base-100" />

          <Group>
            {
              filteredProfiles.map((profile) => (
                <Item key={profile.id} asChild>
                  <button className="flex items-center gap-4">
                    <Avatar
                      src={profile.avatarUrl}
                      placeholder={profile.username[0]}
                      className="w-12"
                    />

                    <span className="font-semibold">{profile.username}</span>
                  </button>
                </Item>
              ))!
            }

            {filteredProfiles.length < 3 && (
              <Item asChild>
                <button className="flex items-center gap-4 hover:cursor-pointer hover:brightness-125 transition-all">
                  <PlusCircle size={48} weight="fill" />

                  <span className="font-semibold">Add profile</span>
                </button>
              </Item>
            )}
          </Group>

          <Separator className="h-0.5 bg-base-100 my-4" />

          <Item
            onClick={signUserOut}
            className="hover:cursor-pointer hover:brightness-125"
          >
            Log out
          </Item>
        </Content>
      </Portal>
    </Root>
  );
};
