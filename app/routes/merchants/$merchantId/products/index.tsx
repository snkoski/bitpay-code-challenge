import type { Product } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getProductsByMerchant } from "~/models/product.server";

type LoaderData = { products: Array<Product> };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.merchantId, "merchantId not found");
  const { merchantId } = params;
  const data: LoaderData = {
    products: await getProductsByMerchant(merchantId),
  };
  return json(data);
};

export default function MerchantProducts() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div>
      MerchantProducts
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
