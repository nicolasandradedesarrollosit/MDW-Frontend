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

import { authService } from '../../services/authService';

export default function DrawerLogInUser() {
    const { isOpen, onClose } = useDrawer();

    const [mobile, setMobile] = useState(false);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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



    return (
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
                            label='Contraseña'
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
                            <Button type='reset' className='w-full sm:w-1/2 md:w-1/3' color='default'>
                                Restablecer
                            </Button>
                        </div>
                    </Form>
                </DrawerBody>
                <DrawerFooter className='px-4 sm:px-6'>
                    <Button color='danger' variant='light' onPress={() => {onClose();}}>
                        Cerrar
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}