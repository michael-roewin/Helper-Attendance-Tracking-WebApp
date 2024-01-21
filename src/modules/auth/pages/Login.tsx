import React, { useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex } from 'antd';
import axios from 'axios';
import './Login.scss'
import { AppContext } from '../../../app-context';
import { User } from '../../../interfaces/user';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface ValidateErrorEntity {}

export const Login: React.FC = () => {
  const context = useContext(AppContext);

  const navigate = useNavigate();

  const onSubmit = async (credentials: { username: string, password: string }) => {
    const { username, password } = credentials;

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(apiUrl + 'auth/login', {
        username,
        password,
      })

      context?.setAppState((appState) => {
        return {
          ...appState,
          user: response.data.user as User,
          userLoaded: true,
        }
      })

      localStorage.setItem('user', JSON.stringify(response.data?.user));
      localStorage.setItem('token', response.data?.token);

      axios.defaults.headers.common = {'Authorization': `Bearer ${response.data?.token}`}

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate("/");
    }
  }, [])

  return (
    <div className="login-wrap">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <h1 className="text-xl font-bold text-capitalize capitalize text-center mb-6">
          Helper Attendance Tracking App
        </h1>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" style={{ fontSize: '16px', color: '#1677ff' }} />} placeholder="Username" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" style={{ fontSize: '16px', color: '#1677ff' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Flex wrap="wrap" gap="small" style={{ width: '100%' }}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Flex>
        </Form.Item>

        <p className="text-center">© 2024 HATA. All Rights Reserved</p>
      </Form>
    </div>
  );
}

export default Login;