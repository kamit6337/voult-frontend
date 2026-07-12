import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Home,
  Star,
  NotebookText,
  Notebook,
} from "lucide-react";

export const company = {
  name: "Voult",
  logo: <GalleryVerticalEndIcon />,
  plan: "Highly Secure",
};

export const projects = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Favourite",
    url: "/favourite",
    icon: <Star />,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: <Notebook />,
  },
  {
    title: "Secrets",
    url: "/secrets",
    icon: <NotebookText />,
  },
];
