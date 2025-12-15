import NavLat from "@/components/common/NavLat";
import { useEffect } from "react";
import TableOrders from "@/components/orders-admin/TableOrders";

export default function AdminOrders() {
  useEffect(() => {
          const contenedor = document.getElementById("root");
          if (contenedor) {
            contenedor.scrollIntoView({ behavior: "instant" });
          }
    }, []);
    return (
        <div className="flex flex-row overflow-x-hidden">
            <NavLat currentPageName="Pedidos" />
            <main className="flex-1 md:pl-64 pb-16 md:pb-0">
                <TableOrders />
            </main>
        </div>
    )
}