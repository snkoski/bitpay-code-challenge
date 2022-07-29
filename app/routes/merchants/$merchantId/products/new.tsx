import { useEffect, useRef } from "react";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { createProduct } from "~/models/product.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "Merchant name is required", body: null } },
      { status: 400 }
    );
  }

  const merchant = await createProduct(name);

  return redirect(`/merchants/${merchant.id}/products`);
}

export default function NewProduct() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.price) {
      priceRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post">
      <div>
        <label>
          <span>Product Name</span>
          <input
            type="text"
            name="name"
            ref={nameRef}
            aria-invalid={actionData?.errors?.name ? true : undefined}
            aria-errormessage={
              actionData?.errors?.name ? "name-error" : undefined
            }
          />
        </label>
      </div>
      <div>
        <label>
          <span>Product Price in USD</span>
          <input
            type="number"
            name="price"
            ref={priceRef}
            aria-invalid={actionData?.errors?.price ? true : undefined}
            aria-errormessage={
              actionData?.errors?.price ? "name-error" : undefined
            }
          />
        </label>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
}
