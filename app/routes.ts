import { type RouteConfig, index } from "@react-router/dev/routes";

import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/product-detail", "routes/product-detail.tsx"),
  route("/products", "routes/products.tsx"),
] satisfies RouteConfig;
