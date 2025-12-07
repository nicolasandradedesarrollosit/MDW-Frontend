import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";

import { useState, useEffect } from "react";

import { useModal } from "@/hooks/useModal";

import {Form} from "@heroui/form";

import { Input } from "@heroui/input";

import { Button } from "@heroui/button";

import {registerService} from "@/services/userService";

export default function ModalRegister() {
    const { isOpen, onOpenChange } = useModal('registerModal');

    const [isMobile, setIsMobile] = useState(false);
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const svg1 = (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            >
            <path
                d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                fill="currentColor"
            />
            <path
                d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                fill="currentColor"
            />
            <path
                d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                fill="currentColor"
            />
            <path
                d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                fill="currentColor"
            />
            <path
                d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                fill="currentColor"
            />
        </svg>
    )

    const svg2 = (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            >
            <path
                d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                fill="currentColor"
            />
            <path
                d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                fill="currentColor"
            />
        </svg>
    )

    const [fieldsValid, setFieldValid] = useState<{
        email: boolean | null,
        name: boolean | null,
        lastName: boolean | null,
        age: boolean | null,
        password: boolean | null

    }>({
        email: null,
        name: null,
        lastName: null,
        age: null,
        password: null

    });

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        lastName: '',
        age: '',
        password: ''
    });

    const regex = [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        /^[A-Za-zÀ-ÿ\s'-]{2,}$/,
        /^(?:1[01][0-9]|120|[1-9][0-9]?)$/,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
    ]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

    const validateAllFields = async (closeModal: () => void) => {
        console.log('validateAllFields called');
        console.log('fieldsValid:', fieldsValid);
        
        const AllValid = Object.values(fieldsValid).every(Boolean);
        
        console.log('AllValid:', AllValid);

        if (!AllValid) {
            console.log('Validación falló, campos inválidos');
            return;
        }

        try {
            setIsLoading(true);
            const params = {
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                age: parseInt(formData.age, 10),
                password: formData.password
            }

            console.log('Llamando a registerService con:', params);
            const result = await registerService(params);

            console.log('Registro exitoso:', result);

            setFormData({
                email: '',
                name: '',
                lastName: '',
                age: '',
                password: ''
            });

            setFieldValid({
                email: null,
                name: null,
                lastName: null,
                age: null,
                password: null
            });

            closeModal();
        }
        catch (err) {
            console.error('Error en el registro:', err);
        }
        finally {
            setIsLoading(false);
            window.location.reload();
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
                    Registrarse como nuevo usuario
                </p>
              </ModalHeader>
              <ModalBody>
                <Form className='flex flex-col gap-5 sm:gap-6 w-full max-w-md'>
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Email'
                        placeholder="tu@email.com"
                        isInvalid={fieldsValid.email === false}
                        onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, email: value }));
                            setFieldValid((prev) => ({ ...prev, email: regex[0].test(value) }));
                        }}
                        errorMessage='Email inválido (ej: usuario@correo.com)' 
                    />
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Nombre'
                        placeholder="Juan"
                        isInvalid={fieldsValid.name === false}
                        onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, name: value }));
                            setFieldValid((prev) => ({ ...prev, name: regex[1].test(value) }));
                        }}
                        errorMessage='Solo letras y espacios (mín. 2 caracteres)' 
                    />
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired 
                        label='Apellido'
                        placeholder="Pérez"
                        isInvalid={fieldsValid.lastName === false}
                        onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, lastName: value }));
                            setFieldValid((prev) => ({ ...prev, lastName: regex[1].test(value) }));
                        }}
                        errorMessage='Solo letras y espacios (mín. 2 caracteres)' 
                    />
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }}
                        type="number" 
                        variant='bordered' 
                        isRequired 
                        label='Edad'
                        placeholder="25"
                        isInvalid={fieldsValid.age === false}
                        onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, age: value }));
                            setFieldValid((prev) => ({ ...prev, age: regex[2].test(value) }));
                        }}
                        errorMessage='Número entre 1 y 120' 
                    />
                    <Input 
                        classNames={{
                            inputWrapper: "bg-black text-white border border-white/20 hover:border-white/40 focus:border-white/60 transition-colors",
                            label: "text-xs sm:text-sm text-white/70",
                            input: "text-sm sm:text-base"
                        }} 
                        variant='bordered' 
                        isRequired
                        endContent={
                            <button
                            aria-label="toggle password visibility"
                            className="focus:outline-none text-white/70 hover:text-white transition-colors text-lg sm:text-xl flex items-center justify-center"
                            type="button"
                            onClick={toggleVisibility}
                            >
                            {isVisiblePassword ? (
                                svg1
                            ) : (
                                svg2
                            )}
                            </button>
                        } 
                        label='Contraseña'
                        placeholder="••••••••"
                        type={isVisiblePassword ? 'text' : 'password'}
                        isInvalid={fieldsValid.password === false}
                        onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, password: value }));
                            setFieldValid((prev) => ({ ...prev, password: regex[3].test(value) }));
                        }}
                        errorMessage='Mín. 8 caracteres, 1 mayúscula, 1 minúscula y 1 número' 
                    />
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
                  onPress={() => validateAllFields(onClose)}
                  className="text-sm sm:text-base"
                  size={isMobile ? "md" : "lg"}
                >
                  Registrarse
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}