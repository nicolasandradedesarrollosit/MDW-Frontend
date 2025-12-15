import Navbar from "@/components/common/Navbar"
import FirstSection from "@/components/products/FirstSection"
import SecondSection from "@/components/products/SecondSection"
import Footer from "@/components/common/Footer"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Products() {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || undefined;
    const categoryParams = categoryParam ? categoryParam.split(',').map(s => s.trim()).filter(Boolean) : undefined;

    useEffect(() => {
        const contenedor = document.getElementById("root");
        if (contenedor) {
            contenedor.scrollIntoView({ behavior: "instant" });
        }
    }, []);
    return (
        <>
            <div className="bg-[#F5F5DC]">
                <header className="flex flex-col w-full h-auto pb-20 bg-transparent items-center justify-start">
                    <Navbar />
                </header>
                <FirstSection initialCategory={categoryParams} />
                <SecondSection categorySlugs={categoryParams} />
                <Footer />
            </div>
        </>
    )
}