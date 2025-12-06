import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Products from "./pages/products";

import DrawerFather from "./components/home/DrawerFather";
import DrawerCartFather from "./components/home/DrawerCartFather";
import { Provider } from "./provider";
import { useProducts } from "./hooks/useProducts";


function App() {
  useProducts();
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <DrawerFather />
      <DrawerCartFather /> 
    </Provider>
  );
}

export default App;
