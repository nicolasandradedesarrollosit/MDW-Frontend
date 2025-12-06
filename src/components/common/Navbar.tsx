import {useDrawer} from "@/hooks/useDrawer";

import { useState } from "react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { onOpen: onOpenProfile } = useDrawer('profile');
    const { onOpen: onOpenCart } = useDrawer('cart');

    return (
        <>
            <nav className="flex flex-row justify-between items-center w-11/12 lg:w-9/10 h-[10vh] md:h-[12vh] px-4">
                <div className="transition-transform hover:scale-110">
                    <h1 className="tracking-wider text-black/80 text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        MDW
                    </h1>
                </div>
                
                <div className="hidden md:block">
                    <ul className="flex flex-row gap-8 lg:gap-12">
                        <li className="font-semibold text-black/70 text-base lg:text-lg hover:text-black transition-colors cursor-pointer">
                            HOMBRES
                        </li>
                        <li className="font-semibold text-black/70 text-base lg:text-lg hover:text-black transition-colors cursor-pointer">
                            MUJERES
                        </li>
                    </ul>
                </div>
                
                <div>
                    <ul className="flex flex-row gap-4 md:gap-6 lg:gap-8">
                        <li className="md:hidden">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="transition-all hover:scale-110 hover:text-blue-600 duration-200 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                aria-label="Menú"
                            >
                                <svg className="h-[22px] w-[22px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => {
                                    console.log('Carrito de compras');
                                    onOpenCart();
                                }}
                                className="transition-all hover:scale-110 hover:text-blue-600 duration-200 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                aria-label="Carrito de compras"
                            >
                                <svg className="h-[22px] w-[22px] md:h-[26px] md:w-[26px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0V1Zm7.764 11h10.515l2.334-7H5.855l1.909 7ZM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0Zm14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0Z"/>
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => {
                                    console.log('Click en icono de usuario');
                                    onOpenProfile();
                                }}
                                className="transition-all hover:scale-110 hover:text-blue-600 duration-200 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                                aria-label="Perfil de usuario"
                            >
                                <svg className="h-[22px] w-[22px] md:h-[26px] md:w-[26px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4Z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        
            {isMenuOpen && (
                <div className="md:hidden w-11/12 lg:w-9/10 bg-white shadow-lg rounded-lg p-4 absolute top-[10vh] z-50">
                    <ul className="flex flex-col gap-4">
                        <li className="font-semibold text-black/70 text-base hover:text-black transition-colors cursor-pointer py-2 border-b border-gray-200">
                            HOMBRES
                        </li>
                        <li className="font-semibold text-black/70 text-base hover:text-black transition-colors cursor-pointer py-2 border-b border-gray-200">
                            MUJERES
                        </li>
                    </ul>
                </div>
            )}
        </>  
        )
}