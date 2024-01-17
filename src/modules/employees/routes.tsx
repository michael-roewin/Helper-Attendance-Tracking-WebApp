import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeForm from './pages/EmployeeForm';

export const EmployeeRoutes = {
  path: 'employees',
  children: [
    {
      path: '',
      element: <EmployeeList />,
    },
    {
      path: ':employeeId/details',
      element: <EmployeeDetails />,
    },
    {
      path: 'new',
      element: <EmployeeForm />,
    },
    {
      path: ':employeeId/edit',
      element: <EmployeeForm />,
    },
  ],
};