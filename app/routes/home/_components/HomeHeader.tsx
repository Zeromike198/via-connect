import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { API_URL, USER_ID_KEY } from 'constants/constants';
import type { IUserProfile } from 'entities/user.entity';
import { toast } from 'sonner';

export default function HomeHeader() {
  //states
  const [user, setUser] = useState<IUserProfile | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  //functions
  const handleGetUser = async () => {
    try {
      setLoading(true);
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

      setUser(res.user);
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
    <header className='px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
      <Link className='flex items-center justify-center' to={'/home'}>
        <img src='/favicon.png' className='w-8 h-8' />
        <span className='ml-1 text-md font-bold text-gray-900'>
          Via Connect
        </span>
      </Link>
      <nav className='ml-auto hidden md:flex gap-6'>
        <Link
          className='text-sm font-medium hover:text-blue-600 transition-colors'
          to='#features'
        >
          Características
        </Link>
        <Link
          className='text-sm font-medium hover:text-blue-600 transition-colors'
          to='#testimonials'
        >
          Testimonios
        </Link>
      </nav>
      <div className='ml-4 flex gap-2'>
        <Button variant='ghost' size='sm'>
          Iniciar Sesión
        </Button>

        {loading || user === undefined ? (
          <Skeleton className='h-8 w-8 rounded-full bg-gray-400' />
        ) : (
          <Avatar className='cursor-pointer'>
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
