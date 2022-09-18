import { Avatar, Dropdown } from "@components/radixUI";
import { Logo } from "@components/widgets";
import { useProfile } from "@core/hooks";
import { menuOptions } from "@core/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

export const Navbar = () => {
  const { selectedProfile } = useProfile();
  const navbarRef = useRef<HTMLDivElement>(null);

  const { pathname } = useRouter();

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

        {/* mobile menu */}
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

          <Avatar
            src={selectedProfile?.avatarUrl!}
            placeholder={selectedProfile?.username[0]!}
            className="w-8"
          />
        </ul>

        {/* desktop menu */}
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

        <Dropdown ref={navbarRef.current!} />
      </nav>

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
