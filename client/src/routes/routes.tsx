import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout } from '../pages';
import {
  Login,
  ErrorPage,
  Favorites,
  FeedPosts,
  Home,
  Message,
  Notifications,
  Register,
} from '../pages';
import ForgotPassword from '../pages/ForgotPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="posts" element={<FeedPosts />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="message" element={<Message />} />
    </Route>,
  ),
);

export default router;
