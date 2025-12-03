import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="min-h-[40vh] w-full flex flex-col md:flex-row bg-black text-white justify-center items-start md:items-center gap-8 md:gap-16 lg:gap-24 px-6 md:px-12 lg:px-16 py-12 md:py-8">
            <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-xl md:text-2xl mb-1 md:mb-2 text-white font-bold tracking-wide">Políticas</h2>
                <Link 
                    to={'/privacity'} 
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                    Políticas de privacidad
                </Link>
                <Link 
                    to={'/shipments'} 
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                    Políticas de envíos
                </Link>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
                <h2 className="text-xl md:text-2xl mb-1 md:mb-2 text-white font-bold tracking-wide">Sobre Nosotros</h2>
                
                <span className="flex flex-row gap-3 items-center text-white/70 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 1024 1025">
                        <path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/>
                    </svg>
                    <span>Rioja 1500 - Rosario, Santa Fe</span>
                </span>
                
                <span className="flex flex-row gap-3 items-center text-white/70 text-sm md:text-base">
                    <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M20 18.35V19a1 1 0 0 1-1 1h-2A17 17 0 0 1 0 3V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4c0 .56-.31 1.31-.7 1.7L3.16 8.84c1.52 3.6 4.4 6.48 8 8l2.12-2.12c.4-.4 1.15-.71 1.7-.71H19a1 1 0 0 1 .99 1v3.35z"/>
                    </svg>
                    <span>+54 9 11 1234 5678</span>
                </span>
                
                <span className="text-white/50 text-xs md:text-sm mt-2 md:mt-4 font-light">
                    © 2024 MDW - Todos los derechos reservados
                </span>
            </div>
        </footer>
    )
}