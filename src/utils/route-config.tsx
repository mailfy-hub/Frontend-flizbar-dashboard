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
import { ContribuitionEdit } from "../pages/Dashboard/contribuitions/edit";
import { ContribuitionInsert } from "../pages/Dashboard/contribuitions/insert";
import { Customers } from "../pages/Dashboard/customers";
import { CustomerEdit } from "../pages/Dashboard/customers/edit";
import { CustomerInsert } from "../pages/Dashboard/customers/insert";
import { Funds } from "../pages/Dashboard/funds";
import { FundsEdit } from "../pages/Dashboard/funds/edit";
import { FundsInsert } from "../pages/Dashboard/funds/insert";
import { History } from "../pages/Dashboard/history";
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

export const RoutesMapped = () => {
  function createRouteMapped(route: Partial<routeMapped>): routeMapped {
    return {
      path: route.path || "",
      name: route.name || "",
      icon: route.icon,
      isAdmin: route.isAdmin,
      element: route.element!,
      subRoutes: route.subRoutes || [],
      addToSidebar:
        route.addToSidebar !== undefined ? route.addToSidebar : true,
      isOutletRoute:
        route.isOutletRoute !== undefined ? route.isOutletRoute : false,
      blockSidebarInteractivity:
        route.blockSidebarInteractivity !== undefined
          ? route.blockSidebarInteractivity
          : false,
    };
  }

  const lang = localStorage.getItem("language") || "en";

  const routes: routeMapped[] = [
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
      name: "UserProfile",
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
      name:
        lang === "en"
          ? "My account"
          : lang === "pt"
          ? "Minha conta"
          : "Mi cuenta",
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
      name: lang === "en" ? "Users" : lang === "pt" ? "Usuários" : "Usuarios",
      icon: "heroicons:users",
      isAdmin: true,
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit User"
              : lang === "pt"
              ? "Edite seu usuário"
              : "Editar Usuario",
          path: "edit/:id",
          element: <UserEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create User"
              : lang === "pt"
              ? "Crie um usuário"
              : "Crear Usuario",
          path: "insert",
          element: <UserInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/customers",
      name:
        lang === "en" ? "Customers" : lang === "pt" ? "Clientes" : "Clientes",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:building-storefront",
      element: <Customers />,
      isAdmin: true,
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit Client"
              : lang === "pt"
              ? "Edite seu cliente"
              : "Editar Cliente",
          path: "edit",
          element: <CustomerEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create Client"
              : lang === "pt"
              ? "Crie um cliente"
              : "Crear Cliente",
          path: "insert",
          element: <CustomerInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/funds",
      name: lang === "en" ? "Funds" : lang === "pt" ? "Fundos" : "Fondos",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:currency-dollar",
      element: <Funds />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit Fund"
              : lang === "pt"
              ? "Edite seu fundo"
              : "Editar Fondo",
          path: "edit/:id",
          element: <FundsEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create Fund"
              : lang === "pt"
              ? "Crie um fundo"
              : "Crear Fondo",
          path: "insert",
          element: <FundsInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/wallets",
      name:
        lang === "en" ? "Wallets" : lang === "pt" ? "Carteiras" : "Billeteras",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:wallet",
      element: <Wallets />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit Wallet"
              : lang === "pt"
              ? "Edite sua carteira"
              : "Editar Billetera",
          path: "edit",
          element: <WalletEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create Wallet"
              : lang === "pt"
              ? "Crie uma carteira"
              : "Crear Billetera",
          path: "insert",
          element: <WalletInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/contributions",
      name:
        lang === "en" ? "Contributions" : lang === "pt" ? "Aportes" : "Aportes",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "radix-icons:dashboard",
      isAdmin: "all",
      element: <Contribuitions />,
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Make a contribution"
              : lang === "pt"
              ? "Faça um aporte"
              : "Hacer una contribución",
          path: "insert",
          element: <ContribuitionInsert />,
        },
        {
          name:
            lang === "en"
              ? "Edit your contribution"
              : lang === "pt"
              ? "Edite seu aporte"
              : "Editar su contribución",
          path: "edit/:id",
          element: <ContribuitionEdit />,
        },
        {
          name:
            lang === "en"
              ? "Contribution details"
              : lang === "pt"
              ? "Detalhes do aporte"
              : "Detalles de la contribución",
          path: "details/:id",
          element: <ContribuitionDetails />,
        },
      ],
    }),
    createRouteMapped({
      path: "/income",
      name:
        lang === "en" ? "Incomes" : lang === "pt" ? "Rendimentos" : "Ingresos",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:arrow-trending-up-20-solid",
      element: <Income />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Add an income"
              : lang === "pt"
              ? "Adicione um rendimento"
              : "Agregar un ingreso",
          path: "insert",
          element: <IncomeInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/withdraw",
      name:
        lang === "en" ? "Withdraws" : lang === "pt" ? "Resgates" : "Retiros",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:arrow-uturn-down",
      isAdmin: "all",
      element: <Withdraw />,
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Create a comparative value"
              : lang === "pt"
              ? "Crie um valor comparativo"
              : "Crear un valor comparativo",
          path: "insert",
          element: <WithdrawInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/movements",
      name:
        lang === "en"
          ? "Movements"
          : lang === "pt"
          ? "Movimentações"
          : "Movimientos",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:arrows-right-left",
      isAdmin: "all",
      element: <Movements />,
      subRoutes: [],
    }),
    createRouteMapped({
      path: "/readjustments",
      name:
        lang === "en"
          ? "Readjustments"
          : lang === "pt"
          ? "Readequações"
          : "Reajustes",
      addToSidebar: true,
      isOutletRoute: true,
      isAdmin: true,

      icon: "heroicons:briefcase",
      element: <Readjustments />,
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Add a readjustment"
              : lang === "pt"
              ? "Adicione uma readequação"
              : "Agregar un reajuste",
          path: "insert",
          element: <ReadjustmentsInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/comparative-values",
      name:
        lang === "en"
          ? "Comparative values"
          : lang === "pt"
          ? "Valores comparativos"
          : "Valores comparativos",
      icon: "heroicons:table-cells",
      addToSidebar: true,
      isOutletRoute: true,
      element: <ComparativeValues />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit your comparative value"
              : lang === "pt"
              ? "Edite seu valor comparativo"
              : "Editar su valor comparativo",
          path: "edit",
          element: <ComparativeValuesEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create a comparative value"
              : lang === "pt"
              ? "Crie um valor comparativo"
              : "Crear un valor comparativo",
          path: "insert",
          element: <ComparativeValuesInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/quotes",
      name:
        lang === "en" ? "Quotes" : lang === "pt" ? "Cotações" : "Cotizaciones",
      icon: "heroicons:chart-bar",
      addToSidebar: true,
      isOutletRoute: true,
      element: <Quotes />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Add a quote"
              : lang === "pt"
              ? "Adicione uma cotação"
              : "Agregar una cotización",
          path: "insert",
          element: <QuotesInsert />,
        },
        {
          name:
            lang === "en"
              ? "Edit a quote"
              : lang === "pt"
              ? "Edite uma cotação"
              : "Editar una cotización",
          path: "edit",
          element: <QuotesEdit />,
        },
      ],
    }),
    createRouteMapped({
      path: "/calculated-interest",
      name:
        lang === "en"
          ? "Calculated interest"
          : lang === "pt"
          ? "Juros calculados"
          : "Intereses calculados",
      addToSidebar: true,
      isOutletRoute: true,
      icon: "heroicons:circle-stack",
      element: <CalculedInterest />,
      isAdmin: true,

      subRoutes: [
        {
          name:
            lang === "en"
              ? "Edit your calculation"
              : lang === "pt"
              ? "Edite seu cálculo"
              : "Editar su cálculo",
          path: "edit",
          element: <CalculedInterestEdit />,
        },
        {
          name:
            lang === "en"
              ? "Create a calculation"
              : lang === "pt"
              ? "Crie um cálculo"
              : "Crear un cálculo",
          path: "insert",
          element: <CalculedInterestInsert />,
        },
      ],
    }),
    createRouteMapped({
      path: "/interested-calculator",
      element: <Calculator />,
      name:
        lang === "en"
          ? "Interested calculator"
          : lang === "pt"
          ? "Calculadora de juros"
          : "Calculadora de intereses",
      icon: "heroicons:circle-stack",
      isAdmin: false,
      subRoutes: [],
      addToSidebar: true,
      isOutletRoute: true,
    }),
    createRouteMapped({
      path: "/verify-access",
      element: <VerifyAccess />,
      name:
        lang === "en"
          ? "Access verification"
          : lang === "pt"
          ? "Verificação de acesso"
          : "Verificación de acceso",
      subRoutes: [
        {
          name:
            lang === "en"
              ? "Check the access code"
              : lang === "pt"
              ? "Verifique o código de acesso"
              : "Verifique el código de acceso",
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
      name:
        lang === "en"
          ? "Data registration"
          : lang === "pt"
          ? "Cadastro de dados"
          : "Registro de datos",
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
      name:
        lang === "en"
          ? "Recent activity"
          : lang === "pt"
          ? "Atividades recente"
          : "Actividad reciente",
      icon: "mdi:history",
      isAdmin: true,
      subRoutes: [],
      addToSidebar: false,
      isOutletRoute: true,
    }),
  ];

  return routes;
};
