import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllMerchants } from "~/models/merchant.server";
import type { Merchant } from "@prisma/client";

type LoaderData = { merchants: Array<Merchant> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    merchants: await getAllMerchants(),
  };
  return json(data);
};

export default function MerchantIndexPage() {
  const { merchants } = useLoaderData<LoaderData>();
  console.log(merchants);

  return (
    <div>
      MerchantIndexPage
      {merchants.map((merchant) => (
        <Link to={`${merchant.id}`} key={merchant.id}>
          {merchant.name}
        </Link>
      ))}
      <Outlet />
    </div>
  );
}
