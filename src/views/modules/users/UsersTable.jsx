import React, { useState, memo } from 'react';
import { Table, Button, Tag } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { Resizable } from 'react-resizable';

const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{
                enableUserSelectHack: false,
            }}
        >
            <th {...restProps} />
        </Resizable>
    );
};


const UsersTable = memo(({ users, loading, pagination, onChangeUsers, onClickRow, onEditRow }) => {

    const [columns, setColumns] = useState([
        {
            title: 'Zugriff',
            dataIndex: 'ZUGRIFF',
        },
        {
            title: 'Titel',
            dataIndex: 'TITEL',
            width: "120px"
        },
        {
            title: 'Vorname',
            dataIndex: 'VORNAME',
        },
        {
            title: 'Nachname',
            dataIndex: 'NACHNAME',
            width: "220px"
        },
        {
            title: 'Mobil / Telefon',
            dataIndex: 'MOBILTELEFON',
            width: "120px",
            ellipsis: true
        },
        {
            title: 'OBK (J/N)',
            dataIndex: 'OBK_ZUTR',
            width: "100px",
            render: (_, record) => {
                return (record.OBK_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'MAP (J/N)',
            dataIndex: 'MAP_ZUTR',
            width: "100px",
            render: (_, record) => {
                return (record.MAP_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'MAP_DOK (J/N)',
            dataIndex: 'MAP_DOK_ZUTR',
            width: "120px",
            render: (_, record) => {
                return (record.MAP_DOK_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'ARTLEX (J/N)',
            dataIndex: 'ARTLEX_ZUTR',
            width: "110px",
            render: (_, record) => {
                return (record.ARTLEX_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'MW (J/N)',
            dataIndex: 'MW_ZUTR',
            width: "100px",
            render: (_, record) => {
                return (record.MW_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'ASP (J/N)',
            dataIndex: 'ASP_ZUTR',
            width: "100px",
            render: (_, record) => {
                return (record.ASP_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'MON (J/N)',
            dataIndex: 'MON_ZUTR',
            width: "100px",
            render: (_, record) => {
                return (record.MON_ZUTR == 1) ? "Yes" : "";
            }
        },
        {
            title: 'Status',
            dataIndex: 'STATUS_ID',
            render: (_, record) => {
                if (record.STATUS_ID == 0) {
                    return <Tag color='yellow' key={record.STATUS_ID}>Deaktiv</Tag>;
                }
                else if (record.STATUS_ID == 1) {
                    return <Tag color='blue' key={record.STATUS_ID}>Aktiv</Tag>;
                }
                else if (record.STATUS_ID == 2) {
                    return <Tag color='red' key={record.STATUS_ID}>Gel¿scht</Tag>
                }
                else {
                    return <></>;
                }
            },
            width: "80px",
            fixed: 'right',
        },
        {
            title: 'Aktion',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <Button size="small" onClick={() => onClickRow(record, "delete")}>
                            <DeleteOutlined />
                        </Button>
                    </>
                )
            },
            width: "80px",
            fixed: 'right',
        },
    ]);
    // const UsersTableColumns = [
    //     {
    //         title: 'Zugriff',
    //         dataIndex: 'ZUGRIFF',
    //     },
    //     {
    //         title: 'Titel',
    //         dataIndex: 'TITEL',
    //         width: "120px"
    //     },
    //     {
    //         title: 'Vorname',
    //         dataIndex: 'VORNAME',
    //     },
    //     {
    //         title: 'Nachname',
    //         dataIndex: 'NACHNAME',
    //         width: "220px"
    //     },
    //     {
    //         title: 'Mobil / Telefon',
    //         dataIndex: 'MOBILTELEFON',
    //         width: "120px",
    //         ellipsis: true
    //     },
    //     {
    //         title: 'OBK (J/N)',
    //         dataIndex: 'OBK_ZUTR',
    //         width: "100px",
    //         render: (_, record) => {
    //             return (record.OBK_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'MAP (J/N)',
    //         dataIndex: 'MAP_ZUTR',
    //         width: "100px",
    //         render: (_, record) => {
    //             return (record.MAP_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'MAP_DOK (J/N)',
    //         dataIndex: 'MAP_DOK_ZUTR',
    //         width: "120px",
    //         render: (_, record) => {
    //             return (record.MAP_DOK_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'ARTLEX (J/N)',
    //         dataIndex: 'ARTLEX_ZUTR',
    //         width: "110px",
    //         render: (_, record) => {
    //             return (record.ARTLEX_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'MW (J/N)',
    //         dataIndex: 'MW_ZUTR',
    //         width: "100px",
    //         render: (_, record) => {
    //             return (record.MW_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'ASP (J/N)',
    //         dataIndex: 'ASP_ZUTR',
    //         width: "100px",
    //         render: (_, record) => {
    //             return (record.ASP_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'MON (J/N)',
    //         dataIndex: 'MON_ZUTR',
    //         width: "100px",
    //         render: (_, record) => {
    //             return (record.MON_ZUTR == 1) ? "Yes" : "";
    //         }
    //     },
    //     {
    //         title: 'Status',
    //         dataIndex: 'STATUS_ID',
    //         render: (_, record) => {
    //             if (record.STATUS_ID == 0) {
    //                 return <Tag color='yellow' key={record.STATUS_ID}>Deaktiv</Tag>;
    //             }
    //             else if (record.STATUS_ID == 1) {
    //                 return <Tag color='blue' key={record.STATUS_ID}>Aktiv</Tag>;
    //             }
    //             else if (record.STATUS_ID == 2) {
    //                 return <Tag color='red' key={record.STATUS_ID}>Gel¿scht</Tag>
    //             }
    //             else {
    //                 return <></>;
    //             }
    //         },
    //         width: "80px",
    //         fixed: 'right',
    //     },
    //     {
    //         title: 'Aktion',
    //         dataIndex: 'operation',
    //         render: (_, record) => {
    //             return (
    //                 <>
    //                     <Button size="small" onClick={() => onClickRow(record, "delete")}>
    //                         <DeleteOutlined />
    //                     </Button>
    //                 </>
    //             )
    //         },
    //         width: "80px",
    //         fixed: 'right',
    //     },
    // ];

    const handleResize =
        (index) =>
            (_, { size }) => {
                const newColumns = [...columns];
                newColumns[index] = { ...newColumns[index], width: size.width };
                setColumns(newColumns);
            };

    const mergeColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({
            width: column.width,
            onResize: handleResize(index),
        }),
    }));

    return (
        <Table
            loading={loading}
            bordered
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            // scroll={{ x: 2000, y: 280 }}
            size="small"
            dataSource={users}
            columns={mergeColumns}
            pagination={pagination}
            // style={{ height: '380px' }}
            // onRow={(record, rowIndex) => {
            //     return {
            //         onClick: event => onClickRow(record), // click row
            //     };
            // }}
            // onChange={(newPagination) => onChangeUsers(newPagination)}
        />
    );
});


export default UsersTable;