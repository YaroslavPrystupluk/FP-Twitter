import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import {
  ActivatedPage,
  Layout,
  ProfileUser,
  Login,
  ErrorPage,
  Favorites,
  FeedPosts,
  Message,
  Notifications,
  Register,
  ChangePassword,
  EditProfileUser,
} from '../pages';
import ForgotPassword from '../pages/ForgotPassword';
import ProtectedRoute from '../hoc/ProtectedRoute';
import { FormEditPost } from '../components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <Navigate to="/posts" />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password/:email" element={<ChangePassword />} />
      <Route
        path="posts"
        element={
          <ProtectedRoute>
            <FeedPosts />
          </ProtectedRoute>
        }
      />
      <Route
        path="posts/update/:id"
        element={
          <ProtectedRoute>
            <FormEditPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="message"
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfileUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit-profile"
        element={
          <ProtectedRoute>
            <EditProfileUser />
          </ProtectedRoute>
        }
      />

      <Route path="activated" element={<ActivatedPage />} />
    </Route>,
  ),
);

export default router;
