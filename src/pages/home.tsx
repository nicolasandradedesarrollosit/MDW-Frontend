import Hero from "@/components/home/Hero";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";
import Footer from "@/components/common/Footer";
import DrawerFather from "../components/home/DrawerFather";
import DrawerCartFather from "../components/home/DrawerCartFather";

export default function Home() {
    return (
        <>
            <Hero />
            <FirstSection />
            <SecondSection />
            <Footer />
            <DrawerFather />
            <DrawerCartFather /> 
        </>
    )
}