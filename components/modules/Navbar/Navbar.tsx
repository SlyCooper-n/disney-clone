import { useQuery } from "@apollo/client";
import { Avatar, Dialog, Dropdown } from "@components/radixUI";
import { Divider } from "@components/radixUI/";
import { Logo } from "@components/widgets";
import { PROFILES } from "@core/graphql";
import { useAuth, useDialog, useProfile } from "@core/hooks";
import { ProfilesQuery } from "@core/types";
import { menuOptions, mobileMenuVariants } from "@core/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { PlusCircle } from "phosphor-react";
import { useRef, useState } from "react";

export const Navbar = () => {
  const { signUserOut } = useAuth();
  const { selectedProfile, selectProfile } = useProfile();
  const { pathname } = useRouter();
  const { dialogOpen, toggleDialog, addProfile } = useDialog();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data, refetch } = useQuery<ProfilesQuery>(PROFILES, {
    variables: {
      firestoreId: parseCookies()["disney_clone_account_id"],
    },
  });

  function handleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  async function refetchProfiles() {
    await refetch();
  }

  const filteredProfiles =
    data?.profiles.filter((profile) => profile.id !== selectedProfile?.id) ??
    [];

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed bottom-0 lg:bottom-auto lg:top-0 right-0 left-0 py-2 lg:py-4 px-8 flex lg:justify-between items-center bg-base-200 lg:bg-gradient-to-b lg:from-black lg:to-[#00000031] lg:shadow-2xl z-20 ${
          (pathname.includes("/brands") ||
            pathname.includes("/series/") ||
            pathname.includes("/movies/")) &&
          "lg:bg-transparent"
        }`}
      >
        <Link href="/home">
          <a className="mr-12 hidden lg:block">
            <Logo className="w-20" />
          </a>
        </Link>

        {/* mobile navbar */}
        <ul className="flex-1 flex lg:hidden justify-between items-center gap-8">
          {menuOptions
            .filter((opt) => opt.isMobile)
            .map((opt) => (
              <li key={opt.name}>
                <Link href={opt.url}>
                  <a className="text-white">{opt.icon}</a>
                </Link>
              </li>
            ))}

          <button onClick={handleMobileMenu}>
            <Avatar
              src={selectedProfile?.avatarUrl!}
              placeholder={selectedProfile?.username[0]!}
              className="w-8"
            />
          </button>
        </ul>

        {/* desktop navbar */}
        <ul className="mr-auto hidden lg:flex gap-8">
          {menuOptions.map((opt) => (
            <li key={opt.name}>
              <Link href={opt.url}>
                <a className="flex items-center gap-2 text-white">
                  {opt.icon}

                  <span className="relative text-lg font-semibold">
                    {opt.name}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {/* desktop only */}
        <Dropdown ref={navbarRef.current!} />
      </nav>

      {/* mobile menu */}
      <motion.div
        variants={mobileMenuVariants}
        animate={isMobileMenuOpen ? "show" : "hidden"}
        className="fixed top-0 left-0 w-screen h-[calc(100vh-48px)] p-2 bg-base-100 z-10"
      >
        <ul className="mb-4 flex gap-8 overflow-x-scroll">
          {
            filteredProfiles.map((profile) => (
              <li key={profile.id} className="flex-shrink-0">
                <button
                  onClick={() => selectProfile(profile)}
                  className="flex flex-col items-center gap-2"
                >
                  <Avatar
                    src={profile.avatarUrl}
                    placeholder={profile.username[0]}
                    className="w-16"
                  />

                  <span className="text-xs font-semibold">
                    {profile.username}
                  </span>
                </button>
              </li>
            ))!
          }

          {filteredProfiles.length < 3 && (
            <li className="flex-shrink-0">
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
                refetchData={refetchProfiles}
              >
                <button className="flex items-center gap-4 hover:cursor-pointer hover:brightness-125 transition-all">
                  <PlusCircle size={48} weight="fill" />
                  <span className="font-semibold">Add profile</span>
                </button>
              </Dialog>
            </li>
          )}
        </ul>

        <Link href="/profiles">
          <a className="btn w-fit mx-auto flex">Edit profiles</a>
        </Link>

        <Divider className="w-full h-0.5 mx-auto my-4 bg-base-content bg-opacity-50" />

        <button onClick={signUserOut}>Log Out</button>
      </motion.div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        a.flex > span::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 3px;
          background-color: white;
          opacity: 0;
          transition: all 0.3s ease;
        }

        a.flex:hover > span::after {
          width: 100%;
          opacity: 1;
        }
      `}</style>
    </>
  );
};
