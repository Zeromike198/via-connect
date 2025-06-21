import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/', 'LandingScreen.tsx'),
  route('/register', 'routes/register/RegisterScreen.tsx'),
  route('/login', 'routes/login/LoginScreen.tsx'),

  //home routes
  route('/home', 'routes/home/HomeScreen.tsx'),
  route('/profile', 'routes/profile/ProfileScreen.tsx'),
] satisfies RouteConfig;
