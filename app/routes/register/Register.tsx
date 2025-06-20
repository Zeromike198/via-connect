import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import type { Route } from './+types/Register';

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  apellido: z.string().min(2, {
    message: 'El apellido debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor ingresa un correo electrónico válido.',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Registro | Via Connect' },
  ];
}
export default function Register() {
  //states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simular una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
    alert('¡Registro exitoso! Revisa la consola para ver los datos.');

    setIsLoading(false);
    form.reset();
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-xl'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-3xl font-bold text-center'>
            Crear cuenta
          </CardTitle>
          <CardDescription className='text-center'>
            Ingresa tus datos para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='nombre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          placeholder='Ingresa tu nombre'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='apellido'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input
                          placeholder='Ingresa tu apellido'
                          className='pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
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

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Crear cuenta'}
              </Button>
            </form>
          </Form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              ¿Ya tienes una cuenta?{' '}
              <a
                href='#'
                className='font-medium text-blue-600 hover:text-blue-500'
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
