import React, { useContext, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Button, Form, Input, Modal, Space, theme } from 'antd';
import { employeeRoutes } from '../constants';
import { EmployeeService } from '../../../services/employee.service';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';
import { AxiosError } from 'axios';
import { Employee } from '../../../interfaces/employee';
import { EmployeeCreateRequestDto } from '../../../dtos/employee-create-request.dto';
import { User } from '../../../interfaces/user';
import { filterNumberKeys } from '../../../helpers/filter-number-keys';

type FieldType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  cpassword: string;
  salary: string;
  dayOffPerMonth: number;
};

interface FormError {}
interface FormField {
  name: string;
  value: User | string | number | boolean | undefined;
}

function EmployeeForm() {
  const [isFormTouched, setIsFormTouched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [fields, setFields] = React.useState<FormField[]>([]);

  const context = useContext(AppContext);

  const params = useParams();
  const employeeId = params.employeeId;
  const validFields = ['firstName', 'lastName', 'username', 'active', 'salary', 'dayOffPerMonth'];

  useEffect(() => {

    const getEmployee = async () => {
      try {
        const employeeData = await EmployeeService.getEmployee(Number(employeeId));
        const employee = employeeData.data;

          const formFields: FormField[] = [];

          for (const prop in employeeData.data) {
            if (prop === 'user') {
              for (const userProp in employeeData.data['user']) {
                formFields.push({ name: userProp, value: employeeData.data['user'][userProp as keyof User] })
              }
            } else if (validFields.includes(prop) || validFields.includes(prop)) {
              formFields.push({ name: prop, value: employee[prop as keyof Employee] })
            }
          }

          setFields(formFields);
          setIsSubmitting(false);

          return employee;
      } catch (e) {
        console.error(e);
      }
    }

    if (employeeId) {
      setIsSubmitting(true);
      getEmployee();
    }
  }, []);

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldType) => {
    const employeeData: EmployeeCreateRequestDto = {
      ...data,
      active: true,
    }

    setIsSubmitting(true);

    try {
      if (!employeeId) {
        await EmployeeService.createEmployee(employeeData);
      } else {
        await EmployeeService.updateEmployee(Number(employeeId), employeeData);
      }

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            `Employee Succesfully ${employeeId ? 'Updated' : 'Created'}`,
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      setIsSubmitting(false);
      setIsFormTouched(false);

      if (!employeeId) {
        navigate('/employees');
      }
    } catch (e) {
      let description = 'Error encountered in creating employee';

      if (e instanceof AxiosError && e?.response?.status === 409) {
        description = 'Username already in use';
      }

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Error',
          description,
          duration: 3,
          icon: <CloseCircleOutlined style={{ color: colorError }} />,
        }
      }));

      setIsSubmitting(false);
    }
  };

  const onSubmitFailed = (errorInfo: FormError) => {
    console.log('Failed:', errorInfo);
  };

  const onFieldsChange = () => {
    setIsFormTouched(true);
  }

  const handleFormCancel = () => {
    if (!isFormTouched) {
      navigate(employeeRoutes.EMPLOYEE_LIST);
      return false;
    }

    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to leave the page without saving your changes?',
      onOk: () => {
        navigate(employeeRoutes.EMPLOYEE_LIST)
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn/>
          <CancelBtn />
        </>
      ),
    });
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        fields={fields}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
        onFieldsChange={onFieldsChange}
        size="large"
      >
        <Form.Item<FieldType>
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: !employeeId, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="cpassword"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('password') !== value) {
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Salary"
          name="salary"
          rules={[{ required: true, message: 'Please input the salary!' }]}
        >
          <Input onKeyDown={filterNumberKeys} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Day off Per Month"
          name="dayOffPerMonth"
          rules={[{ required: true, message: 'Please input the number of day off per month!' }]}
        >
          <Input onKeyDown={filterNumberKeys}/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}>
              Submit
            </Button>
            <Button
              type="primary"
              onClick={handleFormCancel}
              loading={isSubmitting}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default EmployeeForm;