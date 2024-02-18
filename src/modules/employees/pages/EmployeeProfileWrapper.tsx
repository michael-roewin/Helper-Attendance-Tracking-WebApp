import { getInitials } from "../../../helpers/get-initials";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../../../services/employee.service";
import { Employee } from "../../../interfaces/employee";
import Avatar from "../../../components/Avatar";
import './EmployeeProfile.scss';
import { Tabs, TabsProps } from "antd";
import { routeTransformer } from "../../../helpers/route-transformer";
import { employeeRoutes } from "../constants";

const items: TabsProps['items'] = [
  {
    key: 'profile',
    label: 'Profile',
  },
  {
    key: 'absences',
    label: 'Absences',
  },
];

export default function EmployeeProfileWrapper() {
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState<Employee>();
  const params = useParams();
  const employeeId = params.employeeId;

  const navigate = useNavigate();

  const onChange = (key: string) => {
    if (!employee) {
      return;
    }

    switch (key) {
      case 'profile':
        navigate(
          routeTransformer(
            employeeRoutes.EMPLOYEE_PROFILE,
            { employeeId: employee.id.toString() }
          )
        );
        break;

      case 'absences':
        navigate(
          routeTransformer(
            employeeRoutes.EMPLOYEE_ABSENCE_LIST,
            { employeeId: employee.id.toString() }
          )
        );
        break;
    }
  };

  useEffect(() => {
    const getEmployee = async () => {
      setIsLoading(true);

      try {
        const employeeData = await EmployeeService.getEmployee(Number(employeeId));
        const employee = employeeData.data;

        setEmployee(employee);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    if (employeeId) {
      getEmployee();
    }
  }, [])

  return (
    (
      employee?.id
        ?
          <>
            <div className="employee-profile">
              <div className="flex items-center">
                  <Avatar initials={getInitials(employee.user.firstName, employee.user.lastName)} height={24} width={24} className="mr-4" />
                  <div className="employee-details">
                    <p className="m-0 text-3xl">{`${employee.user.firstName} ${employee.user.lastName}`}</p>
                    <small className="username text-base pl-0.5">{`${employee.user.username}`}</small>
                  </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Outlet context={employee}/>
          </>
        :
        false
    )
  )
}