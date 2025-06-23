import { routes } from "../routes";
import { IAuthMeUser } from "@/interfaces";

export const accessByRole: Record<string, string[]> = {
  CLIENT: [routes.client.subscription, routes.user.profile],
  SELLER: [
    routes.user.profile,
    routes.user.sales,
    routes.user.support,
    ...Object.values(routes.shop),
  ],
  ADMIN: [
    ...Object.values(routes.user),
    ...Object.values(routes.shop),
    ...Object.values(routes.manager.add),
    ...Object.values(routes.manager.settings),
    ...Object.values(routes.manager.cashier),
  ],
  SUPERADMIN: [
    ...Object.values(routes.user),
    ...Object.values(routes.shop),
    ...Object.values(routes.manager.add),
    ...Object.values(routes.manager.settings),
    ...Object.values(routes.manager.cashier),
  ],
};

const publicRoutes = Object.values(routes.public);

const canAccessPath = (user: IAuthMeUser | null, path: string): boolean => {
  if (!user) return false;
  const roles = user.roles?.length ? user.roles : ["CLIENT"];
  const allowedRoutes = roles.flatMap((role) => accessByRole[role] ?? []);
  return allowedRoutes.some((route) => path.startsWith(route));
};

export const accessControl = {
  publicRoutes,
  canAccessPath,
};
