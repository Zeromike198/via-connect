import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Skeleton } from '~/components/ui/skeleton';
import { API_URL, USER_ID_KEY } from 'constants/constants';
import type { IUserProfile } from 'entities/user.entity';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { LogOut, UserRound } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

export default function HomeHeader() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleCloseSession = () => {
    localStorage.removeItem(USER_ID_KEY);
    navigate('/');
  };

  //effects
  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <header className='px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
      <Link className='flex items-center justify-center' to={'/home'}>
        <img src='/favicon.png' className='w-8 h-8' />
        <span className='ml-1 text-md font-bold text-gray-900'>
          Via Connect
        </span>
      </Link>

      <nav className='flex gap-2'>
        <Button
          className={`${
            location.pathname === '/profile' ? 'bg-blue-600' : ' bg-blue-500'
          } hover:bg-blue-600 transition-colors`}
          onClick={() => navigate('/profile')}
        >
          Perfil
        </Button>
      </nav>
      <div className='flex gap-3 items-center'>
        {loading || user === undefined ? (
          <>
            <Skeleton className='h-5 w-24 bg-gray-400 rounded-full' />
            <Skeleton className='h-8 w-8 rounded-full bg-gray-400' />
          </>
        ) : (
          <>
            <Badge variant='default' className='font-semibold bg-blue-600'>
              {user.role === 'passenger' ? 'Pasajero' : 'Chofer'}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>NF</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-42 mx-5'>
                <DropdownMenuLabel>
                  <span className='font-semibold'>Opciones</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`${
                    location.pathname === '/profile' ? 'bg-gray-100' : ''
                  } justify-between cursor-pointer`}
                  onClick={() => navigate('/profile')}
                >
                  <span className='font-medium'>Perfil</span> <UserRound />
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='justify-between cursor-pointer'
                  onClick={handleCloseSession}
                >
                  <span className='font-medium text-destructive'>
                    Cerrar Sesión
                  </span>{' '}
                  <LogOut className='text-destructive' />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
}
