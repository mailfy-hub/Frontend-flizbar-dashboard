import { Route, Routes as RoutesRRD } from "react-router-dom";
import { Login } from "../pages/Auth/login";
import { CalculedInterest } from "../pages/Dashboard/calculatedInterest";
import { ComparativeValues } from "../pages/Dashboard/comparativeValues";
import { Contribuitions } from "../pages/Dashboard/contribuitions";
import { InsertContribuition } from "../pages/Dashboard/contribuitions/insertContribuition";
import { Customers } from "../pages/Dashboard/customers";
import { Funds } from "../pages/Dashboard/funds";
import { Home } from "../pages/Dashboard/home";
import { Income } from "../pages/Dashboard/income";
import { Layout } from "../pages/Dashboard/layout";
import { Movements } from "../pages/Dashboard/movements";
import { Quotes } from "../pages/Dashboard/quotes";
import { Readjustments } from "../pages/Dashboard/readjustments";
import { Users } from "../pages/Dashboard/users";
import { Wallets } from "../pages/Dashboard/wallets";
import { Withdraw } from "../pages/Dashboard/withdraw";

export const Routes = () => {
  return (
    <RoutesRRD>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="funds" element={<Funds />} />
        <Route path="movements" element={<Movements />} />
        <Route path="customers" element={<Customers />} />
        <Route path="income" element={<Income />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="readjustments" element={<Readjustments />} />
        <Route path="comparative-values" element={<ComparativeValues />} />
        <Route path="calculated-interest" element={<CalculedInterest />} />
        <Route path="contributions">
          <Route index element={<Contribuitions />} />
          <Route path="insert" element={<InsertContribuition />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
    </RoutesRRD>
  );
};
