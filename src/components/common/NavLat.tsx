import { Button } from "@heroui/button"

import { Link } from "@heroui/link"

import { useAuth } from "@/hooks/useAuth"

import { Avatar } from "@heroui/avatar"

import { useModal } from "@/hooks/useModal";

import ModalLogOut from "./ModalLogOut";


export interface NavLatProps {
    currentPageName: string;
}

export default function NavLat({ currentPageName }: NavLatProps) {

    const { onOpen: onOpenLogOut } = useModal('logOutModal');

    const { authState } = useAuth();

    const svg1 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
            <path fill="currentColor" d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"/>
        </svg>
    )

    const svg2 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20">
            <path fill="currentColor" d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z"/>
        </svg>
    )

    const svg3 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd" d="M2 2a1 1 0 0 0-1 1v14c0 1.354.897 2.498 2.129 2.872a3 3 0 0 0 5.7.128h6.341a3 3 0 0 0 5.7-.128A3.001 3.001 0 0 0 23 17v-4a5 5 0 0 0-5-5h-4V3a1 1 0 0 0-1-1H2Zm13.171 16H14v-8h4a3 3 0 0 1 3 3v4a.997.997 0 0 1-.293.707a3 3 0 0 0-5.536.293Zm-9.878.293a1 1 0 1 1 1.414 1.414a1 1 0 0 1-1.414-1.414ZM17 19a1 1 0 1 1 2 0a1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
        </svg>
    )

    const svg4 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><g fill="currentColor">
            <path fill-rule="evenodd" d="M11 20a1 1 0 0 0-1-1H5V5h5a1 1 0 1 0 0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5a1 1 0 0 0 1-1z" clip-rule="evenodd"/>
            <path d="M21.714 12.7a.996.996 0 0 0 .286-.697v-.006a.997.997 0 0 0-.293-.704l-4-4a1 1 0 1 0-1.414 1.414L18.586 11H9a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4l.007-.007z"/>
            </g>
        </svg>
    )

    const buttons = [
        {
            name: "Usuarios",
            svg: svg1,
            link: "/admin"
        },
        {
            name: "Productos",
            svg: svg2,
            link: "/admin/products"
        },
        {
            name: "Pedidos",
            svg: svg3,
            link: "/admin/orders"
        }
    ]
    return (
        <>
            <nav className="hidden md:flex flex-col items-center justify-start gap-8 h-screen fixed top-0 left-0 w-64 bg-white/40 backdrop-blur-md px-4 py-6 border-r border-black/10 shadow-sm">
                <h1 className="tracking-wider text-black/80 text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-6">
                    MDW
                </h1>
                <div className="flex flex-col items-center w-full gap-3">
                    {buttons.map((item, index) => (
                        <Button
                            isDisabled={currentPageName === item.name}
                            className={`w-full bg-black text-white/90 flex flex-row justify-start gap-4 ${currentPageName === item.name ? "bg-[#F5F5DC] text-black/90" : "hover:bg-gray-300 hover:text-black"}`}
                            startContent={item.svg}
                            key={index}
                            variant={currentPageName === item.name ? "solid" : "light"}
                            size="lg"
                            color="default"
                            as={Link}
                            href={item.link}
                        >
                            {item.name}
                        </Button>
                    ))}
                </div>
                <div className="mt-auto rounded-2xl flex flex-col w-full bg-[#F5F5DC] justify-center items-center gap-2 p-4">
                    <div className="flex flex-row justify-center items-center gap-4 w-full">
                        <Avatar />
                        <p className="text-sm font-medium text-black/90">{authState.name} {authState.lastName}</p>
                    </div>
                    <div className="mt-2 w-full">
                        <Button
                            className="w-full bg-white text-black/90 flex flex-row justify-start gap-4 hover:bg-red-400 hover:text-white/90"
                            startContent={svg4}
                            onPress={onOpenLogOut}
                        >
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
                <ModalLogOut />
            </nav>

            <div className="md:hidden fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-sm border-t border-black/5 py-2 z-50">
                <div className="mx-3 rounded-xl shadow-lg overflow-hidden bg-white/90">
                    <div className="flex flex-row justify-around items-center max-w-screen mx-auto px-1">
                    {buttons.map((item, index) => (
                        <Button
                            aria-current={currentPageName === item.name ? 'page' : undefined}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 min-h-[56px] rounded-lg border-0 ${currentPageName === item.name ? "text-black" : "text-gray-700"} hover:bg-gray-50`}
                            key={index}
                            size="md"
                            variant="ghost"
                            as={Link}
                            href={item.link}
                            aria-label={item.name}
                        >
                            <span className="flex items-center justify-center h-5 w-5">{item.svg}</span>
                            <span className="text-[10px] pt-1">{item.name}</span>
                            {currentPageName === item.name && (
                                <span className="block h-[2px] w-6 bg-black/90 mt-1 rounded-full" aria-hidden />
                            )}
                        </Button>
                    ))}
                    <Button
                        aria-label="Salir"
                        onPress={onOpenLogOut}
                        className="flex-1 flex flex-col items-center justify-center gap-1 px-3 py-2 min-h-[56px] rounded-lg border-0 text-gray-700 hover:bg-gray-50"
                        size="md"
                        variant="ghost"
                    >
                        <span className="flex items-center justify-center h-5 w-5 text-red-600">{svg4}</span>
                        <span className="text-[10px] pt-1">Salir</span>
                    </Button>
                    </div>
                </div>
            </div>

        </>
    )
}