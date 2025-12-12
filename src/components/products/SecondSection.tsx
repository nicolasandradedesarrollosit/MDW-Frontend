import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {RootState} from "@/redux/store"
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";

export default function SecondSection() {
    const productsState = useSelector((state: RootState) => state.products);

    const navigate = useNavigate();

    useEffect(() => {
        console.log('SecondSection - productsState:', productsState);
    }, [productsState]);    
    
    return (
        <section className="flex flex-col items-center h-auto w-full px-4 py-8 md:py-12 lg:py-24">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {productsState.products.map((item, index) => (
                        <Card 
                            classNames={{
                                base: "w-full h-auto bg-white border border-gray-200"
                            }} 
                            key={index} 
                            isFooterBlurred 
                            isPressable 
                            shadow="sm" 
                            onPress={() => navigate(`/single-product/${item._id}`)}
                        >
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    alt={item.name}
                                    className="block w-full h-48 sm:h-56 md:h-64 object-cover"
                                    radius="none"
                                    shadow="none"
                                    width="100%"
                                    src={item.url_image}
                                />
                            </CardBody>
                            <CardFooter className="flex-col items-start gap-2 p-4 bg-white/95 backdrop-blur-sm">
                                <div className="flex flex-col w-full gap-1">
                                    <p className="text-sm md:text-base font-semibold text-black line-clamp-2">{item.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-center w-full mt-2">
                                    <p className="text-lg md:text-xl font-bold text-black">${item.price?.toLocaleString()}<span className="text-sm ml-1 text-gray-500">ARS</span></p>
                                    <Button onPress={() => {
                                        navigate(`/single-product/${item._id}`);
                                    }} size="sm" className="bg-black text-white">Ver Más</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}