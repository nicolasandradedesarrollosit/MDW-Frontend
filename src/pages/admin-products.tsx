import NavLat from "@/components/common/NavLat";
import TableProducts from "@/components/products-admin/TableProducts";
import { useEffect } from "react";

export default function AdminProducts() {
  useEffect(() => {
          const contenedor = document.getElementById("root");
          if (contenedor) {
            contenedor.scrollIntoView({ behavior: "instant" });
          }
    }, []);
    return (
        <div className="flex flex-row overflow-x-hidden">
            <NavLat currentPageName="Productos" />
            <main className="flex-1 md:pl-64 pb-16 md:pb-0">
                <TableProducts />
            </main>
        </div>
    )
}