import React, {memo} from 'react';
import {Table, Button, Tag} from "antd";
import { EditOutlined } from '@ant-design/icons';

const AddressesTable = memo(({ addresses, loading }) => {

    const AdressesTableColumns = [
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
            width: 120,
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'STATUS_ID',
            width: 65,
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
            width: 80,
            render: (_, record) => {
                return (
                    <Button size="small">
                        <EditOutlined />
                    </Button>
                )
            },
        },
    ];

    return (
        <Table
            loading={loading}
            scroll={{ x: 1700, y: 250 }}
            size="small"
            dataSource={addresses}
            columns={AdressesTableColumns}
            pagination={false}
            style={{ height: '250px' }}
        />
    );
});


export default AddressesTable;