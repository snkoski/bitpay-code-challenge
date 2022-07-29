import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getMerchantById } from "~/models/merchant.server";
import { Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.merchantId, "merchantId not found");
  const { merchantId } = params;

  const merchant = await getMerchantById(merchantId);
  if (!merchant) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ merchant });
}

export default function MerchantDetailsPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div>
      MerchantId
      <Outlet />
    </div>
  );
}
