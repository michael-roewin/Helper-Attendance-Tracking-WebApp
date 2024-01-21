import { Button, Col, Row, Skeleton, theme } from 'antd';
import { employeeRoutes } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeListItem from '../components/EmployeeListItem';
import { useContext, useEffect, useState } from 'react';
import { EmployeeService } from '../../../services/employee.service';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';
import { Employee } from '../../../interfaces/empoyee';

function EmployeeList() {
  const [ employees, setEmployees ] = useState<Employee[]>([]);
  const [ employeesLoaded, setEmployeesLoaded ] = useState<boolean>(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const getEmployees = async () => {
    const response = await EmployeeService.getEmployees();
    setEmployees(response.data);
    setEmployeesLoaded(true);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const handleEditClick = (employee: Employee) => {
    navigate(`/employees/${employee.id}/edit`)
    console.log('edit', employee);
  }

  const handleDeleteClick = async (employee: Employee) => {
    setEmployeesLoaded(false);

    try {
      await EmployeeService.deleteEmployee(employee.id);

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            'Employee Succesfully Deleted',
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      getEmployees();
    } catch (e) {
      const description = 'Error encountered in deleting employee';

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
      <Col span={12}>
        <h2 className="m-0">Employee List</h2>
      </Col>
      <Col span={12} className="text-right">
        <Link to={employeeRoutes.ADD_USER}>
          <Button type="primary" size="large">
            Add Employee
          </Button>
        </Link>
      </Col>
    </Row>
    {
      employeesLoaded
        ?
          (<div className="employee-list">
            {employees.map((employee) => {
              return (<EmployeeListItem employee={employee} key={employee.id} onClickEdit={handleEditClick} onClickDelete={handleDeleteClick}/>);
            })}
          </div>)
        :
          (Array.from({ length: 6})).map((val, idx) => (<Skeleton className="paragraph-no-mt mb-3" active avatar={{ size: 48}} paragraph={{ width: [150, 100] }} title={false} key={idx}></Skeleton>))
    }
    </>
  )
}

export default EmployeeList;