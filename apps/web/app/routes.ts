import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/AppLayout.tsx", [
    index("routes/home.tsx"),
    route("/blog/:slug", "routes/blogPage.tsx"),
  ]),
] satisfies RouteConfig;
