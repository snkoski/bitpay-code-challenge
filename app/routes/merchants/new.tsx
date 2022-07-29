import { useEffect, useRef } from "react";
import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";

import { createMerchant } from "~/models/merchant.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { name: "Merchant name is required", body: null } },
      { status: 400 }
    );
  }

  const merchant = await createMerchant(name);

  return redirect(`/merchants/${merchant.id}`);
}

export default function NewMerchant() {
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form method="post">
      <div>
        <label>
          <span>Name</span>
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
        <button type="submit">Save</button>
      </div>
    </Form>
  );
}
