import { createBrowserRouter } from 'react-router-dom';
import GuestLayout from './components/Layout/Guest/GuestLayout.jsx';
import SignIn from './views/SignIn.jsx';
import GoogleAuth from './views/redirect/GoogleAuth.jsx';
import GithubAuth from './views/redirect/GithubAuth.jsx';

const router = createBrowserRouter([
  {
    path: 'nfc/signin',
    element: <GuestLayout />,
    children: [
      {
        path: '',
        element: <SignIn />,
      },
    ],
  },
  {
    path: 'auth/google',
    element: <GoogleAuth />,
  },
  {
    path: 'auth/github',
    element: <GithubAuth />,
  },
]);

export default router;
