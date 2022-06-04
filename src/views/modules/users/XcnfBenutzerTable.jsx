import React, {memo} from 'react';
import {Table, Button} from "antd";
import { EditOutlined } from '@ant-design/icons';

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
            <EditOutlined />
          </Button>
        )
      },
    },
  ];

  return (
    <Table
      loading={loading}
      scroll={{ y: 250 }}
      size="small"
      dataSource={xcnf_benutzers}
      columns={XcnfBenutzerTableColumns}
      pagination={false}
      style={{ height: '250px' }}
    />
  );
});

export default XcnfBenutzerTable;