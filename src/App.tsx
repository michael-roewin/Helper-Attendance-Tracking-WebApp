import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss'
import Home from './pages/Home';
import About from './pages/About';
import { AuthRoutes } from './modules/auth/routes';
import { UserRoutes } from './modules/users/routes';
import { EmployeeRoutes } from './modules/employees/routes';
import AppLayout from './layouts/AppLayout';
import { AppContext } from './app-context';
import { useState } from 'react';
import { AppState } from './interfaces/app-state';
import AuthWrapper from './components/AuthWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      AuthRoutes,
      {
        Component: AuthWrapper,
        children: [
          {
            Component: AppLayout,
            children: [
              {
                path: '',
                element: <Home />
              },
              {
                path: 'about',
                element: <About />
              },
              UserRoutes,
              EmployeeRoutes,
            ]
          }
        ]
      },
    ],
  },
]);

export default function App() {
  const [appState, setAppState] = useState({
    user: undefined,
    userLoaded: false,
  } as AppState);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </AppContext.Provider>
  );
}
