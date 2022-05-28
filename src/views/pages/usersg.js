// import React, { useState, useEffect, useRef, memo } from "react";
// import { Table, Input, Form, Button, Card, Popover, Space, Tag } from 'antd';
// // import UsersTable from "../components/UserTable";
// import "../styles/users.css";
// import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const columns = [
//     // {
//     //   title: 'Anwender_id',
//     //   dataIndex: 'ANWENDER_ID',
//     //   editable: false,
//     //   defaultSortOrder: 'ascend',
//     //   width: "120px"
//     // },
//     {
//       title: 'Titel',
//       dataIndex: 'TITEL',
//       editable: true,
//       width: "80px"
//     },
//     {
//       title: 'Vorname',
//       dataIndex: 'VORNAME',
//       editable: true,
//     },
//     {
//       title: 'Nachname',
//       dataIndex: 'NACHNAME',
//       editable: true,
//     },
//     {
//       title: 'Obk',
//       dataIndex: 'OBK',
//       editable: true,
//       width: "50px",
//       render: (_, record) => {
//         return (record.OBK == "x" || record.OBK == "X" || record.OBK == "" || !record.OBK) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Map',
//       dataIndex: 'MAP',
//       editable: true,
//       width: "50px",
//       render: (_, record) => {
//         return (record.MAP == "x" || record.MAP == "X" || record.MAP == "" || !record.MAP) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Map_dok',
//       dataIndex: 'MAP_DOK',
//       editable: true,
//       width: "90px",
//       render: (_, record) => {
//         return (record.MAP_DOK == "x" || record.MAP_DOK == "X" || record.MAP_DOK == "" || !record.MAP_DOK) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Artlex',
//       dataIndex: 'ARTLEX',
//       editable: true,
//       width: "70px",
//       render: (_, record) => {
//         return (record.ARTLEX == "x" || record.ARTLEX == "X" || record.ARTLEX == "" || !record.ARTLEX) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Mw',
//       dataIndex: 'MW',
//       editable: true,
//       width: "50px",
//       render: (_, record) => {
//         return (record.MW == "x" || record.MW == "X" || record.MW == "" || !record.MW) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Asp',
//       dataIndex: 'ASP',
//       editable: true,
//       width: "50px",
//       render: (_, record) => {
//         return (record.ASP == "x" || record.ASP == "X" || record.ASP == "" || !record.ASP) ? "No" : "Yes";
//       }
//     },
//     {
//       title: 'Mon',
//       dataIndex: 'MON',
//       editable: true,
//       width: "60px",
//       render: (_, record) => {
//         return (record.MON == "x" || record.MON == "X" || record.MON == "" || !record.MON) ? "No" : "Yes";
//       }
//     },
//     // {
//     //   title: 'BEMERKUNG',
//     //   dataIndex: 'BEMERKUNG',
//     //   editable: true,
//     // },
//     {
//       title: 'Mobiltelefon',
//       dataIndex: 'MOBILTELEFON',
//       editable: true,
//     },
//     {
//       title: 'Asp benutzername',
//       dataIndex: 'ASP_BENUTZERNAME',
//       editable: true,
//       width: "160px"
//     },
//     {
//       title: 'Ip adresse',
//       dataIndex: 'IP_ADRESSE',
//       editable: true,
//     },
//     {
//       title: 'Mw benutzername',
//       dataIndex: 'MW_BENUTZERNAME',
//       editable: true,
//       width: "160px"
//     },
//     {
//       title: 'Status',
//       dataIndex: 'STATUS_ID',
//       editable: true,
//       width: "70px",
//       render: (_, record) => {
//         return (record.STATUS_ID == 1) ? <Tag color='blue' key={record.STATUS_ID}>Active</Tag> : "";
//       },
//       fixed: 'right',
//     },
//     {
//       title: 'Aktie',
//       dataIndex: 'operation',
//       render: (_, record) => {
//         return (
//           <>
//             <Button size="small" style={{ marginRight: 5 }}>
//               <EditOutlined />
//             </Button>
//             <Button size="small" type="primary" danger >
//               <DeleteOutlined />
//             </Button>
//           </>
//         )
//       },
//       fixed: 'right',
//     },
// ];

// const UsersTable = memo(({loading}) => {
//     const [users, setUsers] = useState([]);
//     const [isLoading, setIsLoading] = useState(loading);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async() => {
//         const users = await axios.get("http://localhost:4400/api/v1/users");
//         setUsers(users.data);
//         setIsLoading(false);
//     }

//     return (
//     <Table
//         loading={loading}
//         bordered
//         scroll={{ y: 350, x: 2000, }}
//         size="small"
//         dataSource={users}
//         columns={columns}
//         pagination={{ pageSize: 100 }}
//     />
//     );
// });

// const Users = () => {
//     const [visiblePopOver, setVisiblePopOver] = useState(false);

//     const [loading, setLoading] = useState(true);
//     const [filters, setFilters] = useState({
//         offset: 0,
//         limit: 1000,
//         search: "",
//         status: "active"
//     });

//     const handleVisibleChange = (newVisible) => {
//         setVisiblePopOver(newVisible);
//     };

//     const handleChangeSearch = (value) => {
//         setLoading(true);
//         setFilters({ ...filters, search: value });
//     }

//     return (
//         <Card
//             bordered={false}
//             size="small"
//             type="inner"
//             bodyStyle={{ padding: "0" }}
//             title={
//                 <Space>
//                     <p style={{ margin: 0 }}>ANWENDER</p>
//                     <Form>
//                         <Form.Item style={{ margin: 0 }}>
//                             <Input.Search size="small" allowClear placeholder="Search..." onSearch={handleChangeSearch} />
//                         </Form.Item>
//                     </Form>
//                     <Popover content={<a>Close</a>} title="Title" trigger="click" visible={visiblePopOver} onVisibleChange={handleVisibleChange}>
//                         <Button size="small"><FilterOutlined /> Filter</Button>
//                     </Popover>
//                     <Button size="small"><PlusOutlined /> Add</Button>
//                 </Space>
//             }
//         >
//             <UsersTable title="title" loading={loading}  />
//         </Card>
//     );
// }


// export default () => <Users />;