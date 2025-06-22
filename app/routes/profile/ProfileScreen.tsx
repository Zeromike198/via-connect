import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import HomeHeader from '../../components/HomeHeader';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Loader, RotateCcw } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useEffect, useState } from 'react';
import type { IUserProfile } from 'entities/user.entity';
import { API_URL, USER_ID_KEY } from 'constants/constants';
import { Skeleton } from '~/components/ui/skeleton';

type FormProfile = {
  name: string;
  lastName: string;
  email: string;
  image: string;
};

export default function ProfileScreen() {
  const { register, handleSubmit, watch, setValue } = useForm<FormProfile>();

  //states
  const [getUserLoading, setGetUserLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //functions
  const handleGetUser = async () => {
    try {
      setGetUserLoading(true);
      const userID = localStorage.getItem(USER_ID_KEY);
      if (userID === null) return;

      const req = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
          Authorization: userID,
        },
      });

      const res: { response?: string; user?: IUserProfile } = await req.json();

      if (!req.ok) throw new Error(res.response!!);

      if (res.user !== undefined) {
        const { name, lastName, email, image } = res.user;

        setValue('name', name);
        setValue('lastName', lastName);
        setValue('email', email);
        setValue('image', image);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setGetUserLoading(false);
    }
  };

  const handleRandomImage = async () => {
    try {
      setLoadingImage(true);
      const randomImage = await fetch('https://picsum.photos/200/300');
      setValue('image', randomImage.url);
    } catch (err) {
      console.log(err);
      toast.error('Ha ocurrido un error.');
    } finally {
      setLoadingImage(false);
    }
  };

  const onSubmit: SubmitHandler<FormProfile> = async (data) => {
    try {
      const userID = localStorage.getItem(USER_ID_KEY);
      if (userID === null) return;
      setLoading(true);

      const req = await fetch(`${API_URL}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: userID,
        },
        body: JSON.stringify(data),
      });

      const res: { response: string } = await req.json();

      if (!req.ok) throw new Error(res.response);

      toast.success('¡Perfil actualizado exitosamente!');
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  //effects
  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <main className='min-h-screen flex flex-col'>
      <Toaster
        richColors
        closeButton
        position='bottom-center'
        visibleToasts={1}
      />
      <HomeHeader />

      <section className='w-full flex justify-center mt-20'>
        {getUserLoading ? (
          <Skeleton className='w-full max-w-lg h-[450px] rounded-lg bg-gray-300' />
        ) : (
          <Card className='w-full max-w-lg'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>Editar Perfil</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* image */}
                <div className='flex justify-center my-1 relative mx-auto w-32'>
                  <Dialog>
                    <DialogTrigger asChild type='button'>
                      {loadingImage ? (
                        <div className='w-28 h-28 rounded-full bg-gray-200 flex justify-center items-center border-2 border-blue-200'>
                          <Loader className='animate-spin h-8 w-8' />{' '}
                        </div>
                      ) : (
                        <img
                          src={watch('image')}
                          alt='user image'
                          className='w-28 h-28 rounded-full object-cover border-2 border-blue-400 cursor-pointer'
                        />
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Imagen de Perfil</DialogTitle>
                      </DialogHeader>
                      <img
                        src={watch('image')}
                        className='rounded-lg w-full h-[400px] object-fill border-2 border-blue-400'
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    className='absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 rounded-full'
                    size='icon'
                    onClick={handleRandomImage}
                  >
                    <RotateCcw />
                  </Button>
                </div>

                <div className='flex flex-col gap-6'>
                  {/* Name */}
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Nombre</Label>
                    <Input
                      id='name'
                      type='name'
                      placeholder='correo@ejemplo.com'
                      {...register('name', {
                        required: true,
                      })}
                    />
                  </div>

                  {/* LastName */}
                  <div className='grid gap-2'>
                    <Label htmlFor='lastName'>Apellido</Label>
                    <Input
                      id='lastName'
                      type='lastName'
                      placeholder='correo@ejemplo.com'
                      {...register('lastName', {
                        required: true,
                      })}
                    />
                  </div>

                  {/* Email */}
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Correo Electrónico</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='correo@ejemplo.com'
                      {...register('email', {
                        required: true,
                      })}
                    />
                  </div>
                </div>

                <Button
                  type='submit'
                  className='w-full mt-5 bg-blue-500 hover:bg-blue-600'
                >
                  Actualizar Perfil
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
