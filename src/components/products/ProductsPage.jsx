import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";

import { ProductTable } from "./ProductTable";
import { ProductForm } from "./ProductForm";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { Button } from "../ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { Card } from "../ui/card";

export function ProductsPage() {
  const dispatch = useDispatch();

  // Read products array directly from Redux
  const products = useSelector((state) => state.products.items);

  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 10;

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    console.log(query);
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setView("add");
  };

  const handleEditProduct = (product) => {
    console.log(product);
    setEditingProduct(product);
    setView("edit");
  };

const handleDeleteProduct = async (productObj) => {
  setIsLoading(true);

  await dispatch(
    deleteProduct({
      id: productObj.$id,
      product: productObj, // includes image URL array
    })
  );

  setIsLoading(false);
};

  const handleSaveProduct = async (productData) => {
  setIsLoading(true);

  if (editingProduct) {
    await dispatch(
      updateProduct({
        id: editingProduct.$id,
        formData: productData,
        existingProduct: editingProduct
      })
    );
  } else {
    await dispatch(createProduct(productData));
  }

  setIsLoading(false);
  setView("list");
  setEditingProduct(null);
};


  const handleCancelForm = () => {
    setView("list");
    setEditingProduct(null);
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleCancelForm}
              className="flex items-center bg-secondary cursor-pointer text-foreground hover:text-foreground/90 dark:hover:text-foreground/70"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              {view === "add" ? "Add New Product" : "Edit Product"}
            </h1>
          </div>
        </div>

        <Card className="p-6 shadow-card">
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
            isLoading={isLoading}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
        <Button onClick={handleAddProduct} className="shadow-elegant">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search products by name, SKU, or brand..."
      />

      {/* Products Table */}
      <Card className="shadow-card">
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          isLoading={isLoading}
        />
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}