import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function FirstSection() {
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 4
    const productsState = useSelector((state: any) => state.products);
    const productOrdered = [...productsState.products].sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const totalPages = Math.ceil(productOrdered.length / itemsPerPage)
    const navigate = useNavigate();

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
    }

    return (
        <section className="min-h-[60vh] w-full flex flex-col justify-start items-center py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full max-w-7xl mb-12 gap-6">
                <div className="space-y-2">
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black/90 tracking-tight">
                        ÚLTIMOS PRODUCTOS
                    </h1>
                </div>
                
                <div className="flex flex-row gap-3">
                    <button 
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className={`group flex justify-center items-center w-12 h-12 border-2 rounded-xl transition-all duration-300 ${
                            currentPage === 0 
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                                : 'border-black/20 hover:border-black hover:bg-black text-black hover:text-white cursor-pointer hover:shadow-lg hover:-translate-x-0.5'
                        }`}
                        aria-label="Página anterior"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button 
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className={`group flex justify-center items-center w-12 h-12 border-2 rounded-xl transition-all duration-300 ${
                            currentPage === totalPages - 1 
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                                : 'border-black/20 hover:border-black hover:bg-black text-black hover:text-white cursor-pointer hover:shadow-lg hover:translate-x-0.5'
                        }`}
                        aria-label="Página siguiente"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="w-full max-w-7xl min-h-[500px] flex items-center justify-center">
                {productsState.loading ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-medium">Cargando productos...</p>
                    </div>
                ) : (
                <>
                    {productsState.products.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-16">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium text-lg">No hay productos disponibles</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {productOrdered
                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                .map((product: any) => (
                                    <div 
                                        key={product._id}
                                        className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden aspect-square bg-gray-100">
                                            <img 
                                                src={product.url_image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                                Nuevo
                                            </div>
                                        </div>
                                        
                                        <div className="p-5 space-y-3">
                                            <h2 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-black transition-colors">
                                                {product.name}
                                            </h2>
                                            
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500 uppercase tracking-wide">Precio</span>
                                                    <span className="text-2xl font-bold text-black">
                                                        ${product.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                
                                                <button onClick={() => navigate(`/single-product/${product._id}`)} className="p-4 cursor-pointer rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-110 active:scale-95">
                                                    Ver Más
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            ))}
                        </div>
                    )}
                </>)}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center gap-2 mt-10">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentPage 
                                    ? 'w-8 bg-black shadow-md' 
                                    : 'w-2 bg-gray-300 hover:bg-gray-400 hover:w-4'
                            }`}
                            aria-label={`Ir a página ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}