import { ReactNode } from "react";
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
import { ContribuitionDetails } from "../pages/Dashboard/contribuitions/details";
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
import { QuotesEdit } from "../pages/Dashboard/quotes/edit";
import { QuotesInsert } from "../pages/Dashboard/quotes/insert";
import { Readjustments } from "../pages/Dashboard/readjustments";
import { ReadjustmentsInsert } from "../pages/Dashboard/readjustments/insert";
import { UserDataProfile } from "../pages/Dashboard/userDataFillForm";
import { Users } from "../pages/Dashboard/users";
import { UserEdit } from "../pages/Dashboard/users/edit";
import { UserInsert } from "../pages/Dashboard/users/insert";
import { Wallets } from "../pages/Dashboard/wallets";
import { WalletEdit } from "../pages/Dashboard/wallets/edit";
import { WalletInsert } from "../pages/Dashboard/wallets/insert";
import { Withdraw } from "../pages/Dashboard/withdraw";
import { WithdrawInsert } from "../pages/Dashboard/withdraw/insert";
import { History } from "../pages/Dashboard/history";

interface subRoutesMapped {
  path: string;
  name: string;
  element: ReactNode;
}

export type RouteRole = boolean | "all";

export interface routeMapped {
  path: string;
  name: string;
  icon?: string;
  element: ReactNode;
  subRoutes: subRoutesMapped[] | [];
  addToSidebar: boolean;
  isOutletRoute: boolean;
  blockSidebarInteractivity: boolean;
  isAdmin?: RouteRole;
}

function createRouteMapped(route: Partial<routeMapped>): routeMapped {
  return {
    path: route.path || "",
    name: route.name || "",
    icon: route.icon,
    isAdmin: route.isAdmin,
    element: route.element!,
    subRoutes: route.subRoutes || [],
    addToSidebar: route.addToSidebar !== undefined ? route.addToSidebar : true,
    isOutletRoute:
      route.isOutletRoute !== undefined ? route.isOutletRoute : false,
    blockSidebarInteractivity:
      route.blockSidebarInteractivity !== undefined
        ? route.blockSidebarInteractivity
        : false,
  };
}

