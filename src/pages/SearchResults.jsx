import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import ProductList from "../components/products/ProductList";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const products = useSelector((state) => state.products.items);
  const query = useQuery().get("q") || "";

  const filteredProducts = products.filter((product) => {
    const q = query.toLowerCase();
    return (
      product.name?.toLowerCase().includes(q) ||
      product.tag?.toLowerCase().includes(q) ||
      product.category?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold">
        Search Results for "{query}"
      </h1>
      <ProductList products={filteredProducts} />
    </div>
  );
}