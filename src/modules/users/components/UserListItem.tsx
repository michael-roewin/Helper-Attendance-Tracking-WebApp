import { Button, Dropdown, MenuProps } from 'antd';
import { User } from '../../../interfaces/user';
import './UserListItem.scss'
import { EllipsisOutlined } from '@ant-design/icons';
import Avatar from '../../../components/Avatar';
import { getInitials } from '../../../helpers/get-initials';

interface UserListItemProps {
  user: User;
  onClickEdit?: (user: User) => void,
  onClickDelete?: (user: User) => void,
}

export default function UserListItem(props: UserListItemProps) {
  const { user } = props;

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
        props?.onClickEdit?.(user);
        break;

      case 'delete':
        props?.onClickDelete?.(user);
        break;
    }
  }

  return (
    <div className="user-list-item py-4 pl-2 flex items-center">
      <Avatar initials={getInitials(user.firstName, user.lastName)} className="mr-2" />
      <div className="user-details">
        <p className="m-0 text-sm">{`${user.firstName} ${user.lastName}`}</p>
        <small className="username text-xs">{`${user.username}`}</small>
      </div>
      <div className="actions grow text-right">
        <Dropdown className="p-2" menu={{ items, onClick: onItemClick }} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined rotate={90} />}></Button>
        </Dropdown>
      </div>
    </div>
  )
}