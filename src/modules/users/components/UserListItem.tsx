import { Button, Dropdown, MenuProps } from 'antd';
import { User } from '../../../interfaces/user';
import './UserListItem.scss'
import { EllipsisOutlined } from '@ant-design/icons';
import Avatar from '../../../components/Avatar';
import { getInitials } from '../../../helpers/get-initials';

interface UserListItemProps {
  user: User;
}

export default function UserListItem(props: UserListItemProps) {
  const { user } = props;

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: '0',
    },
    {
      label: 'Delete',
      key: '1',
    },
  ];

  return (
    <div className="user-list-item py-4 pl-2 flex items-center">
      <Avatar initials={getInitials(user.firstName, user.lastName)} className="mr-2" />
      <div className="user-details">
        <p className="m-0 text-sm">{`${user.firstName} ${user.lastName}`}</p>
        <small className="username text-xs">{`${user.username}`}</small>
      </div>
      <div className="actions grow text-right">
        <Dropdown className="p-2" menu={{ items }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined rotate={90} />}></Button>
        </Dropdown>
      </div>
    </div>
  )
}