import Hero from "@/components/home/Hero";
import FirstSection from "@/components/home/FirstSection";
import SecondSection from "@/components/home/SecondSection";
import Footer from "@/components/common/Footer";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
          const contenedor = document.getElementById("root");
          if (contenedor) {
            contenedor.scrollIntoView({ behavior: "instant" });
          }
    }, []);
    return (
        <>
            <Hero />
            <FirstSection />
            <SecondSection />
            <Footer />
        </>
    )
}