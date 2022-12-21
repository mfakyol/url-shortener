import { Express } from "express";
import SRouter from "./s.route";
import ShortRouter from "./short.route";

 
const AppRoutes = (app: Express) => {
  const sRouter = SRouter();
  const shortRouter = ShortRouter();
 

  app.use(sRouter.routerPrefix, sRouter.route());
  app.use(shortRouter.routerPrefix, shortRouter.route());
 
};

export default AppRoutes;
