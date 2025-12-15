import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Products from "./pages/products";
import Admin from "./pages/admin";
import AdminProducts from "./pages/admin-products";
import SingleProduct from "./pages/single-product";
import Order from "./pages/order";
import AdminOrders from "./pages/admin-orders";
import DrawerFather from "./components/home/DrawerFather";
import DrawerCartFather from "./components/home/DrawerCartFather";
import { Provider } from "./provider";
import { useProducts } from "./hooks/useProducts";
import {useAuth} from "./hooks/useAuth";
import { useCategories } from "./hooks/useCategories";
import { useProductSize } from "./hooks/useProductSize";
import { ProtectedRoute } from "./hooks/ProtectedRoute";
import { ProtectedRouteProduct } from "./hooks/ProtectedRouteProduct";
import { ProtectedRouteCart } from "./hooks/ProtectedRouteCart";


function App() {
  useProducts();
  useAuth();
  useCategories();
  useProductSize();

  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route 
            path="/admin" 
            element={
                <ProtectedRoute requireAdmin>
                    <Admin />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/admin/products" 
            element={
                <ProtectedRoute requireAdmin>
                    <AdminProducts />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/admin/orders" 
            element={
                <ProtectedRoute requireAdmin>
                    <AdminOrders />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/single-product/:id" 
            element={
                <ProtectedRouteProduct requireIDProduct>
                    <SingleProduct />
                </ProtectedRouteProduct>
            } 
        />
        <Route
        path="/order"
        element={
            <ProtectedRouteCart>
                <Order />
            </ProtectedRouteCart>
        }
        >
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
      <DrawerFather />
      <DrawerCartFather />
    </Provider>
  );
}

export default App;