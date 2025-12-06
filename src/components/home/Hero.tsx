import {Button} from "@heroui/button"

import {Link} from "@heroui/link"

import Navbar from "../common/Navbar";


export default function Hero() {

    return (
        <header className="flex flex-col w-full h-[100vh] bg-gradient-to-b from-white via-gray-50 to-white items-center justify-start">
            <Navbar />
            <div className="w-95/100 h-full flex justify-start items-center overflow-hidden py-4 relative">
                <img 
                    className="w-full h-full object-cover object-center" 
                    src="/hero-image.jpg" 
                    alt="Colección premium de ropa unisex"
                    onError={(e) => {
                        console.error('Error al cargar la imagen');
                        const target = e.currentTarget;
                        target.style.backgroundColor = '#1a1a1a';
                    }}
                />
                
                
                <div className="flex flex-col absolute left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 lg:left-20 bottom-8 md:bottom-16 lg:bottom-20 z-10 gap-3 md:gap-5 lg:gap-6 h-auto w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/3 backdrop-blur-md bg-black/50 p-4 md:p-7 lg:p-8 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 hover:backdrop-blur-lg hover:bg-black/60 hover:border-white/30">
                    <span className="p-2 md:p-3 bg-gradient-to-r from-white via-white to-gray-50 flex justify-center items-center rounded-lg shadow-md">
                        <h1 className="text-black text-[10px] md:text-sm font-bold tracking-widest uppercase">Colección Exclusiva</h1>
                    </span>
                    <h1 className="font-bold text-white text-2xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-2xl leading-tight">
                        ROPA PREMIUM<br />
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                            UNISEX
                        </span>
                    </h1>
                    <p className="text-white/95 text-xs md:text-base leading-relaxed drop-shadow-md font-light">
                        Mejora tu experiencia de compra con hasta un 50% de descuento en nuestros productos de alta calidad.
                    </p>
                    <Button
                        showAnchorIcon
                        as={Link}
                        color="primary"
                        href="/products"
                        variant="flat"
                        className="w-2/3 bg-white text-black text-sm md:text-base font-semibold hover:bg-white/90 transition-all shadow-lg"
                    >
                        Ver productos   
                    </Button>
                </div>
            </div>
        </header>
    )
}