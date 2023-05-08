import { useRoutes } from "react-router-dom";
import LayoutMain from "./component/layout";

export default function RouterElement() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LayoutMain />,
      //   children: [
      //     {
      //       index: true,
      //       element: <HomePage />,
      //     },
      //   ],
    },
    // {
    //   path: "",
    //   element: <LoginPage isLogin={true} />,
    // },
    // {
    //   path: "/register",
    //   element: <LoginPage isLogin={false} />,
    // },
  ]);
  return routes;
}
