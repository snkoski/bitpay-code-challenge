import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAllMerchants } from "~/models/merchant.server";

export async function loader() {
  const merchants = await getAllMerchants();
  return json(merchants);
}

export default function MerchantIndexPage() {
  const data = useLoaderData();
  console.log(data);

  return (
    <div>
      MerchantIndexPage
      <Outlet />
    </div>
  );
}
