import { useEffect } from 'react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { API_URL } from '~/constants/constants';

export default function HomeHeader() {
  const handleGetUser = async () => {
    try {
      const req = await fetch(`${API_URL}/user`);
    } catch (err) {
      console.log(err);
    }
  };

  //effects
  useEffect(() => {}, []);

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

        <Avatar className='cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
