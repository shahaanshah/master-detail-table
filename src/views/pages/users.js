import React, { useState, useEffect, useRef, memo } from "react";
import { Table, Input, Form, Button, Card, Popover, Space, Tag, Select, Checkbox, Row, Col, AutoComplete, DatePicker, message, Segmented, Switch } from 'antd';
// import UsersTable from "../components/UserTable";
import "../styles/users.css";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined, FilterOutlined, ReloadOutlined, UserOutlined, PhoneOutlined, GlobalOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

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
      title: 'Ip adresse',
      dataIndex: 'IP_ADRESSE',
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
            <Button size="small" onClick={() => onClickRow(record, "delete")}>
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

const XcnfBenutzerTable = memo(({ xcnf_benutzers, loading }) => {

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

const AnwenderForm = memo(({ suggestions, user, resetForm, updateForm }) => {
  const [checkbox, setCheckbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('create');
  const [form] = Form.useForm();


  useEffect(() => {
    if (user) {
      setAction('update')
      const {OBK, MAP, MAP_DOK, ARTLEX, MW, ASP, MON} = user;
      let array = [];
      if(OBK == '1') array.push("OBK")
      if(MAP == '1') array.push("MAP")
      if(MAP_DOK == '1') array.push("MAP_DOK")
      if(ARTLEX == '1') array.push("ARTLEX")
      if(MW == '1') array.push("MW")
      if(ASP == '1') array.push("ASP")
      if(MON == '1') array.push("MON")

      setCheckbox(array);
    }
  }, [])

  const options = [
    { label: "OBK (J/N)", value: "OBK" },
    { label: "MAP (J/N)", value: "MAP" },
    { label: "MAP_DOK (J/N)", value: "MAP_DOK" },
    { label: "ARTLEX (J/N)", value: "ARTLEX" },
    { label: "MW (J/N)", value: "MW" },
    { label: "ASP (J/N)", value: "ASP" },
    { label: "MON (J/N)", value: "MON" },
  ];

  const handleChangeCheckbox = (value) => {
    setCheckbox(value);
  }

  const onFinish = async (value) => {

    setLoading(true);

    const Fachanwendungen = checkbox.reduce((a, v) => ({ ...a, [v]: "1" }), {});
    const data = {
      ...value,
      ERSTELLT_AM: (value.ERSTELLT_AM) ? value.ERSTELLT_AM.format("DD-MMMM-YYYY") : '',
      GELOESCHT_AM: (value.GELOESCHT_AM) ? value.GELOESCHT_AM.format("DD-MMMM-YYYY") : '',
      ...Fachanwendungen
    };

    if (user) {
      try {
        const response = await axios.put(`http://localhost:4400/api/v1/users/${user.ANWENDER_ID}`, {
          ...data
        });

        if (response.status === 201) {
          setTimeout(() => {
            message.success({
              content: response.data.message,
              key: 'updatable',
              duration: 3,
            });
            setLoading(false)
          }, 100);
        }
        updateForm();

      }
      catch (error) {
        if (error.response.status === 500) {
          setTimeout(() => {
            message.error({
              content: error.response.data.message,
              key: 'updatable',
              duration: 3,
            });
            setLoading(false)
          }, 100);
        }
      }
    }
    else {
      try {
        const response = await axios.post("http://localhost:4400/api/v1/users", {
          ...data
        });

        if (response.status === 201) {
          setTimeout(() => {
            message.success({
              content: response.data.message,
              key: 'updatable',
              duration: 3,
            });
            setLoading(false)
          }, 100);
        }

        setLoading(false)

      }
      catch (error) {
        if (error.response.status === 500) {
          setTimeout(() => {
            message.error({
              content: error.response.data.message,
              key: 'updatable',
              duration: 3,
            });
            setLoading(false)
          }, 100);
        }
      }
    }

  }

  const handleReset = () => {
    setAction('create');
    resetForm();
  }


  return (
    <Row style={{ padding: "20px" }} >
      <Col xs={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 0 }}>
        <Form
          form={form}
          layout="horizontal"
          size="small"
          onFinish={onFinish}
          initialValues={{
            ZUGRIFF: (user) ? user.ZUGRIFF : '',
            TITEL: (user) ? user.TITEL : '',
            VORNAME: (user) ? user.VORNAME : '',
            NACHNAME: (user) ? user.NACHNAME : '',
            MOBILTELEFON: (user) ? user.MOBILTELEFON : '',
            IP_ADRESSE: (user) ? user.IP_ADRESSE : '',
            STATUS_ID: (user) ? user.STATUS_ID.toString() : '1',
            ERSTELLT_AM: (user && user.ERSTELLT_AM !== null) ? moment(user.ERSTELLT_AM) : '',
            GELOESCHT_AM: (user && user.GELOESCHT_AM !== null) ? moment(user.GELOESCHT_AM) : '',
            BEMERKUNG: (user) ? user.BEMERKUNG : ''
          }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 6 }} name="ZUGRIFF" label="Zugriff:">
                <Input placeholder="Zugriff" allowClear suffix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 6 }} name="TITEL" label="Titel:">
                <AutoComplete
                  options={suggestions}
                  children={<Input placeholder="Titel" allowClear suffix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }

                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 6 }} name="VORNAME" label="Vorname:">
                <Input placeholder="Vorname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 6 }} name="NACHNAME" label="Nachname:">
                <Input placeholder="Nachname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 6 }} name="MOBILTELEFON" label="Mobil / Telefon:">
                <Input placeholder="Mobil / Telefon" allowClear suffix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 6 }} name="IP_ADRESSE" label="IP Adresse:">
                <Input placeholder="IP Adresse" allowClear suffix={<GlobalOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 6 }} name="STATUS_ID" label="Status:">
                <Select placeholder="Status">
                  <Select.Option value="1">Aktiv</Select.Option>
                  <Select.Option value="0">Deaktiv</Select.Option>
                  <Select.Option value="2">Gelöscht</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 6 }} name="ERSTELLT_AM" label="Erstellt Datum">
                <DatePicker placeholder="Erstellt Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 6 }} name="GELOESCHT_AM" label="Gelöscht Datum">
                <DatePicker placeholder="Gelöscht Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 6 }} label="Fachanwendungen:">
                <fieldset>
                  <Checkbox.Group
                    options={options}
                    value={checkbox}
                    onChange={handleChangeCheckbox}
                  />
                </fieldset>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 6 }} name="BEMERKUNG" label="Bemerkung:">
                <Input.TextArea rows={4} placeholder="Bemerkung" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item style={{ textAlign: 'center', marginTop: 10 }} >
                <Button type="primary" htmlType="submit" loading={loading}>
                  {(user) ? "Aktualisieren" : "Speichern"}
                </Button>
                {(user) ? (
                  <Button htmlType="button" onClick={handleReset}>
                    Reset
                  </Button>
                ) : (
                  <></>
                )}

              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
});


