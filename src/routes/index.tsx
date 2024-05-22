import { Route, Routes as RoutesRRD } from "react-router-dom";
import { RecoveryAccount } from "../pages/Auth/RecoveryAccount";
import { Login } from "../pages/Auth/login";
import { SignUp } from "../pages/Auth/signUp";
import { CalculedInterest } from "../pages/Dashboard/calculatedInterest";
import { CalculedInterestInsert } from "../pages/Dashboard/calculatedInterest/insert";
import { ComparativeValues } from "../pages/Dashboard/comparativeValues";
import { ComparativeValuesInsert } from "../pages/Dashboard/comparativeValues/insert";
import { Contribuitions } from "../pages/Dashboard/contribuitions";
import { ContribuitionInsert } from "../pages/Dashboard/contribuitions/insertContribuition";
import { Customers } from "../pages/Dashboard/customers";
import { CustomerInsert } from "../pages/Dashboard/customers/insert";
import { Funds } from "../pages/Dashboard/funds";
import { FundsInsert } from "../pages/Dashboard/funds/insert";
import { Home } from "../pages/Dashboard/home";
import { Income } from "../pages/Dashboard/income";
import { IncomeInsert } from "../pages/Dashboard/income/insert";
import { Layout } from "../pages/Dashboard/layout";
import { Movements } from "../pages/Dashboard/movements";
import { Quotes } from "../pages/Dashboard/quotes";
import { QuotesInsert } from "../pages/Dashboard/quotes/insert";
import { Readjustments } from "../pages/Dashboard/readjustments";
import { ReadjustmentsInsert } from "../pages/Dashboard/readjustments/insert";
import { Users } from "../pages/Dashboard/users";
import { UserInsert } from "../pages/Dashboard/users/insert";
import { Wallets } from "../pages/Dashboard/wallets";
import { WalletInsert } from "../pages/Dashboard/wallets/insert";
import { Withdraw } from "../pages/Dashboard/withdraw";
import { WithdrawInsert } from "../pages/Dashboard/withdraw/insert";

export const Routes = () => {
  return (
    <RoutesRRD>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users">
          <Route index element={<Users />} />
          <Route path="insert" element={<UserInsert />} />
        </Route>
        <Route path="wallets">
          <Route index element={<Wallets />} />
          <Route path="insert" element={<WalletInsert />} />
        </Route>
        <Route path="quotes">
          <Route index element={<Quotes />} />
          <Route path="insert" element={<QuotesInsert />} />
        </Route>
        <Route path="funds">
          <Route index element={<Funds />} />
          <Route path="insert" element={<FundsInsert />} />
        </Route>
        <Route path="movements" element={<Movements />} />
        <Route path="customers">
          <Route index element={<Customers />} />
          <Route path="insert" element={<CustomerInsert />} />
        </Route>
        <Route path="income">
          <Route index element={<Income />} />
          <Route path="insert" element={<IncomeInsert />} />
        </Route>
        <Route path="withdraw">
          <Route index element={<Withdraw />} />
          <Route path="insert" element={<WithdrawInsert />} />
        </Route>
        <Route path="readjustments">
          <Route index element={<Readjustments />} />
          <Route path="insert" element={<ReadjustmentsInsert />} />
        </Route>
        <Route path="comparative-values">
          <Route index element={<ComparativeValues />} />
          <Route path="insert" element={<ComparativeValuesInsert />} />
        </Route>
        <Route path="calculated-interest">
          <Route index element={<CalculedInterest />} />
          <Route path="insert" element={<CalculedInterestInsert />} />
        </Route>
        <Route path="contributions">
          <Route index element={<Contribuitions />} />
          <Route path="insert" element={<ContribuitionInsert />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="recovery" element={<RecoveryAccount />} />
    </RoutesRRD>
  );
};
