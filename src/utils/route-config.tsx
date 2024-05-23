import { ReactNode } from "react";
import { roleAccessType } from "../hook/auth";
import { CalculedInterest } from "../pages/Dashboard/calculatedInterest";
import { CalculedInterestEdit } from "../pages/Dashboard/calculatedInterest/edit";
import { CalculedInterestInsert } from "../pages/Dashboard/calculatedInterest/insert";
import { ComparativeValues } from "../pages/Dashboard/comparativeValues";
import { ComparativeValuesEdit } from "../pages/Dashboard/comparativeValues/edit";
import { ComparativeValuesInsert } from "../pages/Dashboard/comparativeValues/insert";
import { Contribuitions } from "../pages/Dashboard/contribuitions";
import { ContribuitionInsert } from "../pages/Dashboard/contribuitions/insertContribuition";
import { Customers } from "../pages/Dashboard/customers";
import { CustomerEdit } from "../pages/Dashboard/customers/edit";
import { CustomerInsert } from "../pages/Dashboard/customers/insert";
import { Funds } from "../pages/Dashboard/funds";
import { FundsEdit } from "../pages/Dashboard/funds/edit";
import { FundsInsert } from "../pages/Dashboard/funds/insert";
import { Home } from "../pages/Dashboard/home";
import { Income } from "../pages/Dashboard/income";
import { IncomeInsert } from "../pages/Dashboard/income/insert";
import { Movements } from "../pages/Dashboard/movements";
import { Quotes } from "../pages/Dashboard/quotes";
import { QuotesInsert } from "../pages/Dashboard/quotes/insert";
import { Readjustments } from "../pages/Dashboard/readjustments";
import { ReadjustmentsInsert } from "../pages/Dashboard/readjustments/insert";
import { Users } from "../pages/Dashboard/users";
import { UserEdit } from "../pages/Dashboard/users/edit";
import { UserInsert } from "../pages/Dashboard/users/insert";
import { Wallets } from "../pages/Dashboard/wallets";
import { WalletEdit } from "../pages/Dashboard/wallets/edit";
import { WalletInsert } from "../pages/Dashboard/wallets/insert";
import { Withdraw } from "../pages/Dashboard/withdraw";
import { WithdrawInsert } from "../pages/Dashboard/withdraw/insert";

interface subRoutesMapped {
  path: string;
  name: string;
  element: ReactNode;
}
export interface routeMapped {
  path: string;
  name: string;
  icon: string;
  roleAccess: roleAccessType[];
  element: ReactNode;
  subRoutes: subRoutesMapped[] | [];
}

export const routesMapped: routeMapped[] = [
  {
    path: "/",
    element: <Home />,
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    roleAccess: ["all"],
    subRoutes: [],
  },
  {
    path: "/users",
    element: <Users />,
    name: "Usuários",
    icon: "heroicons:users",
    roleAccess: ["admin"],
    subRoutes: [
      {
        name: "Edite seu usuário",
        path: "edit",
        element: <UserEdit />,
      },
      {
        name: "Crie um usuário",
        path: "insert",
        element: <UserInsert />,
      },
    ],
  },
  {
    path: "/customers",
    name: "Clientes",
    icon: "heroicons:building-storefront",
    roleAccess: ["admin"],
    element: <Customers />,
    subRoutes: [
      {
        name: "Edite seu cliente",
        path: "edit",
        element: <CustomerEdit />,
      },
      {
        name: "Crie um cliente",
        path: "insert",
        element: <CustomerInsert />,
      },
    ],
  },
  {
    path: "/funds",
    name: "Fundos",
    icon: "heroicons:currency-dollar",
    roleAccess: ["all"],
    element: <Funds />,
    subRoutes: [
      {
        name: "Edite seu fundo",
        path: "edit",
        element: <FundsEdit />,
      },
      {
        name: "Crie um fundo",
        path: "insert",
        element: <FundsInsert />,
      },
    ],
  },
  {
    path: "/wallets",
    name: "Carteiras",
    icon: "heroicons:wallet",
    roleAccess: ["admin"],
    element: <Wallets />,
    subRoutes: [
      {
        name: "Edite sua carteira",
        path: "edit",
        element: <WalletEdit />,
      },
      {
        name: "Crie uma carteira",
        path: "insert",
        element: <WalletInsert />,
      },
    ],
  },
  {
    path: "/contributions",
    name: "Aportes",
    icon: "radix-icons:dashboard",
    roleAccess: ["all"],
    element: <Contribuitions />,
    subRoutes: [
      {
        name: "Faça um aporte",
        path: "insert",
        element: <ContribuitionInsert />,
      },
    ],
  },
  {
    path: "/income",
    name: "Rendimentos",
    icon: "heroicons:arrow-trending-up-20-solid",
    roleAccess: ["admin"],
    element: <Income />,
    subRoutes: [
      {
        name: "Adicione um rendimento",
        path: "insert",
        element: <IncomeInsert />,
      },
    ],
  },
  {
    path: "/withdraw",
    name: "Resgates",
    icon: "heroicons:arrow-uturn-down",
    roleAccess: ["all"],
    element: <Withdraw />,
    subRoutes: [
      {
        name: "Crie um valor comparativo",
        path: "insert",
        element: <WithdrawInsert />,
      },
    ],
  },
  {
    path: "/movements",
    name: "Movimentações",
    icon: "heroicons:arrows-right-left",
    roleAccess: ["all"],
    element: <Movements />,
    subRoutes: [],
  },
  {
    path: "/readjustments",
    name: "Readequações",
    icon: "heroicons:briefcase",
    roleAccess: ["admin"],
    element: <Readjustments />,
    subRoutes: [
      {
        name: "Adicione uma readequação",
        path: "insert",
        element: <ReadjustmentsInsert />,
      },
    ],
  },
  {
    path: "/comparative-values",
    name: "Valores comparativos",
    icon: "heroicons:table-cells",
    roleAccess: ["admin"],
    element: <ComparativeValues />,
    subRoutes: [
      {
        name: "Edite seu valor comparativo",
        path: "edit",
        element: <ComparativeValuesEdit />,
      },
      {
        name: "Crie um valor comparativo",
        path: "insert",
        element: <ComparativeValuesInsert />,
      },
    ],
  },
  {
    path: "/quotes",
    name: "Cotações",
    icon: "heroicons:chart-bar",
    roleAccess: ["admin"],
    element: <Quotes />,
    subRoutes: [
      {
        name: "Adicione uma cotação",
        path: "insert",
        element: <QuotesInsert />,
      },
    ],
  },
  {
    path: "/calculated-interest",
    name: "Juros calculados",
    icon: "heroicons:circle-stack",
    roleAccess: ["admin"],
    element: <CalculedInterest />,
    subRoutes: [
      {
        name: "Edite seu cálculo",
        path: "edit",
        element: <CalculedInterestEdit />,
      },
      {
        name: "Crie um cálculo",
        path: "insert",
        element: <CalculedInterestInsert />,
      },
    ],
  },
];
