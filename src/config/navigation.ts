import type { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export function setNavigator(nav: NavigateFunction) {
  navigate = nav;
}

export function navigateTo(path: string) {
  navigate(path, {
    replace: true,
  });
}
