import "dotenv/config";
import "express";

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { PrismaClient } from "@prisma/client";
import { Database, Resource } from "@adminjs/prisma";

AdminJS.registerAdapter({ Database, Resource });

const prisma = new PrismaClient();

const usersNavigation = {
  name: "Users",
  icon: "User",
};

const adminOptions = {
  resource: [
    {
      resource: { model: prisma.user, client: prisma },
      options: {
        navigation: usersNavigation,
      },
    },
    {
      resource: { model: prisma.product, client: prisma },
    },
    {
      resource: { model: prisma.category, client: prisma },
    },
    {
      resource: { model: prisma.cart, client: prisma },
    },
  ],
  rootPath: "/admin",
};
export const runAdminJS = (app) => {
  const admin = new AdminJS(adminOptions);

  // AdminJS authentication
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      if (email === "longcumauhong@gmail.com" && password === "123123123") {
        return { email: "longcumauhong@gmail.com" };
      }
      return null;
    },
    cookiePassword: process.env.COOKIE_PASSWORD,
  });

  // Use AdminJS routes in the Express app
  app.use(admin.options.rootPath, adminRouter);
};
