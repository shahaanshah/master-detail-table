import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Form, Button, Card, Tag } from 'antd';
import end_users from '../../database/end_users';
import MasterDetailTable from './master_detail_table';
import "./master_table.css";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const originData = end_users;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UsersTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [addresses, setAddresses] = useState();
  const [editingKey, setEditingKey] = useState('');
  const [users, setUsers] = useState(originData);




  // useEffect(() => {
  //   axios.get("http://localhost:4400/api/v1/users").then((response) =>  {
  //     const d = response.data.map((item, key) => {
  //       item.key = key
  //       return item;
  //     })
  //     console.log(d)
  //     setUsers(d)
  //   })
  // },[])





  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      firstname: '',
      lastname: '',
      title: '',
      phone: '',
      ip_address: '',
      status_id: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'ANWENDER_ID',
      dataIndex: 'ANWENDER_ID',
      editable: false,
      defaultSortOrder: 'ascend',
      width: "120px"
      // sorter: (a, b) => b.key - a.key,
    },
    {
      title: 'TITEL',
      dataIndex: 'TITEL',
      editable: true,
      // filters: [
      //   { text: 'Mr', value: 'Mr' },
      //   { text: 'Mrs', value: 'Mrs' },
      // ],
      // onFilter: (value, record) => record.title.indexOf(value) === 0,
      width: "80px"
    },
    {
      title: 'VORNAME',
      dataIndex: 'VORNAME',
      editable: true,
    },
    {
      title: 'NACHNAME',
      dataIndex: 'NACHNAME',
      editable: true,
    },
    {
      title: 'OBK',
      dataIndex: 'OBK',
      editable: true,
      width: "50px",
      render: (_, record) => {
        return (record.OBK == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'MAP',
      dataIndex: 'MAP',
      editable: true,
      width: "50px",
      render: (_, record) => {
        return (record.MAP == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'MAP_DOK',
      dataIndex: 'MAP_DOK',
      editable: true,
      width: "90px",
      render: (_, record) => {
        return (record.MAP_DOK == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'ARTLEX',
      dataIndex: 'ARTLEX',
      editable: true,
      width: "70px",
      render: (_, record) => {
        return (record.ARTLEX == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'MW',
      dataIndex: 'MW',
      editable: true,
      width: "50px",
      render: (_, record) => {
        return (record.MW == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'ASP',
      dataIndex: 'ASP',
      editable: true,
      width: "50px",
      render: (_, record) => {
        return (record.ASP == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    {
      title: 'MON',
      dataIndex: 'MON',
      editable: true,
      width: "60px",
      render: (_, record) => {
        return (record.MON == "x") ? <CloseOutlined style={{ color: "red" }} /> : <CheckOutlined style={{ color: "green" }} />;
      }
    },
    // {
    //   title: 'BEMERKUNG',
    //   dataIndex: 'BEMERKUNG',
    //   editable: true,
    // },
    {
      title: 'MOBILTELEFON',
      dataIndex: 'MOBILTELEFON',
      editable: true,
    },
    {
      title: 'ASP_BENUTZERNAME',
      dataIndex: 'ASP_BENUTZERNAME',
      editable: true,
      width: "160px"
    },
    {
      title: 'IP_ADRESSE',
      dataIndex: 'IP_ADRESSE',
      editable: true,
    },
    {
      title: 'MW_BENUTZERNAME',
      dataIndex: 'MW_BENUTZERNAME',
      editable: true,
      width: "160px"
    },
    {
      title: 'STATUS',
      dataIndex: 'STATUS_ID',
      editable: true,
      width: "70px",
      render: (_, record) => {
        return (record.STATUS_ID == 1) ? <Tag color='green' key={record.STATUS_ID}>Active</Tag> : "";
      }
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Button onClick={() => cancel()}>Cancel</Button>
          </span>
        ) : (
          <>
            <Button size="small" disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 5 }}>
              <EditOutlined />
            </Button>
            <Button size="small" type="primary" danger disabled={editingKey !== ''} onClick={() => edit(record)}>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  const RenderMasterDetailTable = () => {
    return (
      <MasterDetailTable addresses={addresses} />
    );
  }

  const handleAddRow = () => {

    const newData = {
      key: (data.length + 1),
      firstname: "",
      lastname: "",
      title: "",
      phone: "",
      ip_address: "",
      status_id: 1,
      created_at: "",
      deleted_at: "",
    };
    console.log(newData);
    setData([...data, newData]);
    edit(newData);
  }

  return (
    <>
      <Card
        bordered
        size="small"
        type="inner"
        title="ANWENDER"
        extra={<Button type="primary" onClick={() => handleAddRow()}>Add Row</Button>}
        bodyStyle={{ padding: "0" }}

      >

        <Form form={form} component={false}>
          <Table
            // loading={true}
            bordered
            scroll={{ y: 350 }}
            size="small"
            components={{
              body: {
                cell: EditableCell,
              },
            }}

            dataSource={users}
            columns={mergedColumns}
            rowClassName="editable-row"
            // pagination={{
            //   position: [],
            // }}
            pagination={{ pageSize: 100 }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => { setAddresses(record.addresses) },
              };
            }}
          />
        </Form>

      </Card>


      {/* <RenderMasterDetailTable /> */}
    </>
  );
};


export default UsersTable;