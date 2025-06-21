import { Toaster } from 'sonner';
import HomeHeader from './_components/HomeHeader';
import { useEffect } from 'react';
import { USER_ID_KEY } from 'constants/constants';
import { useNavigate } from 'react-router';

export default function HomeScreen() {
  const navigate = useNavigate();
  //effects
  useEffect(() => {
    if (localStorage.getItem(USER_ID_KEY) === null) navigate('/');
  }, []);

  return (
    <main className='flex flex-col min-h-screen'>
      <Toaster richColors closeButton />
      <HomeHeader />
    </main>
  );
}
