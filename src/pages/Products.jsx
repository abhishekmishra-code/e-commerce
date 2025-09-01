import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { ProductsPage } from "../components/products/ProductsPage";

export default function Products() {
  return (
    <DashboardLayout>
      <ProductsPage />
    </DashboardLayout>
  );
}