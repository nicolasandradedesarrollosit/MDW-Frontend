import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Products from "./pages/products";
import Admin from "./pages/admin";
import AdminProducts from "./pages/admin-products";
import { Provider } from "./provider";
import { useProducts } from "./hooks/useProducts";
import {useAuth} from "./hooks/useAuth";
import { ProtectedRoute } from "./hooks/ProtectedRoute";


function App() {
  useProducts();
  // useAuth();

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
      </Routes>
    </Provider>
  );
}

export default App;
