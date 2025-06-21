import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LoaderCircle,
  ArrowLeft,
  LogIn,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { API_URL, USER_ID_KEY } from 'constants/constants';
import type { Route } from '../../+types/root';

const formSchema = z.object({
  email: z.string().email({
    message: 'Por favor ingresa un correo electrónico válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Incio de Sesión | Via Connect' }];
}

export default function LoginScreen() {
  const navigate = useNavigate();

  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const req = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const res: { response: string } = await req.json();
      if (!req.ok) throw new Error(res.response);

      localStorage.setItem(USER_ID_KEY, res.response);

      form.reset();
      navigate('/home');
    } catch (err: any) {
      console.log(err);
      toast.error(err.message, {
        cancel: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  //watch
  const watchValue = form.watch();

  //effects
  useEffect(() => {
    if (localStorage.getItem(USER_ID_KEY) !== null) navigate('/home');
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Toaster
        position='bottom-center'
        richColors
        closeButton
        visibleToasts={1}
      />

      <div className='absolute top-0 left-0 p-4'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='outline' onClick={() => navigate('/')}>
              <ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='left'>
            <p>Regresar</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Card className='w-full max-w-xl'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-3xl font-bold text-center'>
            Iniciar Sesión
          </CardTitle>
          <CardDescription className='text-center'>
            Ingresa tus datos para iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='gap-1'>
                      Correo electrónico
                      <span className='text-red-500 font-bold'>*</span>
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          type='email'
                          placeholder='correo@ejemplo.com'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='gap-1'>
                      Contraseña
                      <span className='text-red-500 font-bold'>*</span>
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Ingresa tu contraseña'
                          className='pl-10 pr-10'
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700'
                disabled={
                  isLoading ||
                  form.getFieldState('email').invalid ||
                  form.getFieldState('password').invalid ||
                  watchValue.email.length < 8 ||
                  watchValue.password.length < 5
                }
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className='w-4 h-4 animate-spin' /> Iniciando
                    sesión...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <LogIn />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              ¿No tienes una cuenta?{' '}
              <Button
                variant='link'
                onClick={() => navigate('/register')}
                className='font-medium text-blue-600 hover:text-blue-500 p-0'
              >
                Registrarse
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
