import React, { useState, useEffect, useRef, memo } from "react";
import { Table, Input, Form, Button, Card, Popover, Space, Tag, InputNumber, Row, Col, Divider } from 'antd';
// import UsersTable from "../components/UserTable";
import "../styles/users.css";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const UsersTable = memo(({ users, loading, onClickRow, onEditRow }) => {

  const UsersTableColumns = [
    // {
    //   title: 'Anwender_id',
    //   dataIndex: 'ANWENDER_ID',
    //   editable: false,
    //   defaultSortOrder: 'ascend',
    //   width: "120px"
    // },
    {
      title: 'Titel',
      dataIndex: 'TITEL',
      width: "100px"
    },
    {
      title: 'Vorname',
      dataIndex: 'VORNAME',
    },
    {
      title: 'Nachname',
      dataIndex: 'NACHNAME',
    },
    {
      title: 'Zugriff',
      dataIndex: 'ZUGRIFF',
    },
    {
      title: 'Obk',
      dataIndex: 'OBK',
      width: "50px",
      render: (_, record) => {
        return (record.OBK == "x" || record.OBK == "X" || record.OBK == "" || !record.OBK) ? "" : "Yes";
      }
    },
    {
      title: 'Map',
      dataIndex: 'MAP',
      width: "50px",
      render: (_, record) => {
        return (record.MAP == "x" || record.MAP == "X" || record.MAP == "" || !record.MAP) ? "" : "Yes";
      }
    },
    {
      title: 'Map_dok',
      dataIndex: 'MAP_DOK',
      width: "90px",
      render: (_, record) => {
        return (record.MAP_DOK == "x" || record.MAP_DOK == "X" || record.MAP_DOK == "" || !record.MAP_DOK) ? "" : "Yes";
      }
    },
    {
      title: 'Artlex',
      dataIndex: 'ARTLEX',
      width: "70px",
      render: (_, record) => {
        return (record.ARTLEX == "x" || record.ARTLEX == "X" || record.ARTLEX == "" || !record.ARTLEX) ? "" : "Yes";
      }
    },
    {
      title: 'Mw',
      dataIndex: 'MW',
      width: "50px",
      render: (_, record) => {
        return (record.MW == "x" || record.MW == "X" || record.MW == "" || !record.MW) ? "" : "Yes";
      }
    },
    {
      title: 'Asp',
      dataIndex: 'ASP',
      width: "50px",
      render: (_, record) => {
        return (record.ASP == "x" || record.ASP == "X" || record.ASP == "" || !record.ASP) ? "" : "Yes";
      }
    },
    {
      title: 'Mon',
      dataIndex: 'MON',
      width: "60px",
      render: (_, record) => {
        return (record.MON == "x" || record.MON == "X" || record.MON == "" || !record.MON) ? "" : "Yes";
      }
    },
    // {
    //   title: 'BEMERKUNG',
    //   dataIndex: 'BEMERKUNG',
    // },
    {
      title: 'Mobiltelefon',
      dataIndex: 'MOBILTELEFON',
    },
    {
      title: 'Asp benutzername',
      dataIndex: 'ASP_BENUTZERNAME',
      width: "200px"
    },
    {
      title: 'Ip adresse',
      dataIndex: 'IP_ADRESSE',
    },
    {
      title: 'Mw benutzername',
      dataIndex: 'MW_BENUTZERNAME',
      width: "200px"
    },
    {
      title: 'Erstellt am',
      dataIndex: 'ERSTELLT_AM',
    },
    {
      title: 'Status',
      dataIndex: 'STATUS_ID',
      render: (_, record) => {
        return (record.STATUS_ID == 1) ? <Tag color='blue' key={record.STATUS_ID}>{record.LANGNAME}</Tag> : "";
      },
      width: "80px",
      fixed: 'right',
    },
    {
      title: 'Aktie',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <>
            <Button size="small" style={{ marginRight: 5 }} onClick={() => onEditRow(record, "edit")}>
              <EditOutlined />
            </Button>
            <Button size="small" type="primary" danger onClick={() => onClickRow(record, "delete")}>
              <DeleteOutlined />
            </Button>
          </>
        )
      },
      fixed: 'right',
    },
  ];


  return <Table
    sticky
    loading={loading}
    bordered
    scroll={{ x: 2200, y: 350 }}
    size="small"
    dataSource={users}
    columns={UsersTableColumns}
    pagination={{ pageSize: 100 }}
    style={{ height: '450px' }}
    onRow={(record, rowIndex) => {
      return {
        onClick: event => onClickRow(record), // click row
      };
    }}
  />
    ;
});

const AdressesTableColumns = [
  {
    title: 'Strasse',
    dataIndex: 'STRASSE',
    editable: true,
  },
  {
    title: 'Ort',
    dataIndex: 'ORT',
    editable: true,
  },
  {
    title: 'Telefon',
    dataIndex: 'TELEFON',
    editable: true,
  },
  {
    title: 'Email',
    dataIndex: 'EMAIL',
    editable: true,
  },
  {
    title: 'Dienststelle Buero',
    dataIndex: 'DIENSTSTELLE_BUERO',
    editable: true,
  },
  {
    title: 'Benutzername',
    dataIndex: 'BENUTZERNAME',
    editable: true,
  },
  {
    title: 'Passwort',
    dataIndex: 'PASSWORT',
    editable: true,
  },
  {
    title: 'Status',
    dataIndex: 'STATUS_ID',
    render: (_, record) => {
      return (record.STATUS_ID == 1) ? <Tag color='blue' key={record.STATUS_ID}>Active</Tag> : "";
    },
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    render: (_, record) => {
      return (
        <Button size="small">
          Edit
        </Button>
      )
    },
  },
];

