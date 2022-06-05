import React, { useState, useEffect } from "react";
import { Card } from 'antd';
import "../styles/users.css";
import axios from 'axios';
import UsersTable from '../modules/users/UsersTable';
import UserFilters from '../modules/users/UserFilters';
import ResizeableUsersTable from "../modules/users/ResizeableUsersTable";
import UsersForm from "../modules/users/UsersForm";
import AddressesTable from "../modules/users/AddressesTable";
import EditableAddressesTable from "../modules/users/EditableAddressesTable";
import XcnfBenutzerTable from "../modules/users/XcnfBenutzerTable";
import EditableXcnfBenutzerTable from "../modules/users/EditableXcnfBenutzerTable";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [addresses, setAddresses] = useState();
  const [xcnfBenutzers, setXcnfBenutzers] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetailLoading, setUserDetailLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('UsersForm');
  const [filters, setFilters] = useState({
    offset: 0,
    limit: 100,
    search: "",
    status: 1,
    sort: "VORNAME",
    order: "ASC",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  })

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:4400/api/v1/users");
    setUsers(response.data.data);
    setPagination({...pagination, total: response.data.metadata.total});
    const filterd = response.data.data.filter(item => item.TITEL !== null && item.TITEL !== undefined).map(item => item.TITEL.replace(/\s/g, ''));
    const suggs = [...new Set(filterd)].map(item => { return { value: item } });
    if (selectedUser) {
      const select = response.data.data.filter(item => item.ANWENDER_ID === selectedUser.ANWENDER_ID)[0];
      setSelectedUser(select);
    }
    setSuggestions(suggs);
    setLoading(false);
  }

  const searchUsers = async(serach) => {
    setLoading(true);
    const _filters = { ...filters, search: serach};
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: _filters
    });
    console.log(response.data.metadata.total)
    setUsers(response.data.data);
    setFilters({...filters, search: serach});
    setPagination({...pagination, total: response.data.metadata.total});
    setLoading(false);
  }

  const nextPageUsers = async(newPagination) => {
    setLoading(true);
    const _filters = { ...filters, offset: (newPagination.current - 1) * newPagination.pageSize};
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: _filters
    });
    setUsers(response.data.data);
    setFilters({
      ...filters,
      offset: (newPagination.current - 1) * newPagination.pageSize,
    });
    setPagination({
      ...pagination,
      current: newPagination.current,
      total: response.data.metadata.total
    });
    setLoading(false);
  }

  const switchStatusUsers = async(value) => {
    setLoading(true);
    const _filters = { ...filters, offset: 0, status: parseInt(value)};
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: _filters
    });
    setUsers(response.data.data);
    setFilters({
      ...filters,
      offset: 0,
      status: parseInt(value)
    });
    setPagination({
      ...pagination,
      current: 1,
      total: response.data.metadata.total
    });
    setLoading(false);
  }

  const fetchUsersWithFilters = async() => {
    setLoading(true);
    const response = await axios.get("http://localhost:4400/api/v1/users", {
      params: filters
    });
    setUsers(response.data.data);
    setPagination({...pagination, total: response.data.metadata.total});
    setLoading(false);
  }

  
  const handleClickRow = (record) => {
    setSelectedUser(record);
    fetchUserDetails(record);
  }

  const fetchUserDetails = async (record) => {
    setUserDetailLoading(true);
    const response = await axios.get(`http://localhost:4400/api/v1/addresses/user/${record.ANWENDER_ID}`);
    console.log(response)
    setAddresses(response.data.adresse);
    setXcnfBenutzers(response.data.xcnf_benutzers);
    setUserDetailLoading(false);
  }

  const handleReload = (value) => switchStatusUsers(value);
  const resetForm = () => setSelectedUser('');
  const updateForm = () => fetchUsersWithFilters();
  const onChangePagination = (newPagination) => nextPageUsers(newPagination);
  const handleFilterBySearch = (value) => searchUsers(value);
  const handlFilterByStatus = (value) => switchStatusUsers(value);

  const UserTabsList = [
    {
      key: 'UsersForm',
      tab: 'NAIS Anwender',
    },
    {
      key: 'Adresses',
      tab: 'Anwender Adresse',
    },
    {
      key: 'XcnfBenutzer',
      tab: 'XCNF-Benutzer',
    },
    {
      key: 'eTokenHistorie',
      tab: 'eToken Historie'
    }
  ];

  const UserTabs = ({ addresses, xcnfBenutzers, loading, suggestions, user, resetForm, updateForm }) => {
    if (activeTabKey == "UsersForm")
      return <UsersForm suggestions={suggestions} user={user} resetForm={resetForm} updateForm={updateForm} />;

    if (activeTabKey == "Adresses")
      return <EditableAddressesTable addresses={addresses} loading={loading} user={user} />;

    if (activeTabKey == "XcnfBenutzer")
      return <EditableXcnfBenutzerTable loading={loading} xcnfBenutzers={xcnfBenutzers} user={user} />;
    
    if(activeTabKey == "eTokenHistorie")
      return <></>;
  }

  const onTabChange = (key) => setActiveTabKey(key);

  const handleOnResetSelectedRow = () => {
    console.log("onResetSelectedRow")
    setSelectedUser('');
    setAddresses([]);
    setXcnfBenutzers([]);
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
            onReload={(status) => handleReload(status)}
            onFilterBySearch={(value) => handleFilterBySearch(value)}
            onFilterByStatus={(value) => handlFilterByStatus(value)}
          />
        }
      >
        <ResizeableUsersTable
          users={users}
          loading={loading}
          pagination={pagination}
          onChangePagination={(newPagination) => onChangePagination(newPagination)}
          onClickRow={(record) => handleClickRow(record)}
          onResetSelectedRow={() => handleOnResetSelectedRow()}
        />
        {/* <UsersTable users={users} loading={loading} pagination={pagination} onChangeUsers={(newPagination) => onChangeUsers(newPagination)} onClickRow={(record) => handleClickRow(record)} /> */}
      </Card>
      {/* Users Master Table End */}

      {/* Users Detail Table Start */}
      <Card
        bordered
        size="small"
        type="inner"
        style={{ marginTop: "20px" }}
        bodyStyle={{ padding: "0", paddingTop: "5px" }}
        tabList={UserTabsList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        <UserTabs
          addresses={addresses}
          xcnfBenutzers={xcnfBenutzers}
          loading={userDetailLoading}
          suggestions={suggestions}
          user={selectedUser}
          resetForm={() => resetForm()}
          updateForm={() => updateForm()}
        />

      </Card>
      {/* Users Detail Table End */}
    </>
  );
}


export default () => <Users />;