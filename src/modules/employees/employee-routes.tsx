import EmployeeList from './pages/EmployeeList';
import EmployeeProfile from './pages/EmployeeProfile';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeProfileWrapper from './pages/EmployeeProfileWrapper';
import EmployeeAbsenceList from './pages/EmployeeAbsenceList';
import EmployeeAbsenceForm from './pages/EmployeeAbsenceForm';

export const EmployeeRoutes = {
  path: 'employees',
  children: [
    {
      path: '',
      element: <EmployeeList />,
    },
    {
      path: ':employeeId',
      children: [
        {
          path: 'edit',
          element: <EmployeeForm />,
        },
        {
          Component: EmployeeProfileWrapper,
          children: [
            {
              path: 'profile',
              element: <EmployeeProfile />
            },
            {
              path: 'absences',
              element: <EmployeeAbsenceList />
            },
            {
              path: 'absences/new',
              element: <EmployeeAbsenceForm />
            },
            {
              path: 'absences/:employeeAbsenceId/edit',
              element: <EmployeeAbsenceForm />
            },
          ]
        }
      ]
    },
    {
      path: 'new',
      element: <EmployeeForm />,
    },
  ],
};