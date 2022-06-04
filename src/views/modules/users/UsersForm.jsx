import React, {useState, useEffect, memo} from 'react';
import {Form, Row, Col, Button, message, Input, Select, AutoComplete, DatePicker, Checkbox} from "antd";
import { LockOutlined, UserOutlined, IdcardOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const UsetsForm = memo(({ suggestions, user, resetForm, updateForm }) => {
    const [checkbox, setCheckbox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('create');
    const [status, setStatus] = useState('');
    const [form] = Form.useForm();


    useEffect(() => {
        if (user) {
            setAction('update')
            const { OBK_ZUTR, MAP_ZUTR, MAP_DOK_ZUTR, ARTLEX_ZUTR, MW_ZUTR, ASP_ZUTR, MON_ZUTR } = user;
            let array = [];
            if (OBK_ZUTR == '1') array.push("OBK_ZUTR")
            if (MAP_ZUTR == '1') array.push("MAP_ZUTR")
            if (MAP_DOK_ZUTR == '1') array.push("MAP_DOK_ZUTR")
            if (ARTLEX_ZUTR == '1') array.push("ARTLEX_ZUTR")
            if (MW_ZUTR == '1') array.push("MW_ZUTR")
            if (ASP_ZUTR == '1') array.push("ASP_ZUTR")
            if (MON_ZUTR == '1') array.push("MON_ZUTR")

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

    const handleChangeStatus = (value) => {
        setStatus(value);
    }

    const ERSTELLT_AM = (value) => {
        if(user && user.ERSTELLT_AM !== null)
        {
            return moment(user.ERSTELLT_AM);
        }
        else if(user && user.ERSTELLT_AM === null)
        {
            return '';
        }
        else if(!user)
        {
            return moment(moment(), 'MM-DD-YYYY');
        }
        return '';
    }

    const GELOESCHT_AM = () => {
        if(user && user.GELOESCHT_AM !== null)
        {
            return moment(user.GELOESCHT_AM);
        }
        else if(user && user.GELOESCHT_AM === null)
        {
            return '';
        }
        return '';
    }

    return (
        <Row style={{ padding: "20px" }} >
            <Col md={{ span: 12, offset: 0 }} lg={{ span: 12, offset: 0 }} xl={{ span: 10, offset: 0 }} xxl={{ span: 8, offset: 0 }}>
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
                        ERSTELLT_AM: ERSTELLT_AM(),
                        GELOESCHT_AM: GELOESCHT_AM(),
                        BEMERKUNG: (user) ? user.BEMERKUNG : ''
                    }}
                >
                    <Row gutter={[16, 0]}>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 16, xl: 16, xxl: 16 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="ZUGRIFF" label="Zugriff:">
                                <Input placeholder="Zugriff" allowClear suffix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 8 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="TITEL" label="Titel:">
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
                            <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="VORNAME" label="Vorname:">
                                <Input placeholder="Vorname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="NACHNAME" label="Nachname:">
                                <Input placeholder="Nachname" allowClear suffix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="MOBILTELEFON" label="Mobil / Telefon:">
                                <Input placeholder="Mobil / Telefon" allowClear suffix={<PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 16 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="IP_ADRESSE" label="IP Adresse:">
                                <Input placeholder="IP Adresse" allowClear suffix={<GlobalOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 6 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="STATUS_ID" label="Status:">
                                <Select placeholder="Status" onChange={handleChangeStatus}>
                                    <Select.Option value="1">Aktiv</Select.Option>
                                    <Select.Option value="0">Deaktiv</Select.Option>
                                    <Select.Option value="2">Gelöscht</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item 
                                wrapperCol={{ lg: 9 }} 
                                labelCol={{ lg: 8, xl: 8, xxl: 6 }} 
                                name="ERSTELLT_AM" 
                                label="Erstellt Datum"
                                rules={[
                                {
                                    required: false,
                                    message: '',
                                },
                                ]}
                            >
                                <DatePicker placeholder="Erstellt Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item 
                                wrapperCol={{ lg: 9 }} 
                                labelCol={{ lg: 8, xl: 8, xxl: 6 }} 
                                name="GELOESCHT_AM" 
                                label="Gelöscht Datum"
                                rules={[
                                {
                                    required: (status == '2') ? true : false,
                                    message: '',
                                },
                                ]}
                            >
                                <DatePicker placeholder="Gelöscht Datum" format="MM-DD-YYYY" style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                            <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} label="Fachanwendungen:">
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
                            <Form.Item wrapperCol={{ lg: 19 }} labelCol={{ lg: 8, xl: 8, xxl: 6 }} name="BEMERKUNG" label="Bemerkung:">
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


export default UsetsForm;