import React, { useState } from 'react';
import { Table, Input, DatePicker, Popconfirm, Form, Typography, Tag, Button, } from 'antd';
import { EditOutlined, SaveOutlined, CloseSquareOutlined } from '@ant-design/icons';
import moment from 'moment';


const RenderInput = (inputType, dataIndex) => {
    switch (inputType) {
        case "date":
            return (
                <Form.Item name={dataIndex}>
                    <DatePicker format="MM-DD-YYYY" size="small" />
                </Form.Item>
            );
        case "text":
            return (
                <Form.Item name={dataIndex}>
                    <Input size="small" />
                </Form.Item>

            );
        default:
            return (
                <Form.Item name={dataIndex}>
                    <Input size="small" />
                </Form.Item>
            )

    }
}

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

    const inputNode = inputType === 'date' ? <DatePicker format="MM-DD-YYYY" size="small" /> : <Input size="small" />;

    return (
        <td {...restProps}>
            {editing ? (
                <>
                    {RenderInput(inputType, dataIndex)}
                    {/* {
                    (inputType === 'date') ? (
                        <Form.Item name={dataIndex}> 
                            {(record.GELOESCHT_AM) ? (
                                <DatePicker format="MM-DD-YYYY" defaultValue={moment(record.GELOESCHT_AM)} size="small" /> 
                            ) : (
                                <DatePicker format="MM-DD-YYYY" size="small" /> 
                            )}
                        </Form.Item>
                    ) : (
                        <Form.Item name={dataIndex}> 
                            <Input size="small" defaultValue={children[1]} /> 
                        </Form.Item>
                    )
                } */}
                </>
            ) : (
                children
            )}
        </td>
    );
};

const EditableAddressesTable = ({ addresses, loading }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(addresses);
    const [editingKey, setEditingKey] = useState('');

    console.log(addresses)

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        const { DIENSTSTELLE_BUERO, STRASSE, PLZ, ORT, TELEFON, EMAIL, BENUTZERNAME, PASSWORT, GELOESCHT_AM, STATUS_ID } = record;
        form.setFieldsValue({
            DIENSTSTELLE_BUERO: DIENSTSTELLE_BUERO || '',
            STRASSE: STRASSE || '',
            PLZ: PLZ || '',
            ORT: ORT || '',
            TELEFON: TELEFON || '',
            EMAIL: EMAIL || '',
            BENUTZERNAME: BENUTZERNAME || '',
            PASSWORT: PASSWORT || '',
            GELOESCHT_AM: (GELOESCHT_AM) ? moment(GELOESCHT_AM) : '',
            STATUS_ID: STATUS_ID || '',
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
            title: 'Dienstelle / Büro',
            dataIndex: 'DIENSTSTELLE_BUERO',
            width: 260,
            editable: true,
        },
        {
            title: 'Straße',
            dataIndex: 'STRASSE',
            width: 260,
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
            width: 150,
            editable: true,
            render: (_, record) => {
                return (record.GELOESCHT_AM) ? moment(record.GELOESCHT_AM).format("MM-DD-YYYY") : '';
            }
        },
        {
            title: 'Status',
            dataIndex: 'STATUS_ID',
            width: 75,
            render: (_, record) => {
                if (record.STATUS_ID == 0) {
                    return <Tag color='yellow' key={record.STATUS_ID}>Deaktiv</Tag>;
                }
                else if (record.STATUS_ID == 1) {
                    return <Tag color='blue' key={record.STATUS_ID}>Aktiv</Tag>;
                }
                else if (record.STATUS_ID == 2) {
                    return <Tag color='red' key={record.STATUS_ID}>Gelöscht</Tag>
                }
                else {
                    return <></>;
                }
            },
        },
        {
            title: 'Aktion',
            dataIndex: 'operation',
            width: 100,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            size="small"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            <SaveOutlined />
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button
                                size="small">
                                <CloseSquareOutlined />
                            </Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <Button
                        size="small"
                        disabled={editingKey !== ''}
                        onClick={() => edit(record)}>
                        <EditOutlined />
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
                inputType: col.dataIndex === 'GELOESCHT_AM' ? 'date' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                bordered
                loading={loading}
                scroll={{ x: 1700, y: 250 }}
                size="small"
                pagination={false}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}

                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                style={{ height: '250px' }}
            />
        </Form>
    );
};

export default EditableAddressesTable;