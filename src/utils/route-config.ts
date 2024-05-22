import { roleAccessType } from "../hook/auth";

interface RoutesMapped {
  route: string;
  name: string;
  icon: string;
  roleAccess: roleAccessType[];
}

export const RoutesMapped = [
  {
    route: "/",
    name: "Dashboard",
    icon: "radix-icons:dashboard",
    roleAccess: ["all"],
  },
  {
    route: "/users",
    name: "Usuários",
    icon: "heroicons:users",
    roleAccess: ["admin"],
  },
  {
    route: "/customers",
    name: "Clientes",
    icon: "heroicons:building-storefront",
    roleAccess: ["admin"],
  },
  {
    route: "/funds",
    name: "Fundos",
    icon: "heroicons:currency-dollar",
    roleAccess: ["admin"],
  },
  {
    route: "/wallets",
    name: "Carteiras",
    icon: "heroicons:wallet",
    roleAccess: ["admin"],
  },
  {
    route: "/contributions",
    name: "Aportes",
    icon: "radix-icons:dashboard",
    roleAccess: ["admin"],
  },
  {
    route: "/income",
    name: "Rendimentos",
    icon: "heroicons:arrow-trending-up-20-solid",
    roleAccess: ["admin"],
  },
  {
    route: "/withdraw",
    name: "Resgates",
    icon: "heroicons:arrow-uturn-down",
    roleAccess: ["admin"],
  },
  {
    route: "/movements",
    name: "Movimentações",
    icon: "heroicons:arrows-right-left",
    roleAccess: ["admin"],
  },
  {
    route: "/readjustments",
    name: "Readequações",
    icon: "heroicons:briefcase",
    roleAccess: ["admin"],
  },
  {
    route: "/comparative-values",
    name: "Valores comparativos",
    icon: "heroicons:table-cells",
    roleAccess: ["admin"],
  },
  {
    route: "/quotes",
    name: "Cotações",
    icon: "heroicons:chart-bar",
    roleAccess: ["admin"],
  },
  {
    route: "/calculated-interest",
    name: "Juros calculados",
    icon: "heroicons:circle-stack",
    roleAccess: ["admin"],
  },
];
