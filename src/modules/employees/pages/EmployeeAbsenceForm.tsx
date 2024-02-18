import React, { useContext, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Button, Col, DatePicker, Form, Modal, Radio, Row, Space, theme } from 'antd';
import { employeeRoutes } from '../constants';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';
import { AxiosError } from 'axios';
import { Employee } from '../../../interfaces/employee';
import { EmployeeLeaveService } from '../../../services/employee-leaves.service';
import { EmployeeLeave } from '../../../interfaces/employee-leave';
import { EmployeeLeaveItem } from '../../../interfaces/employee-leave-item';
import { EmployeeLeaveCreateRequestDto } from '../../../dtos/employee-leave-create-request.dto';
import { EmployeeLeaveType } from '../../../enums/employee-leave-type';
import TextArea from 'antd/es/input/TextArea';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getDaysBetween } from '../../../helpers/get-days-between';
import { EmployeeLeaveItemType } from '../../../enums/employee-leave-item-type';
import { routeTransformer } from '../../../helpers/route-transformer';
dayjs.extend(customParseFormat);

type FieldType = {
  startDate: Dayjs;
  endDate: Dayjs;
  reason: string;
  items: EmployeeLeaveItem[]
};

interface FormError {}
interface FormField {
  name: string;
  value: Date | Dayjs| string | number | boolean | Employee | EmployeeLeaveItem[] | undefined;
}

const validFields = ['startDate', 'endDate', 'reason', 'active', 'items'];

export default function EmployeeAbsenceForm() {
  const [isFormTouched, setIsFormTouched] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [fields, setFields] = React.useState<FormField[]>([]);

  const context = useContext(AppContext);

  const params = useParams();
  const employeeId = params.employeeId;
  const employeeAbsenceId = params.employeeAbsenceId;

  const [form] = Form.useForm();

  useEffect(() => {
    const getEmployeeLeave = async () => {
      setIsSubmitting(true);

      try {
        const employeeLeaveData = await EmployeeLeaveService.getEmployeeLeave(Number(employeeId), Number(employeeAbsenceId));
        const employeeLeave = employeeLeaveData.data;

          const formFields: FormField[] = [];

          for (const prop in employeeLeaveData.data) {
            if (prop === 'startDate' || prop === 'endDate') {

              formFields.push({ name: prop, value: dayjs(employeeLeave[prop as keyof EmployeeLeave] as string) })
            } else if (prop === 'items') {
              const items = employeeLeave[prop as keyof EmployeeLeave] as EmployeeLeaveItem[];
              formFields.push({ name: prop, value: items.map((item) => ({ id: item.id, date: item.date, type: item.type})) })
            } else if (validFields.includes(prop)) {
              formFields.push({ name: prop, value: employeeLeave[prop as keyof EmployeeLeave] })
            }
          }

          setFields(formFields);
          setIsSubmitting(false);

          return employeeLeave;
      } catch (e) {
        console.error(e);
      }
    }

    if (employeeAbsenceId) {
      getEmployeeLeave();
    }
  }, []);

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldType) => {
    const employeeLeaveData: EmployeeLeaveCreateRequestDto = {
      ...data,
      startDate: data.startDate.format('YYYY-MM-DD'),
      endDate: data.endDate.format('YYYY-MM-DD'),
      type: EmployeeLeaveType.ABSENT,
    }

    setIsSubmitting(true);

    try {
      if (!employeeAbsenceId) {
        await EmployeeLeaveService.createEmployeeLeave(Number(employeeId), employeeLeaveData);
      } else {
        await EmployeeLeaveService.updateEmployeeLeave(Number(employeeId), Number(employeeAbsenceId), employeeLeaveData);
      }

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            `Employee Absence Succesfully ${employeeAbsenceId ? 'Updated' : 'Created'}`,
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      setIsSubmitting(false);
      setIsFormTouched(false);

      if (!employeeAbsenceId) {
        navigate(
          routeTransformer(
            employeeRoutes.EMPLOYEE_ABSENCE_LIST,
            {
              employeeId: employeeId as string,
              employeeAbsenceId: employeeAbsenceId as string,
            }
          )
        )
      }
    } catch (e) {
      let description = 'Error encountered in creating employee absence';

      if (e instanceof AxiosError && e?.response?.status === 422) {
        description = 'Start date or End date overlaps with existing records';
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
      navigate(
        routeTransformer(
          employeeRoutes.EMPLOYEE_ABSENCE_LIST,
          {
            employeeId: employeeId as string,
            employeeAbsenceId: employeeAbsenceId as string,
          }
        )
      )
      return false;
    }

    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to leave the page without saving your changes?',
      onOk: () => {
        navigate(
          routeTransformer(
            employeeRoutes.EMPLOYEE_ABSENCE_LIST,
            {
              employeeId: employeeId as string,
              employeeAbsenceId: employeeAbsenceId as string,
            }
          )
        )
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn/>
          <CancelBtn />
        </>
      ),
    });
  }

  const onDateChange = () => {
    const startDate: Dayjs = form.getFieldValue('startDate');
    const endDate: Dayjs = form.getFieldValue('endDate');

    if (!startDate || !endDate) {
      return;
    }

    const days = getDaysBetween(startDate, endDate);
    console.log(days);
    const formattedDays = days.map((day) => {
      return {
        date: day.format('YYYY-MM-DD'),
        type: EmployeeLeaveItemType.WHOLE_DAY
      };
    });

    form.setFieldValue('items', formattedDays);
  }

  return (
    <>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        fields={fields}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
        onFieldsChange={onFieldsChange}
        size="large"
      >
        <Form.Item<FieldType>
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please input the start date!' }]}
        >
          <DatePicker placeholder='Start Date' onChange={onDateChange} />
        </Form.Item>

        <Form.Item<FieldType>
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: 'Please input the end date!' }]}
        >
          <DatePicker placeholder='End Date' onChange={onDateChange} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Reason"
          name="reason"
          rules={[{ required: true, message: 'Please input the reason!' }]}
        >
          <TextArea />
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

        <Row>
          <Col span={8} className='text-right'>Items: &nbsp;</Col>
          <Col span={16}>
            <Form.List name="items" initialValue={[]}>
              {(fields) =>
                fields.map((field, idx) => (
                  <React.Fragment key={field.key}>
                    <p>{form.getFieldValue(['items', field.name, 'date'])}</p>
                    <Form.Item name={[idx, 'type']}>
                      <Radio.Group>
                        <Radio value={EmployeeLeaveItemType.WHOLE_DAY}>Whole Day</Radio>
                        <Radio value={EmployeeLeaveItemType.HALF_DAY}>Half Day</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </React.Fragment>
                ))
              }
            </Form.List>
          </Col>
        </Row>
      </Form>
    </>
  )
}
