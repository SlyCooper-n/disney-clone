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
    icon: <HouseSimple size={26} weight="fill" />,
    name: "Home",
    isMobile: true,
  },
  {
    url: "/home",
    icon: <MagnifyingGlass size={26} weight="bold" />,
    name: "Search",
    isMobile: true,
  },
  {
    url: "/watchlist",
    icon: <Plus size={26} weight="bold" />,
    name: "Watchlist",
    isMobile: true,
  },
  {
    url: "/originals",
    icon: <Star size={26} weight="fill" />,
    name: "Originals",
    isMobile: false,
  },
  {
    url: "/movies",
    icon: <FilmSlate size={26} weight="bold" />,
    name: "Movies",
    isMobile: false,
  },
  {
    url: "/series",
    icon: <Television size={26} weight="fill" />,
    name: "Series",
    isMobile: false,
  },
];
