// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products slug={slug} />
// Input parameters: { slug }: any
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

// Define Product type if not imported
type Product = {
  id: string;
  // add other fields as needed
};

const ProductsSection = async () => {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // Use relative path if API is part of the same Next.js app
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text();
      error = `API error: ${res.status}\n${text}`;
    } else {
      products = await res.json();
    }
  } catch (e: any) {
    error = e.message;
  }

  if (error) {
    return <div>Error loading products:<pre>{error}</pre></div>;
  }

  return (
    <div className="bg-blue-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} color="white" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;