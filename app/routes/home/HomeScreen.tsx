import { Toaster } from 'sonner';
import HomeHeader from './_components/HomeHeader';

export default function HomeScreen() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Toaster richColors closeButton />
      <HomeHeader />
    </main>
  );
}
