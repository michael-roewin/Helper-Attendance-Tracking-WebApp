import { Button, Col, Row, Skeleton, theme } from 'antd';
import { userRoutes } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import UserListItem from '../components/UserListItem';
import { useContext, useEffect, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AppContext } from '../../../app-context';

function UserList() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ usersLoaded, setUsersLoaded ] = useState<boolean>(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const {
    token: { colorSuccess, colorError },
  } = theme.useToken();

  const getUsers = async () => {
    const response = await UserService.getUsers();
    setUsers(response.data);
    setUsersLoaded(true);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleEditClick = (user: User) => {
    navigate(`/users/${user.id}/edit`)
    console.log('edit', user);
  }

  const handleDeleteClick = async (user: User) => {
    setUsersLoaded(false);

    try {
      await UserService.deleteUser(user.id);

      context?.setAppState((appState) => ({
        ...appState,
        notification: {
          message: 'Success',
          description:
            'User Succesfully Deleted',
          duration: 3,
          icon: <CheckCircleOutlined style={{ color: colorSuccess }} />,
        }
      }));

      getUsers();
    } catch (e) {
      const description = 'Error encountered in deleting user';

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
        <h2 className="m-0">User List</h2>
      </Col>
      <Col span={12} className="text-right">
        <Link to={userRoutes.ADD_USER}>
          <Button type="primary" size="large">
            Add User
          </Button>
        </Link>
      </Col>
    </Row>
    {
      usersLoaded
        ?
          (<div className="user-list">
            {users.map((user) => {
              return (<UserListItem user={user} key={user.id} onClickEdit={handleEditClick} onClickDelete={handleDeleteClick}/>);
            })}
          </div>)
        :
          (Array.from({ length: 6})).map((val, idx) => (<Skeleton className="paragraph-no-mt mb-3" active avatar={{ size: 48}} paragraph={{ width: [150, 100] }} title={false} key={idx}></Skeleton>))
    }
    </>
  )
}

export default UserList;