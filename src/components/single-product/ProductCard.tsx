import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ProductCard() {
    const productId = useParams().id;
    const products = useSelector((state: any) => state.products?.products ?? []);
    const product = products.find((p: any) => p._id === productId || p.id === productId);
    const categories = useSelector((state: any) => state.categories?.categories ?? []);
    const category = categories.find((c: any) => c._id === product?.id_category || c.id === product?.id_category);
    const productSizes = useSelector((state: any) => state.productSize?.productSizes ?? []);
    const productSize = productSizes.find((ps: any) => ps.id_product === productId || ps.id === product?._id);

    if (!product) {
        return (
            <div className="h-[60vh] w-full flex items-center justify-center p-12">
                <p className="text-gray-500">Cargando producto o producto no encontrado...</p>
            </div>
        )
    }
    console.log(category);

    return (
        <>
            <div className="h-[80vh] w-full flex flex-col p-12 justify-center pt-12">
                <div className="ml-24 py-24 flex items-center gap-2 text-lg">
                    <Link to="/products" className="uppercase text-gray-400 cursor-pointer">PRODUCTOS</Link>
                    {category ? (
                        <>
                            <span className="uppercase text-gray-400">&gt;</span>
                            <span className="uppercase text-gray-400">{category.name}</span>
                        </>
                    ) : null}
                    {product ? (
                        <>
                            <span className="uppercase text-gray-400">&gt;</span>
                            <span className="uppercase text-black">{product.name}</span>
                        </>
                    ) : null}
                </div>
                <div className="flex flex-row h-full mt-12">
                    <div className="h-2/3 w-1/2 flex flex-row items-center justify-center px-12">
                        <img src={product?.url_image} alt={product?.name} className="h-full w-2/3 rounded-3xl" />
                    </div>
                    <div className="flex flex-col justify-start pt-18 items-start w-1/2 h-2/3 px-12">
                        <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
                        <p className="text-lg text-gray-700 mb-6">{product?.description}</p>
                        <p className="text-2xl font-semibold mb-6">${product?.price}</p>
                        {productSize ? (
                            <p className="text-md text-gray-600 mb-6">Tallas disponibles: {productSize.sizes.join(', ')}</p>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}