const UserFilters = ({ onSearch, onReload }) => {
  const [popover, setPopover] = useState(false);
  const handlePopover = (value) => {
    setPopover(value);
  };
  return (
    <Space>
      <Button size="small" onClick={() => onReload()}><ReloadOutlined /> Reload</Button>
      <Form>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Input.Search size="small" allowClear placeholder="Search..." onSearch={(value) => onSearch(value)} />
        </Form.Item>
      </Form>
      <Popover content={<a>Close</a>} title="Title" trigger="click" visible={popover} onVisibleChange={handlePopover}>
        <Button size="small"><FilterOutlined /> Filter</Button>
      </Popover>
    </Space>
  );
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [addresses, setAddresses] = useState();
  const [xcnfBenutzers, setXcnfBenutzers] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('Anwender');
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10000,
    search: "",
    status: "active",
    start_date: "",
    end_date: ""
  });

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
    const filterd = response.data.data.filter(item => item.TITEL !== null && item.TITEL !== undefined).map(item => item.TITEL.replace(/\s/g, ''));
    const suggs = [...new Set(filterd)].map(item => { return { value: item } });
    if (selectedUser) {
      const select = response.data.data.filter(item => item.ANWENDER_ID === selectedUser.ANWENDER_ID)[0];
      setSelectedUser(select);
    }
    setSuggestions(suggs);
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
      key: 'Anwender',
      tab: 'NAIS Anwender',
    },
    {
      key: 'Adresses',
      tab: 'Anwender Adresse',
    },
    {
      key: 'XcnfBenutzer',
      tab: 'XCNF Benutzer',
    }
  ];

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const TabData = ({ addresses, loading, suggestions, user, resetForm, updateForm }) => {
    if (activeTabKey == "Adresses")
      return <AdressesTable addresses={addresses} loading={loading} />;
    else if (activeTabKey == "XcnfBenutzer")
      return <XcnfBenutzerTable loading={loading} />;
    else return <AnwenderForm suggestions={suggestions} user={user} resetForm={resetForm} updateForm={updateForm} />;
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

  const handleReload = () => {
    setLoading(true);
    fetchUsers();
  }

  const resetForm = () => {
    setSelectedUser('');
  }

  const updateForm = () => {
    fetchUsers();
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
          <UserFilters
            onSearch={(value) => handleChangeSearch(value)}
            onReload={() => handleReload()}
          />
        }
      >
        <UsersTable users={users} loading={loading} onClickRow={(record) => handleClickRow(record)} />
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
        bodyStyle={{ padding: "0", paddingTop: "5px" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        <TabData addresses={addresses} xcnfBenutzers={xcnfBenutzers} loading={addressesLoading} suggestions={suggestions} user={selectedUser} resetForm={() => resetForm()} updateForm={() => updateForm()} />

      </Card>
      {/* Users Detail Table End */}
    </>
  );
}


export default () => <Users />;