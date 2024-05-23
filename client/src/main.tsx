import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store.ts';
import router from './routes/routes.tsx';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <CssBaseline />
    <RouterProvider router={router} />
    <ToastContainer theme="colored" position="bottom-left" autoClose={3000} />
  </Provider>,
);
