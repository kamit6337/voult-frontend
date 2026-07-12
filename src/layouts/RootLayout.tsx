import NavigationSetter from "@/components/NavigationSetter";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <NavigationSetter />
      <Outlet />
    </>
  );
}
