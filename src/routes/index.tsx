import { Routes as RoutesRRD, Route } from "react-router-dom";
import { Layout } from "../pages/Dashboard/layout";
import { Home } from "../pages/Dashboard/home";
import { Users } from "../pages/Dashboard/users";

export const Routes = () => {
  return (
      <RoutesRRD>
        <Route  path="/" element={<Layout />} >
          <Route index element={<Home/>} />
          <Route path="users" element={<Users/>} />
        </Route>
      </RoutesRRD>
  );
};
