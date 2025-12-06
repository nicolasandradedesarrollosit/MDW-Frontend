import Navbar from "@/components/common/Navbar"
import FirstSection from "@/components/products/FirstSection"
import SecondSection from "@/components/products/SecondSection"
import Footer from "@/components/common/Footer"

export default function Products() {
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