import Navbar from "@/components/common/Navbar"
import FirstSection from "@/components/products/FirstSection"
import SecondSection from "@/components/products/SecondSection"
import Footer from "@/components/common/Footer"
import { useEffect } from "react";

export default function Products() {
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
                <FirstSection />
                <SecondSection />
                <Footer />
            </div>
        </>
    )
}