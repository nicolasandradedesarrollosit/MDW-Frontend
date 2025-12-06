import { Button } from "@heroui/button"

import { useState } from "react"

export default function FirstSection() {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const categories = [
        { id: 'remeras', label: 'Remeras' },
        { id: 'shorts', label: 'Shorts' },
        { id: 'buzos', label: 'Buzos' },
        { id: 'pantalones', label: 'Pantalones' },
        { id: 'accesorios', label: 'Accesorios' }
    ];

    const svg1 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="#ffffff" d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"/>
        </svg>
    )

    const svg2 = (
        <svg className="h-[20px] w-[20px]" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20" fill="#ffffff"><g fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M10.293 7.707a1 1 0 0 1 0-1.414l3-3a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0Z"/><path d="M17.707 7.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414Z"/><path d="M14 5a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm-4.293 7.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0Z"/>
            <path d="M2.293 12.293a1 1 0 0 1 1.414 0l3 3a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414Z"/><path d="M6 15a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1Z"/></g>
        </svg>
    )

    return (
        <section className="flex flex-col gap-8 md:gap-12 lg:gap-16 justify-center items-center h-auto w-full px-4 py-8 md:py-12">
            <div className="flex flex-col gap-4 md:gap-8 justify-center items-center text-center">
                <p className="text-black/60 text-sm md:text-base lg:text-lg font-light uppercase tracking-wider">Nuestros Productos</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    Elegancia donde estés
                </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl gap-6 md:gap-8">
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                    {categories.map(cat => (
                        <Button 
                            key={cat.id}
                            variant="solid"
                            size="md" 
                            color="default" 
                            className={`transition-all text-xs md:text-sm ${
                                selectedCategories.includes(cat.id) 
                                    ? 'bg-black/70 text-white' 
                                    : 'bg-black/10 text-black hover:bg-black/30'
                            }`}
                            onPress={() => toggleCategory(cat.id)}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>
                <div className="flex flex-row gap-2 md:gap-3 w-full md:w-auto justify-center">
                    <Button 
                        startContent={svg1} 
                        variant="solid" 
                        size="md" 
                        color="default" 
                        className="bg-black text-white hover:bg-gray-800 flex-1 md:flex-none text-xs md:text-sm"
                    >
                        Filtrar
                    </Button>
                    <Button 
                        startContent={svg2} 
                        variant="solid" 
                        size="md" 
                        color="default" 
                        className="bg-black text-white hover:bg-gray-800 flex-1 md:flex-none text-xs md:text-sm"
                    >
                        Ordenar
                    </Button>
                </div>
            </div>
        </section>
    )
}