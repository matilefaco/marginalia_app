export interface RouteItem {
  path: string;
  label: string;
  isNav: boolean;
  requiredFlag?: string;
}

export const routes: RouteItem[] = [
  {
    path: "/margens",
    label: "Diário",
    isNav: true,
  },
  {
    path: "/descobrir",
    label: "Descobertas",
    isNav: true,
  },
  {
    path: "/ecos",
    label: "Ecos",
    isNav: true,
  },
  {
    path: "/companheira",
    label: "Companheira",
    isNav: true,
  },
  {
    path: "/perfil",
    label: "Perfil",
    isNav: true,
  },
];
