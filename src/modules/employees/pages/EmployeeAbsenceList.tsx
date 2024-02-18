import { Button, Col, Row, Skeleton, theme } from 'antd';
import { employeeRoutes } from '../constants';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';
import { Employee } from '../../../interfaces/employee';
import './EmployeeList.scss'
import { routeTransformer } from '../../../helpers/route-transformer';
import { EmployeeLeaveService } from '../../../services/employee-leaves.service';
import { EmployeeLeave } from '../../../interfaces/employee-leave';
import { EmployeeLeaveType } from '../../../enums/employee-leave-type';
import EmployeeLeaveListItem from '../components/EmployeeLeaveListItem';

export default function EmployeeAbsenceList() {
  const employee = useOutletContext<Employee>();
  const [ employeeAbsences, setEmployeeAbences ] = useState<EmployeeLeave[]>([]);
  const [ employeeAbsencesLoaded, setEmployeeAbsencesLoaded ] = useState<boolean>(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const getEmployees = async () => {
    const response = await EmployeeLeaveService.getEmployeeLeaves(employee.id, EmployeeLeaveType.ABSENT);
    setEmployeeAbences(response.data);
    setEmployeeAbsencesLoaded(true);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const handleEditClick = (employeeLeave: EmployeeLeave) => {
    navigate(
      routeTransformer(
        employeeRoutes.EDIT_EMPLOYEE_ABSENCE,
        {
          employeeId: employee.id.toString(),
          employeeAbsenceId: employeeLeave.id.toString(),
        }
      )
    );
  }

  const handleDeleteClick = async (employeeLeave: EmployeeLeave) => {
    setEmployeeAbsencesLoaded(false);

    try {
      await EmployeeLeaveService.deleteEmployeeLeave(employee.id, employeeLeave.id);

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            'Employee Absence Succesfully Deleted',
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      getEmployees();
    } catch (e) {
      const description = 'Error encountered in deleting employee absence';

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Error',
          description,
          duration: 3,
          icon: <CloseCircleOutlined style={{ color: colorError }} />,
        }
      }));
    }
  }

  return (
    <>
    <Row className="mb-4">
      <Col span={24} className="text-right">
        <Link to={routeTransformer(employeeRoutes.ADD_EMPLOYEE_ABSENCE, { employeeId: employee?.id?.toString() })}>
          <Button type="primary" size="large">
            Add Employee Absence
          </Button>
        </Link>
      </Col>
    </Row>
    {
      employeeAbsencesLoaded
        ?
          (<div className="employee-list">
            {employeeAbsences.map((employeeAbsence) => {
              return (
              <EmployeeLeaveListItem
                key={employeeAbsence.id}
                employeeLeave={employeeAbsence}
                onClickEdit={handleEditClick}
                onClickDelete={handleDeleteClick} />
              );
            })}
          </div>)
        :
          (Array.from({ length: 6})).map((val, idx) => (<Skeleton className="paragraph-no-mt py-4 pl-2 flex items-center" active avatar={{ size: 48}} paragraph={{ width: [150, 100] }} title={false} key={idx}></Skeleton>))
    }
    </>
  )
}