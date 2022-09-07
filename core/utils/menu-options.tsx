import {
  FilmSlate,
  HouseSimple,
  MagnifyingGlass,
  Plus,
  Star,
  Television,
} from "phosphor-react";

export const menuOptions = [
  {
    url: "/home",
    icon: <HouseSimple size="auto" weight="fill" className="w-6 lg:w-[18px]" />,
    name: "Home",
    isMobile: true,
  },
  {
    url: "/home",
    icon: (
      <MagnifyingGlass size="auto" weight="bold" className="w-6 lg:w-[18px]" />
    ),
    name: "Search",
    isMobile: true,
  },
  {
    url: "/watchlist",
    icon: <Plus size="auto" weight="bold" className="w-6 lg:w-[18px]" />,
    name: "Watchlist",
    isMobile: true,
  },
  {
    url: "/originals",
    icon: <Star size="auto" weight="fill" className="w-6 lg:w-[18px]" />,
    name: "Originals",
    isMobile: false,
  },
  {
    url: "/movies",
    icon: <FilmSlate size="auto" weight="bold" className="w-6 lg:w-[18px]" />,
    name: "Movies",
    isMobile: false,
  },
  {
    url: "/series",
    icon: <Television size="auto" weight="fill" className="w-6 lg:w-[18px]" />,
    name: "Series",
    isMobile: false,
  },
];
