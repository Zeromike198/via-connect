import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // index("routes/home.tsx"),
  route('/', 'Landing.tsx'),
  route('/register', 'routes/register/Register.tsx'),
  // route('/login', 'Landing.tsx'),
  route('/home', 'routes/home/Home.tsx'),
] satisfies RouteConfig;
