import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { paths } from "./routes/path";

export default [
  layout("layouts/AppLayout.tsx", [
    index("routes/home.tsx"),
    ...prefix(paths.articles, [
      index("./routes/articles.tsx"),
      route("/:slug", "routes/articlePage.tsx"),
    ]),
    ...prefix(paths.projects, [
      index("./routes/projects.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
