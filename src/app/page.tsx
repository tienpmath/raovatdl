import Login from "@/components/Login";
import ProductGridPage from "@/components/ProductGridPage";
import { getSession } from "@/lib";
import PublicLayout from "./layout/public-layout";

export default async function Home() {
  const session = await getSession();
  const res = await fetch(
    "https://cloud.raovatlamdong.vn/api/app/product?SkipCount=1&MaxResultCount=100",
    {
      method: "GET",
      next: { tags: ["home-list-products"] },
    }
  );
  //const total_items = +(res.headers?.get("X-Total-Count") ?? 0)
  const data = await res.json();
  return (
    <>
      {/* <main className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue.
          </p>
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
          <Login />
        </div>
      </main> */}
      <PublicLayout>
        <div className="min-h-screen bg-gray-100">
          {/* <ModernUI products={products} /> */}
          <ProductGridPage data={data} />
        </div>
      </PublicLayout>
    </>
  );
}
