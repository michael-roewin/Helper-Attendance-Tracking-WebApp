import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import UserForm from './pages/UserForm';

export const UserRoutes = {
  path: 'users',
  children: [
    {
      path: '',
      element: <UserList />,
    },
    {
      path: ':userId/details',
      element: <UserDetails />,
    },
    {
      path: 'new',
      element: <UserForm />,
    },
    {
      path: ':userId/edit',
      element: <UserForm />,
    },
  ],
};