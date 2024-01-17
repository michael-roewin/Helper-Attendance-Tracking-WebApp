import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Form, Input, Modal, Space } from 'antd';
import { userRoutes } from '../constants';

type FieldType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  remember?: string;
};

interface FormError {}

const onFinish = (data: FieldType) => {
  console.log('Success:', data);
};

const onFinishFailed = (errorInfo: FormError) => {
  console.log('Failed:', errorInfo);
};


function UserForm() {
  const [isFormTouched, setIsFormTouched] = React.useState(false);

  const navigate = useNavigate();

  const onFieldsChange = () => {
    setIsFormTouched(true);
  }

  const handleFormCancel = () => {
    if (!isFormTouched) {
      navigate(userRoutes.USER_LIST);
      return false;
    }

    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to leave the page without saving your changes?',
      onOk: () => {
        navigate(userRoutes.USER_LIST)
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
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
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
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType>
      label="Confirm Password"
      name="confirmPassword"
      rules={[
        { required: true, message: 'Please confirm your password!' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          type="primary"
          onClick={handleFormCancel}
        >
          Cancel
        </Button>
      </Space>
    </Form.Item>
  </Form>
  )
}

export default UserForm;