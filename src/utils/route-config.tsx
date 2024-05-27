import { ReactNode } from "react";
import { roleAccessType } from "../hook/auth";
import { VerifyAccess } from "../pages/Auth/verifyAccess";
import { VerifyAccessCode } from "../pages/Auth/verifyAccessCode";
import { CalculedInterest } from "../pages/Dashboard/calculatedInterest";
import { Calculator } from "../pages/Dashboard/calculatedInterest/calculator";
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
import { MyAccount } from "../pages/Dashboard/myAccount";
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
  icon?: string;
  roleAccess: roleAccessType[];
  element: ReactNode;
  subRoutes: subRoutesMapped[] | [];
  addToSidebar: boolean;
  isOutletRoute: boolean;
}

export const routesMapped: routeMapped[] = [
  {
    path: "/",
    element: <Home />,
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    roleAccess: ["all"],
    subRoutes: [],
    addToSidebar: true,
    isOutletRoute: true,
  },

  {
    path: "/my-account",
    element: <MyAccount />,
    name: "Minha conta",
    icon: "radix-icons:dashboard",
    roleAccess: ["all"],
    subRoutes: [],
    addToSidebar: false,
    isOutletRoute: true,
  },
  {
    path: "/users",
    element: <Users />,
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:currency-dollar",
    roleAccess: ["admin"],
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:arrows-right-left",
    roleAccess: ["all"],
    element: <Movements />,
    subRoutes: [],
  },
  {
    path: "/readjustments",
    name: "Readequações",
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
    addToSidebar: true,
    isOutletRoute: true,
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
  {
    path: "/interested-calculator",
    element: <Calculator />,
    name: "Calculadora de juros",
    icon: "heroicons:circle-stack",
    roleAccess: ["user"],
    subRoutes: [],
    addToSidebar: true,
    isOutletRoute: true,
  },
  {
    path: "/verify-access",
    element: <VerifyAccess />,
    name: "Verifição de acesso",
    roleAccess: ["admin"],
    subRoutes: [
      {
        name: "Verifique o código de acesso",
        path: "code",
        element: <VerifyAccessCode />,
      },
    ],
    addToSidebar: false,
    isOutletRoute: false,
  },
];
