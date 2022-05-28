import React, { useState } from 'react';
import { Table, Input, InputNumber, Form, Button, Card } from 'antd';

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

const MasterDetailTable = ({addresses}) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(addresses);
    const [editingKey, setEditingKey] = useState('');
    const [activeTabKey, setActiveTabKey] = useState('Adresses');
  
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
        title: 'Username',
        dataIndex: 'username',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        editable: true,
      },
      {
        title: 'Password',
        dataIndex: 'password',
        editable: true,
      },
      {
        title: 'City',
        dataIndex: 'city',
        editable: true,
      },
      {
        title: 'Street',
        dataIndex: 'street',
        editable: true,
      },
      {
        title: 'Postal Code',
        dataIndex: 'postal_code',
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

    const tabListNoTitle = [
      {
        key: 'Adresses',
        tab: 'Adresses',
      },
      {
        key: 'Tokens',
        tab: 'Tokens',
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

    const onTabChange = (key) => {
      setActiveTabKey(key);
    };

    return (
    <Card
        bordered
        size="small"
        type="inner"
        // title="Addresses"
        // extra={<Button type="primary">Add Row</Button>}
        style={{marginTop: "20px"}}
        bodyStyle={{ padding: "0" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
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
            onChange: cancel,
          }}
          onRow={(record, rowIndex) => {
          return {
            onMouseEnter: event => {console.log(record.id)},
          };
        }}
        />
      </Form>
    </Card>

    );
};


export default MasterDetailTable;