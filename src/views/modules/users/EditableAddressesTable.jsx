import React, { useState } from 'react';
import { Table, Input, DatePicker, Popconfirm, Form, message, Tag, Button, Select } from 'antd';
import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';


const RenderInput = (inputType, dataIndex) => {
    switch (inputType) {
        case "date":
            return (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                >
                    <DatePicker format="MM-DD-YYYY" size="small" />
                </Form.Item>
            );
        case "select":
            return (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
                    <Select size="small" placeholder="Status">
                        <Select.Option value="1">Aktiv</Select.Option>
                        <Select.Option value="0">Deaktiv</Select.Option>
                        <Select.Option value="2">Gelöscht</Select.Option>
                    </Select>
                </Form.Item>
            );
        default:
            return (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
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

    return (
        <td {...restProps}>
            {editing ? (
                <>
                    {RenderInput(inputType, dataIndex)}
                </>
            ) : (
                children
            )}
        </td>
    );
};

const EditableAddressesTable = ({ addresses, loading, user }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(addresses);
    const [addressesLoading, setAddressesLoading] = useState(loading);
    const [editingKey, setEditingKey] = useState('');
    const [newRow, setNewRow] = useState('');

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
            GELOESCHT_AM: (GELOESCHT_AM) ? moment(GELOESCHT_AM, 'MM-DD-YYYY') : '',
            STATUS_ID: STATUS_ID.toString() || '1',
        });
        setEditingKey(record.key);
    };

    const cancel = (key) => {
        if (key === newRow.key) {
            const fi = data.filter(record => record.key !== key);
            setData(fi);
        }
        setNewRow('');
        setEditingKey('');
    };

    const CreateAddress = async (record, key) => {
        setAddressesLoading(true);
        try {
            const response = await axios.post(`http://localhost:4400/api/v1/addresses/user/${user.ANWENDER_ID}`, {
                ...record
            });

            if (response.status === 201) {

                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...record });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(record);
                    setData(newData);
                    setEditingKey('');
                }

                setNewRow('');

                setTimeout(() => {
                    message.success({
                        content: response.data.message,
                        key: 'updatable',
                        duration: 3,
                    });
                    setAddressesLoading(false)
                }, 100);
            }

        }
        catch (error) {
            if (error.response.status === 500) {
                setTimeout(() => {
                    message.error({
                        content: error.response.data.message,
                        key: 'updatable',
                        duration: 3,
                    });
                    setAddressesLoading(false)
                }, 100);
            }
        }
    }

    const UpdateAddress = async (record, key, ADRESSE_ID) => {
        setAddressesLoading(true);
        try {
            const response = await axios.put(`http://localhost:4400/api/v1/addresses/${ADRESSE_ID}`, {
                ...record
            });

            if (response.status === 201) {

                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, { ...item, ...record });
                    setData(newData);
                    setEditingKey('');
                } else {
                    newData.push(record);
                    setData(newData);
                    setEditingKey('');
                }

                setNewRow('');

                setTimeout(() => {
                    message.success({
                        content: response.data.message,
                        key: 'updatable',
                        duration: 3,
                    });
                    setAddressesLoading(false)
                }, 100);
            }

        }
        catch (error) {
            if (error.response.status === 500) {
                setTimeout(() => {
                    message.error({
                        content: error.response.data.message,
                        key: 'updatable',
                        duration: 3,
                    });
                    setAddressesLoading(false)
                }, 100);
            }
        }
    }

    const save = async (key) => {

        const STATUS_ID = form.getFieldValue('STATUS_ID');
        const GELOESCHT_AM = form.getFieldValue('GELOESCHT_AM');
        if (STATUS_ID == '2' && GELOESCHT_AM == '') {
            return (
                message.error({
                    content: 'Please select date to save data',
                    key: 'updatable',
                    duration: 3,
                })
            );

        }

        if (newRow) {
            let row = await form.getFieldsValue();
            CreateAddress(row, key);
        }
        else {
            let row = await form.getFieldsValue();
            const {ADRESSE_ID} = data.filter(item => item.key === key)[0]
            UpdateAddress(row, key, ADRESSE_ID);
        }

    };

    const columns = [
        {
            title: 'Dienstelle / Büro',
            dataIndex: 'DIENSTSTELLE_BUERO',
            editable: true,
            width: 260,
        },
        {
            title: 'Straße',
            dataIndex: 'STRASSE',
            editable: true,
            width: 260,
        },
        {
            title: 'PLZ',
            dataIndex: 'PLZ',
            editable: true,
            width: 100,
        },
        {
            title: 'Ort',
            dataIndex: 'ORT',
            editable: true,
            width: 120,
        },
        {
            title: 'Telefon',
            dataIndex: 'TELEFON',
            editable: true,
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'EMAIL',
            editable: true,
            width: 150,
        },
        {
            title: 'Benutzername',
            dataIndex: 'BENUTZERNAME',
            editable: true,
            width: 150,
        },
        {
            title: 'Passwort',
            dataIndex: 'PASSWORT',
            editable: true,
            width: 150,
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
            width: 150,
            editable: true,
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
                        <Popconfirm title="Wollen Sie wir ?" cancelText="Abbrechen" onConfirm={() => cancel(record.key)}>
                            <Button
                                size="small"
                            >
                                <StopOutlined />
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

        if (col.dataIndex === 'GELOESCHT_AM') {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'date',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        }
        else if (col.dataIndex === 'STATUS_ID') {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'select',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        }
        else {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        }
    });


    const addNewRow = () => {

        let key = 0;
        if (data && data.length > 0) {
            key = data.length;

        }

        const newData = {
            DIENSTSTELLE_BUERO: '',
            STRASSE: '',
            PLZ: '',
            ORT: '',
            TELEFON: '',
            EMAIL: '',
            BENUTZERNAME: '',
            PASSWORT: '',
            GELOESCHT_AM: '',
            STATUS_ID: '1',
            key: key,
        };

        setNewRow(newData);

        if (data) {
            setData([...data, newData]);
        }
        else {
            setData([newData]);
        }

        edit(newData);

    }

    return (
        <Form
            form={form}
            component={false}
        >
            <Table
                bordered
                loading={addressesLoading}
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
            // style={{ height: '250px' }}
            />
            {user ? (
                <Button
                    size="small"
                    style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "5px" }}
                    onClick={addNewRow}
                    disabled={editingKey !== ''}
                >
                    Neu Adresse
                </Button>
            ) : <></>}
        </Form>
    );
};

export default EditableAddressesTable;