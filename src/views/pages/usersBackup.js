import React, { useState, useEffect, useRef, memo } from "react";
import { Table, Input, Form, Button, Card, Popover, Space, Tag, Select, Checkbox, Row, Col, AutoComplete, DatePicker, message, Segmented, Switch, Radio } from 'antd';
// import UsersTable from "../components/UserTable";
import "../styles/users.css";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined, FilterOutlined, ReloadOutlined, UserOutlined, PhoneOutlined, GlobalOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const UsersTable = memo(({ users, loading, pagination, onChangeUsers, onClickRow, onEditRow }) => {

  const UsersTableColumns = [
    {
      title: 'Zugriff',
      dataIndex: 'ZUGRIFF',
      // sorter: (a, b) =>  a.ZUGRIFF.localeCompare(b.ZUGRIFF),
      defaultSortOrder: 'ascend',
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Titel',
      dataIndex: 'TITEL',
      width: "120px"
    },
    {
      title: 'Vorname',
      dataIndex: 'VORNAME',
      // sorter: true,
      // sorter: (a, b) => a.VORNAME - b.VORNAME,
    },
    {
      title: 'Nachname',
      dataIndex: 'NACHNAME',
      width: "220px"
    },
    {
      title: 'Mobil / Telefon',
      dataIndex: 'MOBILTELEFON',
      width: "120px"
    },
    {
      title: 'OBK (J/N)',
      dataIndex: 'OBK_ZUTR',
      width: "100px",
      render: (_, record) => {
        return (record.OBK_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'MAP (J/N)',
      dataIndex: 'MAP_ZUTR',
      width: "100px",
      render: (_, record) => {
        return (record.MAP_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'MAP_DOK (J/N)',
      dataIndex: 'MAP_DOK_ZUTR',
      width: "120px",
      render: (_, record) => {
        return (record.MAP_DOK_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'ARTLEX (J/N)',
      dataIndex: 'ARTLEX_ZUTR',
      width: "110px",
      render: (_, record) => {
        return (record.ARTLEX_ZUTR == 1) ? "Yes": "";
      }
    },
    {
      title: 'MW (J/N)',
      dataIndex: 'MW_ZUTR',
      width: "100px",
      render: (_, record) => {
        return (record.MW_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'ASP (J/N)',
      dataIndex: 'ASP_ZUTR',
      width: "100px",
      render: (_, record) => {
        return (record.ASP_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'MON (J/N)',
      dataIndex: 'MON_ZUTR',
      width: "100px",
      render: (_, record) => {
        return (record.MON_ZUTR == 1) ? "Yes" : "";
      }
    },
    {
      title: 'Status',
      dataIndex: 'STATUS_ID',
      render: (_, record) => {
        if(record.STATUS_ID == 0)
        {
          return  <Tag color='yellow' key={record.STATUS_ID}>Deaktiv</Tag>;
        }
        else if(record.STATUS_ID == 1)
        {
          return  <Tag color='blue' key={record.STATUS_ID}>Aktiv</Tag>;
        }
        else if(record.STATUS_ID == 2)
        {
          return <Tag color='red' key={record.STATUS_ID}>Gel¿scht</Tag>
        }
        else {
          return <></>;
        }
      },
      width: "80px",
      fixed: 'right',
    },
    {
      title: 'Aktion',
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
      width: "80px",
      fixed: 'right',
    },
  ];

  return <Table
    sticky
    loading={loading}
    bordered
    scroll={{ x: 2000, y: 280 }}
    size="small"
    dataSource={users}
    columns={UsersTableColumns}
    pagination={pagination}
    style={{ height: '380px' }}
    onRow={(record, rowIndex) => {
      return {
        onClick: event => onClickRow(record), // click row
      };
    }}
    onChange={(newPagination) => onChangeUsers(newPagination)}
  />
    ;
});

const AdressesTable = memo(({ addresses, loading }) => {

  const AdressesTableColumns = [
    {
      title: 'Dienstelle / Büro',
      dataIndex: 'DIENSTSTELLE_BUERO',
      editable: true,
    },
    {
      title: 'Straße',
      dataIndex: 'STRASSE',
      editable: true,
    },
    {
      title: 'PLZ',
      dataIndex: 'PLZ',
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
      title: 'Gelöscht Datum',
      dataIndex: 'GELOESCHT_AM',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'STATUS_ID',
      render: (_, record) => {
        if(record.STATUS_ID == 0)
        {
          return  <Tag color='yellow' key={record.STATUS_ID}>Deaktiv</Tag>;
        }
        else if(record.STATUS_ID == 1)
        {
          return  <Tag color='blue' key={record.STATUS_ID}>Aktiv</Tag>;
        }
        else if(record.STATUS_ID == 2)
        {
          return <Tag color='red' key={record.STATUS_ID}>Gel¿scht</Tag>
        }
        else {
          return <></>;
        }
      },
    },
    {
      title: 'Aktion',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <Button size="small">
            <EditOutlined />
          </Button>
        )
      },
    },
  ];

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
      title: 'XCNF-Benutzer ID ',
      dataIndex: 'BENUTZER_ID',
      editable: true,
    },
    {
      title: 'Aktion',
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
      const {OBK_ZUTR, MAP_ZUTR, MAP_DOK_ZUTR, ARTLEX_ZUTR, MW_ZUTR, ASP_ZUTR, MON_ZUTR} = user;
      let array = [];
      if(OBK_ZUTR == '1') array.push("OBK_ZUTR")
      if(MAP_ZUTR == '1') array.push("MAP_ZUTR")
      if(MAP_DOK_ZUTR == '1') array.push("MAP_DOK_ZUTR")
      if(ARTLEX_ZUTR == '1') array.push("ARTLEX_ZUTR")
      if(MW_ZUTR == '1') array.push("MW_ZUTR")
      if(ASP_ZUTR == '1') array.push("ASP_ZUTR")
      if(MON_ZUTR == '1') array.push("MON_ZUTR")

      setCheckbox(array);
    }
  }, [])

  const options = [
    { label: "OBK (J/N)", value: "OBK_ZUTR" },
    { label: "MAP (J/N)", value: "MAP_ZUTR" },
    { label: "MAP_DOK (J/N)", value: "MAP_DOK_ZUTR" },
    { label: "ARTLEX (J/N)", value: "ARTLEX_ZUTR" },
    { label: "MW (J/N)", value: "MW_ZUTR" },
    { label: "ASP (J/N)", value: "ASP_ZUTR" },
    { label: "MON (J/N)", value: "MON_ZUTR" },
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
      <Col md={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} xl={{span: 10, offset: 0}} xxl={{span: 8, offset: 0}}>
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
              <Form.Item wrapperCol={{ lg: 16, xl: 16, xxl: 16 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="ZUGRIFF" label="Zugriff:">
                <Input placeholder="Zugriff" allowClear suffix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 8 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="TITEL" label="Titel:">
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
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="VORNAME" label="Vorname:">
                <Input placeholder="Vorname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="NACHNAME" label="Nachname:">
                <Input placeholder="Nachname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="MOBILTELEFON" label="Mobil / Telefon:">
                <Input placeholder="Mobil / Telefon" allowClear suffix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="IP_ADRESSE" label="IP Adresse:">
                <Input placeholder="IP Adresse" allowClear suffix={<GlobalOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="STATUS_ID" label="Status:">
                <Select placeholder="Status">
                  <Select.Option value="1">Aktiv</Select.Option>
                  <Select.Option value="0">Deaktiv</Select.Option>
                  <Select.Option value="2">Gelöscht</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 9 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="ERSTELLT_AM" label="Erstellt Datum">
                <DatePicker placeholder="Erstellt Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 9 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="GELOESCHT_AM" label="Gelöscht Datum">
                <DatePicker placeholder="Gelöscht Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 8, xl:8, xxl:6 }} label="Fachanwendungen:">
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
              <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 8, xl:8, xxl:6 }} name="BEMERKUNG" label="Bemerkung:">
                <Input.TextArea rows={4} placeholder="Bemerkung" />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
              <Form.Item style={{ textAlign: 'center', marginTop: 10 }} >
                <Button type="primary" htmlType="submit" loading={loading}>
                  {(user) ? "Speichern" : "Speichern"}
                </Button>
                {(user) ? (
                  <Button htmlType="button" onClick={handleReset}>
                   Neu Anwender
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


const UserFilters = ({ onSearch, onReload, onFilter }) => {
  const [popover, setPopover] = useState(false);
  const handlePopover = (value) => {
    setPopover(value);
  };
  return (
    <Space>
      <Button size="small" onClick={() => onReload()}><ReloadOutlined /></Button>
      <Form>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Input.Search size="small" allowClear placeholder="Search..." onSearch={(value) => onSearch(value)} />
        </Form.Item>
      </Form>
      <Radio.Group size="small" onChange={(value) => onFilter(value)}>
        <Radio.Button value="1">Aktiv</Radio.Button>
        <Radio.Button value="0">Deaktiv</Radio.Button>
        <Radio.Button value="2">Gel¿scht</Radio.Button>
      </Radio.Group>
      {/* <Popover content={<a>Close</a>} title="Title" trigger="click" visible={popover} onVisibleChange={handlePopover}>
        <Button size="small"><FilterOutlined /> Filter</Button>
      </Popover> */}
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
    limit: 100,
    search: "",
    status: 1,
    sort: "VORNAME",
    order: "ASC"
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })

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
    setPagination({
      ...pagination,
      total: response.data.metadata.total
    });
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
    setPagination({
      ...pagination,
      total: response.data.metadata.total
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
      tab: 'XCNF-Benutzer',
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

  const onChangeUsers = (newPagination) => {
    console.log(newPagination)
    setLoading(true);
    const _filters = {
      ...filters,
      offset: (newPagination.current - 1) * newPagination.pageSize
    };
    setFilters({
      ...filters,
      offset: (newPagination.current - 1) * newPagination.pageSize,
    });
    setPagination({
      ...pagination,
      current: newPagination.current
    });
    fetchUsersWithFilters(_filters);
  }


  const handlOnFilter = (e) => {
    setLoading(true);
    const _filters = {
      ...filters,
      status: parseInt(e.target.value)
    };

    setFilters({
      ...filters,
      status: parseInt(e.target.value)
    });
    fetchUsersWithFilters(_filters);
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
            onFilter={(value) => handlOnFilter(value)}
          />
        }
      >
        <UsersTable users={users} loading={loading} pagination={pagination} onChangeUsers={(newPagination) => onChangeUsers(newPagination)} onClickRow={(record) => handleClickRow(record)} />
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