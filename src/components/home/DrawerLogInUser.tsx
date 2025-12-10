import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from '@heroui/drawer';

import {
    useEffect,
    useState
} from 'react';

import {
    Form
} from '@heroui/form';

import {
    Input
} from '@heroui/input';

import {
    Button
} from '@heroui/button'; 

import { useDrawer } from '@/hooks/useDrawer';

import { useModal } from '@/hooks/useModal';

import { authService, authGoogleService } from '../../services/userService';
import { signInWithGoogle } from '@/firebase/oauth';

import ModalRegister from './ModalRegister';

export default function DrawerLogInUser() {
    const { onOpen: onOpenRegister } = useModal('registerModal');
    const { isOpen, onClose } = useDrawer('profile');

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);

    const [fieldsValid, setFieldValid] = useState<{
        email: boolean | null,
        password: boolean | null
    }>({
        email: null,
        password: null
    });

    const regex = [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
    ];
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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

    const svgGoogle = (
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <g fill="none" fill-rule="evenodd" clip-rule="evenodd"><path fill="#F44336" d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86" opacity=".987"/>
                <path fill="#FFC107" d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92" opacity=".997"/>
                <path fill="#448AFF" d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49" opacity=".999"/>
                <path fill="#43A047" d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z" opacity=".993"/>
            </g>
        </svg>
    )

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);


    const validateAllFields = async (e: React.FormEvent) => {
        const form = e.target as HTMLFormElement;
        e.preventDefault();

        const AllValid = Object.values(fieldsValid).every(Boolean);

        if (!AllValid) return;

        try {
            setLoading(true);
            const params = {
                email: formData.email.trim(),
                password: formData.password.trim(),
            }

            const result = await authService(params);
            
            console.log('Login exitoso:', result);

            setFormData({
                email: '',
                password: ''
            })
            form.reset();

            setFieldValid({
                email: null,
                password: null
            })
            
            onClose();
            
            window.location.reload();
        }
        catch (err) {
            console.error('Login error:', err);
        }
        finally {
            setLoading(false);
        }
    }

    const logInGoogle = async () => {
        try {
            setLoadingGoogle(true);
            const googleUser = await signInWithGoogle();
            console.log('Google sign-in success:', googleUser);
            await authGoogleService({ idToken: googleUser.idToken, email: googleUser.email, name: googleUser.name });
            onClose();
            window.location.reload();
        } catch (err) {
            console.error('Error during Google login:', err);
            alert((err as any)?.message || 'Error durante login con Google');
        } finally { setLoadingGoogle(false); }
    }

    return (
        <>
            <Drawer className='bg-black' size={mobile ? 'full' : '2xl'} isOpen={isOpen} onClose={() => {onClose();}} placement='right' backdrop='blur'>
                <DrawerContent>
                    <DrawerHeader>
                        <div className='flex flex-col w-full items-center mt-8 sm:mt-12 md:mt-16 gap-6 sm:gap-8 md:gap-12 px-4'>
                            <h1 className="tracking-wider text-white/80 text-2xl md:text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                                MDW
                            </h1>
                            <div className='flex flex-col gap-4 text-center'>
                                <p className='text-white text-xl sm:text-2xl md:text-3xl text-center'>
                                    Inicia sesión para continuar
                                </p>
                            </div>
                        </div>
                    </DrawerHeader>
                    <DrawerBody className='flex flex-col items-center px-4 sm:px-6 md:px-8'>
                        <Form onSubmit={validateAllFields} className='flex flex-col gap-6 sm:gap-7 md:gap-8 w-full sm:w-5/6 md:w-2/3 mt-8 sm:mt-10 md:mt-12'>
                            <Input 
                                classNames={{
                                    inputWrapper: "bg-black text-white border border-white/10 border-[2px] focus:outline-none",
                                    label: "text-sm sm:text-base"
                                }} 
                                variant='faded' 
                                isRequired 
                                label='Email'
                                isInvalid={fieldsValid.email === false}
                                onValueChange={(value) => {
                                    setFormData((prev) => ({ ...prev, email: value }));
                                    setFieldValid((prev) => ({ ...prev, email: regex[0].test(value) }));
                                }}
                                errorMessage='Ingresá un email válido. Debe incluir un nombre, un ‘@’ y un dominio (por ejemplo: usuario@correo.com' 
                            />
                            <Input 
                                classNames={{
                                    inputWrapper: "bg-black text-white border border-white/10 border-[2px] focus:outline-none",
                                    label: "text-sm sm:text-base"
                                }} 
                                variant='faded' 
                                isRequired
                                endContent={
                                    <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none text-white hover:text-gray-300 transition-colors text-xl flex items-center justify-center"
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
                                type={isVisiblePassword ? 'text' : 'password'}
                                isInvalid={fieldsValid.password === false}
                                onValueChange={(value) => {
                                    setFormData((prev) => ({ ...prev, password: value }));
                                    setFieldValid((prev) => ({ ...prev, password: regex[1].test(value) }));
                                }}
                                errorMessage='Ingresá una contraseña válida. Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número. Puede incluir caracteres especiales.' 
                            />
                            <div className='flex flex-col sm:flex-row justify-center w-full gap-4 sm:gap-6 md:gap-8 mt-4'>
                                <Button isLoading={loading} type='submit' className='w-full sm:w-1/2 md:w-1/3' variant='ghost' color='primary'>
                                    Enviar
                                </Button>
                                <Button type='reset' onPress={() => {onOpenRegister(); onClose()}} className='w-full sm:w-1/2 md:w-1/3' color='default' variant='solid'>
                                    Registrarse
                                </Button>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-center w-full gap-4 sm:gap-6 md:gap-8 mt-4'>
                                <Button startContent={svgGoogle} isLoading={loadingGoogle} onPress={logInGoogle} className='w-full p-6 bg-white sm:w-1/2 md:w-4/5' variant='solid' color='default'>
                                    Iniciar sesión con Google
                                </Button>
                            </div>
                        </Form>
                    </DrawerBody>
                    <DrawerFooter className='px-4 sm:px-6'>
                        <Button color='danger' variant='light' onPress={() => {onClose()}}>
                            Cerrar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <ModalRegister />
        </>
        
    )
}