import Navbar from "@/components/common/Navbar"
import ProductCard from "@/components/single-product/ProductCard"
import Footer from "@/components/common/Footer"
import { useEffect } from "react";

export default function SingleProduct() {
    useEffect(() => {
        const contenedor = document.getElementById("root");
        if (contenedor) {
          contenedor.scrollIntoView({ behavior: "instant" });
        }
    }, []);
    return (
        <>
            <div className="flex flex-col items-center">
                <Navbar />
                <ProductCard />
                <Footer />
            </div>
        </>
    )
}