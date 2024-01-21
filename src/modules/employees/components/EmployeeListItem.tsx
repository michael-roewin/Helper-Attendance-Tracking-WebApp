import { Button, Dropdown, MenuProps } from 'antd';
import './EmployeeListItem.scss'
import { EllipsisOutlined } from '@ant-design/icons';
import Avatar from '../../../components/Avatar';
import { getInitials } from '../../../helpers/get-initials';
import { Employee } from '../../../interfaces/empoyee';

interface EmployeeListItemProps {
  employee: Employee;
  onClickEdit?: (employee: Employee) => void,
  onClickDelete?: (employee: Employee) => void,
}

export default function EmployeeListItem(props: EmployeeListItemProps) {
  const { employee } = props;

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
        props?.onClickEdit?.(employee);
        break;

      case 'delete':
        props?.onClickDelete?.(employee);
        break;
    }
  }

  return (
    <div className="employee-list-item py-4 pl-2 flex items-center">
      <div className="flex-1">
        <div className="flex item-center">
          <Avatar initials={getInitials(employee.user.firstName, employee.user.lastName)} className="mr-2" />
          <div className="employee-details">
            <p className="m-0 text-sm">{`${employee.user.firstName} ${employee.user.lastName}`}</p>
            <small className="username text-xs">{`${employee.user.username}`}</small>
          </div>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="employee-details">
          <small className="username text-xs">Salary</small>
          <p className="m-0 text-sm">{`${employee.salary}`}</p>
        </div>
      </div>
      <div className="flex-1 text-center">
        <div className="employee-details">
          <small className="username text-xs">Day off(s) per month</small>
          <p className="m-0 text-sm">{`${employee.dayOffPerMonth}`}</p>
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