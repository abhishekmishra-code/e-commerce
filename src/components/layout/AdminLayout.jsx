import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { fetchProducts } from "../../redux/slices/productSlice";

export default function AdminLayout() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
  return (
    <div className="admin-layout">
      <Outlet />
    </div>
  );
}
