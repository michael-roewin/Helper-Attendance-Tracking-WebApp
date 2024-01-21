import React, { useContext, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Button, Form, Input, Modal, Space, theme } from 'antd';
import { userRoutes } from '../constants';
import { UserService } from '../../../services/user.service';
import { UserCreateRequestDto } from '../../../dtos/user-create-request.dto';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';
import { AxiosError } from 'axios';
import { User } from '../../../interfaces/user';

type FieldType = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  cpassword: string;
};

interface FormError {}
interface FormField {
  name: string;
  value: string | number | boolean | undefined;
}

function UserForm() {
  const [isFormTouched, setIsFormTouched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [fields, setFields] = React.useState<FormField[]>([]);

  const context = useContext(AppContext);

  const params = useParams();
  const userId = params.userId;
  const validFields = ['firstName', 'lastName', 'username', 'active'];

  useEffect(() => {

    const getUser = async () => {
      try {
        const userData = await UserService.getUser(Number(userId));
        const user = userData.data;

          const formFields: FormField[] = [];

          for (const prop in userData.data) {
            if (validFields.includes(prop)) {
              formFields.push({ name: prop, value: user[prop as keyof User] })
            }
          }

          setFields(formFields);
          setIsSubmitting(false);
      } catch (e) {
        console.error(e);
      }
    }

    if (userId) {
      setIsSubmitting(true);
      getUser();
    }
  }, []);

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldType) => {
    const userData: UserCreateRequestDto = {
      ...data,
      active: true,
    }

    setIsSubmitting(true);

    try {
      if (!userId) {
        await UserService.createUser(userData);
      } else {
        await UserService.updateUser(Number(userId), userData);
      }

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            `User Succesfully ${userId ? 'Updated' : 'Created'}`,
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      setIsSubmitting(false);
      setIsFormTouched(false);

      if (!userId) {
        navigate('/users');
      }
    } catch (e) {
      let description = 'Error encountered in creating user';

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
          rules={[{ required: !userId, message: 'Please input your password!' }]}
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

export default UserForm;