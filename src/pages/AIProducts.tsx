import { Link } from "wouter";

export default function AIProducts() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mt-20 mb-10">AI Products</h1>

      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold">
          Ads Intelligence Tool
        </h2>

       <Link href="/ai-products/free-google-ads-competitor-research">
          Open Tool →
        </Link>
      </div>
    </div>
  );
}
