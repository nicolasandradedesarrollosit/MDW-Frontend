import Navbar from "@/components/common/Navbar"
import ProductCard from "@/components/single-product/ProductCard"

export default function SingleProduct() {
    return (
        <>
            <div className="flex flex-col items-center">
                <Navbar />
                <ProductCard />
            </div>
        </>
    )
}