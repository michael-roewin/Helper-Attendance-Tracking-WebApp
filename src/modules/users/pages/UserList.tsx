import { Button, Col, Row, Skeleton } from 'antd';
import { userRoutes } from '../constants';
import { Link } from 'react-router-dom';
import UserListItem from '../components/UserListItem';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

function UserList() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ usersLoaded, setUsersLoaded ] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await UserService.getUsers();
      setUsers(response.data);
      setUsersLoaded(true);
    }

    getUsers();
  }, []);

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
    { usersLoaded
      ?
        (<div className="user-list">
          {users.map((user) => {
            return (<UserListItem user={user} key={user.id}/>);
          })}
        </div>)
      :
        (Array.from({ length: 6})).map((val, idx) => (<Skeleton className="paragraph-no-mt mb-3" active avatar={{ size: 48}} paragraph={{ width: [150, 100] }} title={false} key={idx}></Skeleton>))
    }
    </>
  )
}

export default UserList;