const AdressesTable = memo(({ addresses, loading }) => {
  return <Table
    loading={loading}
    scroll={{ y: 250 }}
    size="small"
    dataSource={addresses}
    columns={AdressesTableColumns}
    pagination={false}
    style={{ height: '250px' }}
  />;
});

const XcnfBenutzerTableColumns = [
  {
    title: 'Benutzer Id',
    dataIndex: 'BENUTZER_ID',
    editable: true,
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    render: (_, record) => {
      return (
        <Button size="small">
          Edit
        </Button>
      )
    },
  },
];

const XcnfBenutzerTable = memo(({ xcnf_benutzers, loading }) => {
  return <Table
    loading={loading}
    scroll={{ y: 250 }}
    size="small"
    dataSource={xcnf_benutzers}
    columns={XcnfBenutzerTableColumns}
    pagination={false}
    style={{ height: '250px' }}
  />;
});

const AnwenderForm = memo(({ addresses, loading }) => {

  const [form] = Form.useForm();


  const style = {
    padding: '8px 0',
  };

  return (
    <Row>
      <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
        <Form layout="vertical">
          <Divider><h4>Schaffen Anwender</h4></Divider>
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item label="Zugriff:">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item label="Titel:">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item label="Vorname:" style={{ marginBottom: "0px" }}>
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Form.Item label="Nachname:" style={{ marginBottom: "0px" }}>
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
});


const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [addresses, setAddresses] = useState();
  const [xcnfBenutzers, setXcnfBenutzers] = useState();
  const [loading, setLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [popover, setPopover] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('Adresses');
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10000,
    search: "",
    status: "active",
    start_date: "",
    end_date: ""
  });

  const handlePopover = (value) => {
    setPopover(value);
  };

  const handleChangeSearch = (value) => {
    setLoading(true);
    const _filters = {
      ...filters,
      search: value
    };
    setFilters({ ...filters, search: value });
    fetchUsersWithFilters(_filters);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: filters
    });
    setUsers(response.data.data);
    setLoading(false);
  }

  const fetchUsersWithFilters = async (_filters) => {
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: _filters
    });
    setUsers(response.data.data);
    setLoading(false);
  }


  const tabListNoTitle = [
    {
      key: 'Adresses',
      tab: 'Adresse',
    },
    {
      key: 'XcnfBenutzer',
      tab: 'Xcnf Benutzer',
    },
    {
      key: 'Anwender',
      tab: 'Anwender',
    },
  ];

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const TabData = ({ addresses, loading }) => {
    if (activeTabKey == "Adresses")
      return <AdressesTable addresses={addresses} loading={loading} />;
    else if (activeTabKey == "XcnfBenutzer")
      return <XcnfBenutzerTable loading={loading} />;
    else return <AnwenderForm />;
  }


  const handleClickRow = (record) => {
    setSelectedUser(record);
    fetchAddress(record);
  }

  const fetchAddress = async (record) => {
    setAddressesLoading(true);
    const response = await axios.get(`http://localhost:4400/api/v1/addresses/user/${record.ANWENDER_ID}`);
    setAddresses(response.data.adresse);
    setXcnfBenutzers(response.data.xcnf_benutzers);
    setAddressesLoading(false);
  }

  const handleEditRow = (record, action) => {
    console.log(action);
    setActiveTabKey('Anwender');
  }

  return (
    <>
      {/* Users Master Table Start */}
      <Card
        bordered={false}
        size="small"
        type="inner"
        bodyStyle={{ padding: "0" }}
        title={
          <Space>
            <Form>
              <Form.Item style={{ marginBottom: "0x" }}>
                <Input.Search size="small" allowClear placeholder="Search..." onSearch={handleChangeSearch} />
              </Form.Item>
            </Form>
            <Popover content={<a>Close</a>} title="Title" trigger="click" visible={popover} onVisibleChange={handlePopover}>
              <Button size="small"><FilterOutlined /> Filter</Button>
            </Popover>
            <Button size="small"><PlusOutlined /> Add</Button>
          </Space>
        }
      >
        <UsersTable users={users} loading={loading} onClickRow={(record) => handleClickRow(record)} onEditRow={(record, action) => handleEditRow(record, action)} />
      </Card>
      {/* Users Master Table End */}

      {/* Users Detail Table Start */}
      <Card
        bordered
        size="small"
        type="inner"
        // title="Addresses"
        // extra={<Button type="primary">Add Row</Button>}
        style={{ marginTop: "20px" }}
        bodyStyle={{ padding: "0" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >

        <TabData addresses={addresses} xcnfBenutzers={xcnfBenutzers} loading={addressesLoading} />

      </Card>
      {/* Users Detail Table End */}
    </>
  );
}


export default () => <Users />;