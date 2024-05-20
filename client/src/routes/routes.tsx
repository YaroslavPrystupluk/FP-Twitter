import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout } from '../pages';
import {
  Auth,
  ErrorPage,
  Favorites,
  FeedPosts,
  Home,
  Message,
  NotFound,
  Notifications,
  Register,
} from '../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="register" element={<Register />} />
      <Route path="posts" element={<FeedPosts />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="message" element={<Message />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
