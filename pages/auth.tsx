import Head from "next/head";
import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";

interface AuthPageQuery extends ParsedUrlQuery {
  form?: "signin" | "signup";
}

export default function Auth() {
  const { query }: NextRouter & { query: AuthPageQuery } = useRouter();

  const pageTitle = query.form === "signin" ? "Sign In" : "Sign Up";

  return (
    <>
      <Head>
        <title>{pageTitle} | The Bakeries Aggregator</title>
      </Head>

      <div></div>
    </>
  );
}
