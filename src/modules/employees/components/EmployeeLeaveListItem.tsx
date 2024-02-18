import { Button, Dropdown, MenuProps } from 'antd';
import './EmployeeListItem.scss'
import { EllipsisOutlined } from '@ant-design/icons';
import { EmployeeLeave } from '../../../interfaces/employee-leave';

interface EmployeeLeaveListItemProps {
  employeeLeave: EmployeeLeave;
  onClickEdit?: (employee: EmployeeLeave) => void,
  onClickDelete?: (employee: EmployeeLeave) => void,
}

export default function EmployeeLeaveListItem(props: EmployeeLeaveListItemProps) {
  const { employeeLeave } = props;

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
    },
    {
      label: 'Delete',
      key: 'delete',
    },
  ];

  const onItemClick = (e: { key: string; }) => {
    switch (e.key) {
      case 'edit':
        props?.onClickEdit?.(employeeLeave);
        break;

      case 'delete':
        props?.onClickDelete?.(employeeLeave);
        break;
    }
  }

  return (
    <div className="employee-list-item py-4 pl-2 flex items-center">
      <div className="flex-1">
        <div className="employee-details">
          <small className="username text-xs">Start Date</small>
          <p className="m-0 text-sm">{`${employeeLeave.startDate}`}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="employee-details">
          <small className="username text-xs">End Date</small>
          <p className="m-0 text-sm">{`${employeeLeave.endDate}`}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="employee-details">
          <small className="username text-xs">Number of days</small>
          <p className="m-0 text-sm">{`${employeeLeave.numDays}`}</p>
        </div>
      </div>
      <div className="flex-1">
        <div className="employee-details">
          <small className="username text-xs">Reason</small>
          <p className="m-0 text-sm">{`${employeeLeave.reason}`}</p>
        </div>
      </div>
      <div className="actions grow text-right">
        <Dropdown className="p-2" menu={{ items, onClick: onItemClick }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined rotate={90} />}></Button>
        </Dropdown>
      </div>
    </div>
  )
}