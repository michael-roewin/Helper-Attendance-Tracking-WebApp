import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Dropdown, Layout, Menu, theme } from 'antd';
import { AppContext } from '../app-context';
import Avatar from '../components/Avatar';
import { getInitials } from '../helpers/get-initials';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {

    key: 'home',
    icon: React.createElement(HomeOutlined),
    label: <Link to='/'>Home</Link>,
  },
  {
    key: 'employees',
    icon: React.createElement(UsergroupAddOutlined),
    label: <Link to='/employees'>Employees</Link>,
  },
  {
    key: 'users',
    icon: React.createElement(UserOutlined),
    label: <Link to='/users'>Users</Link>,
  },
];

const authUserItems: MenuProps['items'] = [
  {
    label: 'Log Out',
    key: 'logout',
  },
];

function AppLayout() {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [defaultSelectedKey, setDefaultSelectedKey] = useState('');

  useEffect(() => {
    const pathName = location.pathname;
    const firstSegment = pathName.split('/');

    switch (firstSegment[1]) {
      case 'employees':
        setDefaultSelectedKey('employees');
        break;
      case 'users':
        setDefaultSelectedKey('users');
        break;
      default:
        setDefaultSelectedKey('home');
    }
  }, [location]);

  const onItemClick = () => {
    localStorage.clear();
    return navigate('/login');
  }

  const authUser = context?.appState?.user;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            /* here is your component tokens */
            itemBorderRadius: 0,
          },
          Button: {
            borderRadius: 5,
          },
          Input: {
            borderRadius: 5,
          },
          Form: {

          },
        },
      }}
    >

      <Layout hasSider>
        <Sider
          width={250}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, width: '250px' }}
        >
          <div className="demo-logo-vertical">Employee Tracking App</div>
          <Menu theme="dark" mode="inline" items={items} selectedKeys={[defaultSelectedKey]} />
        </Sider>
        <Layout style={{ marginLeft: 250, position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <Header className="flex items-center px-4 mb-4" style={{ background: colorBgContainer }}>
            <div className='grow'>
            </div>
            <div className="grow">
              <div className="flex items-center justify-end text-right">
                <p className="text-sm font-bold inline-block mr-2">{ authUser?.firstName } { authUser?.lastName }</p>

                <Dropdown className="p-2" menu={{ items: authUserItems, onClick: onItemClick }}>
                  <Avatar initials={getInitials(authUser?.firstName || '', authUser?.lastName || '')}/>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content className="px-8 py-4" style={{ position: 'relative', overflow: 'auto' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center', marginTop: 16, borderTop: '1px solid #d3d3d3' }}>
            Tan's Employee Tracking App ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default AppLayout;