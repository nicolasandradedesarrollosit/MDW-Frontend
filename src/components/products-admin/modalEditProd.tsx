import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

import { Select, SelectItem } from "@heroui/select";

import { useState, useEffect } from "react";

import { useModal } from "@/hooks/useModal";

import { useSelector } from "react-redux";

import {RootState} from "@/redux/store";

import {Form} from "@heroui/form";

import { Input } from "@heroui/input";

import { Button } from "@heroui/button";

import {updateProduct} from "@/services/productService";

import { setFetched } from '@/redux/products/sliceProducts';

import { useDispatch } from 'react-redux';

import { uploadFile } from "@/supabase-storage/storage";

export default function ModalEditProd({ id }: { id?: string | null }) {
    const categoriesState = useSelector((state: RootState) => state.categories);
    const productState = useSelector((state: RootState) => state.products);

    const productPatch = productState.products.find((p: any) => (p._id ?? p.id) === id);
    const { isOpen, onOpenChange } = useModal('editProdModal');
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({ 
        name: '',
        description: '',
        price: 0,
        url_image: '',
        id_category: ''
    });

    useEffect(() => {
        if (isOpen && productPatch) {
            setFormData({
                name: productPatch.name || '',
                description: productPatch.description || '',
                price: productPatch.price || 0,
                url_image: productPatch.url_image || '',
                id_category: productPatch.id_category || ''
            });
        }
    }, [isOpen, productPatch]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFile = e.target.files?.[0];
        if (uploadFile) {
            setFile(uploadFile);
        }
    };

    const handleUpload = async () => {
        try {
            if (!file) return console.error('No file selected for upload');
            const publicUrl = await uploadFile(file);
            if (publicUrl) {
                setFormData((prev) => ({ ...prev, url_image: publicUrl }));
            }
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const editProduct = async (closeModal: () => void) => {
        try {
            setIsLoading(true);
            const params = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                url_image: formData.url_image,
                id_category: formData.id_category,
            }
            if (!params.id_category || typeof params.id_category !== 'string') {
                console.warn('createProduct - id_category is invalid:', params.id_category);
            }
            const objectIdRegex = /^[a-f\d]{24}$/i;
            if (params.id_category && !objectIdRegex.test(params.id_category)) {
                console.warn('createProduct - id_category does not match ObjectId format:', params.id_category);
            }

            console.debug('ModalEditProd - calling updateProduct', { id, params, productPatch });
            if (!id) throw new Error('ModalEditProd - id is required to edit product');
            await updateProduct(id, params);

            setFormData({
                name: '',
                description: '',
                price: 0,
                url_image: '',
                id_category: ''
            });

            setFile(null);

            closeModal();
            try { dispatch(setFetched(false)); } catch (e) { /** noop */ }
        }
        catch (err) {
            console.error('Error en el registro:', err);
            try {
                const msg = (err as any)?.message || 'Error al editar producto';
                const body = (err as any)?.body || '';
                alert(`${msg}${body ? '\n' + String(body).slice(0, 100) : ''}`);
            } catch (e) {
                // noop
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        size={`${isMobile ? 'full' : '3xl'}`} 
        placement={isMobile ? "center" : "top"}
        backdrop="blur"
        scrollBehavior="inside"
        disableAnimation
        classNames={{
          body: "py-6 sm:py-8 px-4 sm:px-6 flex flex-col items-center justify-start",
          base: "bg-black text-white max-h-[95vh]",
          header: "text-center pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6",
          footer: "border-t-[1px] border-[#292f46] py-4 sm:py-5 px-4 sm:px-6",
          closeButton: "hover:bg-white/5 active:bg-white/10 top-2 right-2 sm:top-3 sm:right-3",
        }} 
        >
        <ModalContent> 
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col w-full items-center gap-4 sm:gap-5">
                <h1 className="tracking-wider text-white/90 text-xl sm:text-2xl md:text-3xl font-bold">
                    MDW
                </h1>
                <p className='text-white/80 text-sm sm:text-base md:text-lg text-center px-2'>
                    Editar Producto
                </p>
              </ModalHeader>
              <ModalBody>
                <Form className='flex flex-col gap-5 sm:gap-6 w-full max-w-md'>
                    <Input
                        defaultValue={formData.name} 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors rounded-xl",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Nombre de Producto'
                        placeholder="Remera Negra"
                        value={formData.name}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                        errorMessage='El nombre es obligatorio' 
                    />
                    <Input
                        defaultValue={formData.description} 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors rounded-xl",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Descripción'
                        placeholder="Algo de descripción"
                        value={formData.description}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
                        errorMessage='La descripción es obligatoria'
                    />
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors rounded-xl",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Precio'
                        placeholder="100"
                        type="number"
                        value={formData.price.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, price: parseInt(value) || 0 }))}
                        errorMessage='El precio es obligatorio' 
                    />

                    <div>
                        {formData.url_image && (
                            <img 
                                src={formData.url_image}
                                alt="Imagen del Producto"
                                className="w-full h-24 sm:h-30 md:h-48 object-cover rounded-lg mb-2"
                            />
                        )}
                    </div>
                    
                    <div className="relative w-full">
                        <div className="relative bg-black border border-white/20 hover:border-white/40 focus-within:border-white/60 transition-colors rounded-xl px-3 pt-5 pb-2 cursor-pointer group">
                            <label className="absolute top-1.5 left-3 text-xs text-white/70 font-medium pointer-events-none">
                                Imagen del Producto
                            </label>
                            <input
                                defaultValue={formData.url_image} 
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className={file ? 'text-white' : 'text-white/50'}>
                                    {file ? file.name : 'Seleccionar archivo'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-4 items-center">
                        <Button variant="solid" color="primary" onPress={handleUpload}>Subir Imagen</Button>
                        <span className="text-xs">{file ? `Archivo leído: ${file ? file.name : ''}` : ''}</span>
                    </div>
                    
                    <Select
                        label="Categoría"
                        placeholder="Selecciona una categoría"
                        variant='bordered'
                        isRequired
                        selectedKeys={formData.id_category ? [formData.id_category] : []}
                        onSelectionChange={(keys) => {
                            console.log('Selected category keys:', keys);
                            const selectedKey = Array.from(keys)[0];
                            setFormData((prev) => ({ ...prev, id_category: String(selectedKey) }));
                        }}
                        classNames={{
                            base: "w-full",
                            label: "text-xs sm:text-sm text-white/70 font-medium",
                            trigger: "bg-black hover:border-white/40 data-[hover=true]:bg-black/80 data-[open=true]:border-white/60 transition-all duration-200 rounded-xl min-h-[56px]",
                            innerWrapper: "text-white",
                            selectorIcon: "text-white/70",
                            value: "text-sm sm:text-base !text-white",
                            listboxWrapper: "max-h-[240px]",
                            listbox: "bg-black",
                            popoverContent: "bg-black shadow-xl shadow-black/50 rounded-xl",
                            errorMessage: "text-xs text-red-400"
                        }}
                        errorMessage={formData.id_category === '' ? "La categoría es obligatoria" : undefined}
                        popoverProps={{
                            offset: 10,
                        }}
                        scrollShadowProps={{
                            hideScrollBar: true
                        }}
                    >
                        {categoriesState.categories && categoriesState.categories.length > 0 ? (
                            categoriesState.categories.map((category: any, idx: number) => (
                                <SelectItem
                                    key={category.id ?? category._id ?? `category-${idx}`}
                                    classNames={{
                                        base: "text-white",
                                    }}
                                >
                                    {category.name}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem key="no-categories">
                                No hay categorías disponibles
                            </SelectItem>
                        )}
                    </Select>
                        
                </Form>
              </ModalBody>
              <ModalFooter className="flex flex-row gap-2 sm:gap-3">
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                  Cerrar
                </Button>
                <Button 
                  isLoading={isLoading} 
                  color="primary" 
                  onPress={() => editProduct(onClose)}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                    Editar Producto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}