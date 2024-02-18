import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss'
import Home from './pages/Home';
import About from './pages/About';
import { AuthRoutes } from './modules/auth/routes';
import { UserRoutes } from './modules/users/user-routes';
import { EmployeeRoutes } from './modules/employees/employee-routes';
import AppLayout from './layouts/AppLayout';
import { AppContext } from './app-context';
import { useEffect, useState } from 'react';
import { AppState } from './interfaces/app-state';
import AuthWrapper from './components/AuthWrapper';
import { notification } from 'antd';

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
    notification: undefined,
  } as AppState);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (appState.notification) {
      api.open(appState.notification);
    }
  }, [appState?.notification])

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      { contextHolder }
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </AppContext.Provider>
  );
}
