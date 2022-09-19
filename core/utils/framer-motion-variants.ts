import { Variants } from "framer-motion";

export const bannersVariants: Variants = {
  initial: {
    position: "absolute",
    top: "50%",
    left: "48",
  },
  hidden: {
    opacity: 0,
    x: 48,
    transitionDelay: "3s",
  },
  visible: {
    opacity: 1,
    x: 0,
    transitionDelay: "3s",
  },
};

export const mobileMenuVariants: Variants = {
  show: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