export const routesMapped: routeMapped[] = [
  createRouteMapped({
    path: "/",
    element: <Home />,
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    isAdmin: "all",
    subRoutes: [],
    addToSidebar: true,
    isOutletRoute: true,
  }),
  createRouteMapped({
    path: "/profile",
    element: <UserDataProfile />,
    name: "Perfil do usuário",
    icon: "heroicons:building-storefront",
    isAdmin: false,
    subRoutes: [],
    addToSidebar: false,
    isOutletRoute: true,
    blockSidebarInteractivity: false,
  }),
  createRouteMapped({
    path: "/my-account",
    element: <MyAccount />,
    name: "Minha conta",
    icon: "radix-icons:dashboard",
    isAdmin: "all",
    subRoutes: [],
    addToSidebar: false,
    isOutletRoute: true,
  }),
  createRouteMapped({
    path: "/users",
    element: <Users />,
    addToSidebar: true,
    isOutletRoute: true,
    name: "Usuários",
    icon: "heroicons:users",
    isAdmin: true,
    subRoutes: [
      {
        name: "Edite seu usuário",
        path: "edit/:id",
        element: <UserEdit />,
      },
      {
        name: "Crie um usuário",
        path: "insert",
        element: <UserInsert />,
      },
    ],
  }),
  createRouteMapped({
    path: "/customers",
    name: "Clientes",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:building-storefront",
    element: <Customers />,
    isAdmin: true,
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
  }),
  createRouteMapped({
    path: "/funds",
    name: "Fundos",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:currency-dollar",
    element: <Funds />,
    isAdmin: true,

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
  }),
  createRouteMapped({
    path: "/wallets",
    name: "Carteiras",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:wallet",
    element: <Wallets />,
    isAdmin: true,

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
  }),
  createRouteMapped({
    path: "/contributions",
    name: "Aportes",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "radix-icons:dashboard",
    isAdmin: "all",
    element: <Contribuitions />,
    subRoutes: [
      {
        name: "Faça um aporte",
        path: "insert",
        element: <ContribuitionInsert />,
      },
      {
        name: "Detalhes do aporte",
        path: "details",
        element: <ContribuitionDetails />,
      },
    ],
  }),
  createRouteMapped({
    path: "/income",
    name: "Rendimentos",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:arrow-trending-up-20-solid",
    element: <Income />,
    isAdmin: true,

    subRoutes: [
      {
        name: "Adicione um rendimento",
        path: "insert",
        element: <IncomeInsert />,
      },
    ],
  }),
  createRouteMapped({
    path: "/withdraw",
    name: "Resgates",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:arrow-uturn-down",
    isAdmin: "all",
    element: <Withdraw />,
    subRoutes: [
      {
        name: "Crie um valor comparativo",
        path: "insert",
        element: <WithdrawInsert />,
      },
    ],
  }),
  createRouteMapped({
    path: "/movements",
    name: "Movimentações",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:arrows-right-left",
    isAdmin: "all",
    element: <Movements />,
    subRoutes: [],
  }),
  createRouteMapped({
    path: "/readjustments",
    name: "Readequações",
    addToSidebar: true,
    isOutletRoute: true,
    isAdmin: true,

    icon: "heroicons:briefcase",
    element: <Readjustments />,
    subRoutes: [
      {
        name: "Adicione uma readequação",
        path: "insert",
        element: <ReadjustmentsInsert />,
      },
    ],
  }),
  createRouteMapped({
    path: "/comparative-values",
    name: "Valores comparativos",
    icon: "heroicons:table-cells",
    addToSidebar: true,
    isOutletRoute: true,
    element: <ComparativeValues />,
    isAdmin: true,

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
  }),
  createRouteMapped({
    path: "/quotes",
    name: "Cotações",
    icon: "heroicons:chart-bar",
    addToSidebar: true,
    isOutletRoute: true,
    element: <Quotes />,
    isAdmin: true,

    subRoutes: [
      {
        name: "Adicione uma cotação",
        path: "insert",
        element: <QuotesInsert />,
      },
      {
        name: "Edite uma cotação",
        path: "edit",
        element: <QuotesEdit />,
      },
    ],
  }),
  createRouteMapped({
    path: "/calculated-interest",
    name: "Juros calculados",
    addToSidebar: true,
    isOutletRoute: true,
    icon: "heroicons:circle-stack",
    element: <CalculedInterest />,
    isAdmin: true,

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
  }),
  createRouteMapped({
    path: "/interested-calculator",
    element: <Calculator />,
    name: "Calculadora de juros",
    icon: "heroicons:circle-stack",
    isAdmin: false,
    subRoutes: [],
    addToSidebar: true,
    isOutletRoute: true,
  }),
  createRouteMapped({
    path: "/verify-access",
    element: <VerifyAccess />,
    name: "Verifição de acesso",
    subRoutes: [
      {
        name: "Verifique o código de acesso",
        path: "code",
        element: <VerifyAccessCode />,
      },
    ],
    addToSidebar: false,
    isOutletRoute: false,
  }),
  createRouteMapped({
    path: "/fullfill-user-form",
    element: <UserDataProfile />,
    name: "Cadastro de dados",
    icon: "heroicons:circle-stack",
    isAdmin: false,
    subRoutes: [],
    addToSidebar: false,
    isOutletRoute: true,
    blockSidebarInteractivity: false,
  }),
  createRouteMapped({
    path: "/users-history",
    element: <History />,
    name: "Atividades Recente",
    icon: "mdi:history",
    isAdmin: true,
    subRoutes: [],
    addToSidebar: false,
    isOutletRoute: true,
  }),
];
