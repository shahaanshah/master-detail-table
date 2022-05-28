import {useState} from "react";
import { Layout as AppMain, Menu, Breadcrumb, Modal, message, Button } from 'antd';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuth } from "../../hooks/useAuth";


const menuItems = [
    {
        path: '/',
        label: 'Dashboard',
        icon: <DashboardOutlined />
    },
    {
        path: '/users',
        label: 'Users',
        icon: <UserOutlined />
    },
];


const Layout = () => {

    const {
        authState: { isLoggedIn },
        dispatchAuth
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const { Header, Content, Footer } = AppMain;


    const handleLogout = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to log out?',
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => {
                window.localStorage.removeItem('username');
                dispatchAuth({
                    type: "LOG_OUT"
                  });
                navigate("/login", { replace: true });
            }
        });
    }


    return (
        <AppMain>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', lineHeight: '40px', height: '40px', padding: 0, zIndex: 999 }}>
                {/* <div className="logo" /> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
                    {menuItems.map((item, key) => {
                        return (

                            <Menu.Item key={item.path}>
                                <NavLink to={item.path}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            </Menu.Item>

                        );

                    })}

                    <Menu.Item key={'/logout'} onClick={handleLogout}>
                        <LockOutlined />
                        <span>Logout</span>
                    </Menu.Item>
                </Menu>
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} items={menuItems} /> */}
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 40 }}>
                <div className="site-layout-background" style={{ padding: "24px 0px", minHeight: "100vh" }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </AppMain>
    );
};

export default () => <Layout />;