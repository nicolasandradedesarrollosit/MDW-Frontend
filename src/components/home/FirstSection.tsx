import { useState } from "react"

export default function FirstSection() {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 4
    const totalItems = 12 // Ejemplo: 12 productos en total
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
    }

    return (
        <section className="min-h-[60vh] w-full flex flex-col justify-start items-center py-12 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-7xl mb-8 gap-4">
                <h1 className="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-black/90">
                    ÚLTIMOS PRODUCTOS AGREGADOS
                </h1>
                <div className="flex flex-row gap-2 sm:gap-3">
                    <button 
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className={`flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg transition-all duration-200 ${
                            currentPage === 0 
                                ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                                : 'border-black hover:bg-black hover:text-white cursor-pointer'
                        }`}
                        aria-label="Página anterior"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                            <path fill="currentColor" d="M5 2L3 4l2 2l-1 1l-3-3l3-3"/>
                        </svg>
                    </button>
                    <button 
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className={`flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg transition-all duration-200 ${
                            currentPage === totalPages - 1 
                                ? 'border-gray-300 text-gray-300 cursor-not-allowed' 
                                : 'border-black hover:bg-black hover:text-white cursor-pointer'
                        }`}
                        aria-label="Página siguiente"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                            <path fill="currentColor" d="m3 2l2 2l-2 2l1 1l3-3l-3-3"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="w-full max-w-7xl min-h-[400px] flex items-center justify-center">
                <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
                    Cards van aquí - Página {currentPage + 1} de {totalPages}
                </p>
            </div>

            <div className="flex gap-1.5 sm:gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                            index === currentPage 
                                ? 'w-6 sm:w-8 bg-black' 
                                : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Ir a página ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}