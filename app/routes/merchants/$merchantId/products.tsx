import { Outlet } from "@remix-run/react";

export default function ProductsPage() {
  return (
    <div>
      <p>ProductsPage</p>
      <Outlet />
    </div>
  );
}
