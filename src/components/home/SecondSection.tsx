import {
    Card,
    CardBody
} from "@heroui/card"

import {useNavigate} from "react-router-dom"

import {Image} from "@heroui/image"

export default function SecondSection() {

    const navigate = useNavigate();

    const category = [
        {
            title: "Remeras",
            img: "remera.jpg",
            link: "/products/shirts"
        },
        {
            title: "Shorts",
            img: "shorts.jpg",
            link: "/products/shorts"
        },
        {
            title: "Buzos",
            img: "buzo.jpg",
            link: "/products/hoodies"
        },
        {
            title: "Pantalones",
            img: "pantalon.jpg",
            link: "/products/pants"
        },
        {
            title: "Accesorios",
            img: "accesorios.jpg",
            link: "/products/accessories"
        }
    ]

    return (
        <section className="min-h-[60vh] w-full flex flex-col justify-start items-center py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-7xl mb-12 gap-4">
                <h1 className="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-black/90">
                    COMPRA POR CATEGORÍA
                </h1>
            </div>

            <div className="w-full max-w-7xl flex flex-col gap-6">
                {/* Primera fila - 2 categorías grandes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.slice(0, 2).map((item, index) => (
                        <Card 
                            key={index} 
                            isPressable 
                            shadow="lg" 
                            onPress={() => {navigate(item.link)}} 
                            className="group overflow-hidden border-none bg-transparent hover:scale-[1.02] transition-transform duration-300"
                        >
                            <CardBody className="p-0 relative overflow-hidden rounded-2xl">
                                <div className="relative overflow-hidden">
                                    <Image
                                        alt={item.title}
                                        className="w-full h-[300px] sm:h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-500"
                                        radius="lg"
                                        src={item.img}
                                        width="100%"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/75 transition-all duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
                                    <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
                                        {item.title}
                                    </h3>
                                    <p className="text-white text-sm sm:text-base mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md">
                                        Ver colección →
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Segunda fila - 3 categorías medianas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.slice(2, 5).map((item, index) => (
                        <Card 
                            key={index + 2} 
                            isPressable 
                            shadow="lg" 
                            onPress={() => {navigate(item.link)}} 
                            className="group overflow-hidden border-none bg-transparent hover:scale-[1.02] transition-transform duration-300"
                        >
                            <CardBody className="p-0 relative overflow-hidden rounded-2xl">
                                <div className="relative overflow-hidden">
                                    <Image
                                        alt={item.title}
                                        className="w-full h-[250px] sm:h-[280px] md:h-[320px] object-cover group-hover:scale-110 transition-transform duration-500"
                                        radius="lg"
                                        src={item.img}
                                        width="100%"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/75 transition-all duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-10">
                                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
                                        {item.title}
                                    </h3>
                                    <p className="text-white text-xs sm:text-sm mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md">
                                        Ver colección →
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}