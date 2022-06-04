import React, { useState, useEffect } from 'react';
import { Space, Button, Form, Input, Radio, Select } from "antd";
import { ReloadOutlined } from '@ant-design/icons';

const UserFilters = ({ onFilterBySearch, onReload, onFilterByStatus }) => {

  const [activeStatus, setActiveStatus] = useState("1");

  const handleOnChangeStatus = (value) => {
    setActiveStatus(value);
    onFilterByStatus(value);
  }

  const handleOnChangeSearch = (value) => {
    onFilterBySearch(value);
  }

  const handleOnReload = () => {
    onReload(activeStatus);
  }

  return (
    <Space>
      <Button size="small" onClick={() => handleOnReload()}><ReloadOutlined /></Button>
      <Form>
        <Form.Item style={{ marginBottom: "0px" }}>
          <Input.Search size="small" allowClear placeholder="Suche..." onSearch={(value) => handleOnChangeSearch(value)} />
        </Form.Item>
      </Form>
      <Select
        size="small"
        placeholder="Select a person"
        optionFilterProp="children"
        value={activeStatus}
        onChange={(value) => handleOnChangeStatus(value)}
        style={{ width: 100}}
      >
        <Select.Option value="-1">Alle</Select.Option>
        <Select.Option value="1">Aktiv</Select.Option>
        <Select.Option value="0">Deaktiv</Select.Option>
        <Select.Option value="2">Gelöscht</Select.Option>
      </Select>
    </Space>
  );
}

export default UserFilters;