import React, { useState } from 'react';
import { Table, Input, InputNumber, Form, Button, Card } from 'antd';
import end_users from '../../database/end_users';
import MasterDetailTable from './master_detail_table';
import "./master_table.css";

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

const MasterTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [addresses, setAddresses] = useState();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      firstname: '',
      surname: '',
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
      title: 'ID',
      dataIndex: 'key',
      editable: false,
      defaultSortOrder: 'ascend',
      width: "80px"
      // sorter: (a, b) => b.key - a.key,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      editable: true,
      filters: [
        { text: 'Mr', value: 'Mr' },
        { text: 'Mrs', value: 'Mrs' },
      ],
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      width: "80px"
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      editable: true,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      editable: true,
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
          <Button size="small" disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
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
    console.log(addresses)
    return (
      <MasterDetailTable addresses={addresses} />
    );
  }

  const handleAddRow = () => {

    const newData = {
      key: (data.length + 1),
      firstname: "",
      surname: "",
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
        title="End Users"
        extra={<Button type="primary" onClick={() => handleAddRow()}>Add Row</Button>}
        bodyStyle={{ padding: "0" }}
      >

        <Form form={form} component={false}>
          <Table
            // loading={true}
            scroll={{ y: 250 }}
            size="small"
            components={{
              body: {
                cell: EditableCell,
              },
            }}

            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              position: [],
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => { setAddresses(record.addresses) },
              };
            }}
          />
        </Form>

      </Card>

      
      <RenderMasterDetailTable />
    </>
  );
};


export default MasterTable;