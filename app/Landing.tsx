import { Car, Users, Clock, Shield, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import type { Route } from './+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Via Connect' },
    { name: 'description', content: 'Welcome to Via Connect' },
  ];
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
        <Link className='flex items-center justify-center' to={'/'}>
          <img src='/favicon.png' className='w-12 h-12' />
          <span className='ml-2 text-2xl font-bold text-gray-900'>
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
          <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
            Registrarse
          </Button>
        </div>
      </header>

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <Badge className='bg-blue-200 text-blue-800'>
                    🚀 Transporte del Futuro
                  </Badge>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900'>
                    Conecta tu comunidad a través del{' '}
                    <span className='text-blue-600'>transporte compartido</span>
                  </h1>
                  <p className='max-w-[600px] text-gray-600 md:text-xl'>
                    Via Connect revoluciona el transporte comunitario. Comparte
                    viajes, reduce costos, y fortalece los lazos de tu
                    comunidad.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700'
                    onClick={() => navigate('/register')}
                  >
                    Registrarse
                  </Button>
                  <Button variant='outline' size='lg'>
                    Iniciar sesión
                  </Button>
                </div>
                <div className='flex items-center gap-4 text-sm text-gray-600'>
                  <div className='flex items-center gap-1'>
                    <Users className='h-4 w-4' />
                    <span>+10,000 usuarios</span>
                  </div>
                  {/* <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span>4.9/5 estrellas</span>
                  </div> */}
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {/* <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="Via Connect App"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className='w-full py-12 md:py-24 lg:py-32'>
          <div className=' px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge variant='secondary'>Características</Badge>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  ¿Por qué elegir Via Connect?
                </h2>
                <p className='max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Descubre cómo Via Connect está transformando la manera en que
                  las comunidades se transportan.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              <div className='grid gap-6'>
                <Card className='p-6 hover:shadow-lg transition-shadow'>
                  <CardContent className='flex items-start gap-4 p-0'>
                    <div className='flex h-12 w-16 items-center justify-center rounded-md bg-blue-100'>
                      <Users className='h-6 w-6 text-blue-600' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-bold'>Comunidad Conectada</h3>
                      <p className='text-gray-600'>
                        Conecta con vecinos y compañeros de trabajo para
                        compartir viajes regulares y crear vínculos más fuertes.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className='p-6 hover:shadow-lg transition-shadow'>
                  <CardContent className='flex items-start gap-4 p-0'>
                    <div className='flex h-12 w-16 items-center justify-center rounded-md bg-purple-100'>
                      <Clock className='h-6 w-6 text-purple-600' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-bold'>Horarios Flexibles</h3>
                      <p className='text-gray-600'>
                        Encuentra viajes que se adapten a tu horario o crea tus
                        propias rutas personalizadas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='grid gap-6'>
                <Card className='p-6 hover:shadow-lg transition-shadow'>
                  <CardContent className='flex items-start gap-4 p-0'>
                    <div className='flex h-12 w-16 items-center justify-center rounded-lg bg-red-100'>
                      <Shield className='h-6 w-6 text-red-600' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-bold'>
                        Seguridad Garantizada
                      </h3>
                      <p className='text-gray-600'>
                        Verificación de usuarios, seguimiento en tiempo real y
                        sistema de calificaciones para tu tranquilidad.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className='p-6 hover:shadow-lg transition-shadow'>
                  <CardContent className='flex items-start gap-4 p-0'>
                    <div className='flex h-12 w-16 items-center justify-center rounded-lg bg-yellow-100'>
                      <Car className='h-6 w-6 text-yellow-600' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-bold'>Ahorro Económico</h3>
                      <p className='text-gray-600'>
                        Reduce significativamente tus gastos de transporte
                        compartiendo los costos del viaje.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {/* <section id='pricing' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <Badge variant='secondary'>Planes</Badge>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Elige el plan perfecto para ti
                </h2>
                <p className='max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Opciones flexibles para usuarios individuales y comunidades
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3'>
              <Card className='p-6 border-2'>
                <CardContent className='space-y-4 p-0'>
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold'>Básico</h3>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-bold'>Gratis</span>
                    </div>
                    <p className='text-gray-600'>Perfecto para comenzar</p>
                  </div>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Hasta 5 viajes por mes</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Búsqueda básica de rutas</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Chat con conductores</span>
                    </li>
                  </ul>
                  <Button className='w-full' variant='outline'>
                    Comenzar Gratis
                  </Button>
                </CardContent>
              </Card>
              <Card className='p-6 border-2 border-blue-600 relative'>
                <Badge className='absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600'>
                  Más Popular
                </Badge>
                <CardContent className='space-y-4 p-0'>
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold'>Premium</h3>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-bold'>$9.99</span>
                      <span className='text-gray-600'>/mes</span>
                    </div>
                    <p className='text-gray-600'>Para usuarios frecuentes</p>
                  </div>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Viajes ilimitados</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Rutas optimizadas con IA</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Soporte prioritario</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Estadísticas detalladas</span>
                    </li>
                  </ul>
                  <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                    Elegir Premium
                  </Button>
                </CardContent>
              </Card>
              <Card className='p-6 border-2'>
                <CardContent className='space-y-4 p-0'>
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold'>Comunidad</h3>
                    <div className='flex items-baseline gap-1'>
                      <span className='text-3xl font-bold'>$29.99</span>
                      <span className='text-gray-600'>/mes</span>
                    </div>
                    <p className='text-gray-600'>Para organizaciones</p>
                  </div>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Hasta 100 usuarios</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Panel de administración</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Reportes avanzados</span>
                    </li>
                    <li className='flex items-center gap-2'>
                      <Check className='h-4 w-4 text-green-600' />
                      <span className='text-sm'>Integración personalizada</span>
                    </li>
                  </ul>
                  <Button className='w-full' variant='outline'>
                    Contactar Ventas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Final CTA Section */}
        {/* <section className='w-full py-12 md:py-24 lg:py-32 bg-blue-600'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-white'>
                  ¿Listo para transformar tu forma de viajar?
                </h2>
                <p className='max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Únete a miles de usuarios que ya están disfrutando de un
                  transporte más inteligente, económico y sostenible.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Button
                  size='lg'
                  className='bg-white text-blue-600 hover:bg-gray-100'
                >
                  Descargar App
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-white hover:text-blue-600'
                >
                  Ver Demo
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className='flex flex-col gap-2 py-6 w-full items-center justify-center px-4 md:px-6 border-t bg-gray-50'>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className='flex items-center gap-1'>
            <img src='/favicon.png' className='w-12 h-12' />
            <span className='text-lg font-bold'>Via Connect</span>
          </div>
          <p className='text-sm text-gray-600'>
            Conectando comunidades a través del transporte compartido
            inteligente.
          </p>
        </div>
        <div className='flex'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-xs text-gray-600'>
              © {new Date().getFullYear()} Via Connect. Todos los derechos
              reservados.
            </p>
            <nav className='flex gap-4 text-xs'>
              <Link to='#' className='text-gray-600 hover:text-blue-600'>
                Términos de Servicio
              </Link>
              <Link to='#' className='text-gray-600 hover:text-blue-600'>
                Política de Privacidad
              </Link>
              <Link to='#' className='text-gray-600 hover:text-blue-600'>
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
