import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // index("routes/home.tsx"),
  route('/', 'LandingScreen.tsx'),
  route('/register', 'routes/register/RegisterScreen.tsx'),
  route('/login', 'routes/login/LoginScreen.tsx'),
  route('/home', 'routes/home/HomeScreen.tsx'),
] satisfies RouteConfig;
