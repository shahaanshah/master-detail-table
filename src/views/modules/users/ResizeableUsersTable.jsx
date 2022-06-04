import React, { useState } from 'react';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import { Button, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

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

const ResizeableUsersTable = ({ users, loading, pagination, onChangePagination, onClickRow, onResetSelectedRow }) => {

    const handleOnDelete = (event, record) => {
        event.stopPropagation();
        
    }

    const [columns, setColumns] = useState([
        {
            title: 'Zugriff',
            dataIndex: 'ZUGRIFF',
            width: 220,
            ellipsis: true
        },
        {
            title: 'Titel',
            dataIndex: 'TITEL',
            width: 120,
            ellipsis: true
        },
        {
            title: 'Vorname',
            dataIndex: 'VORNAME',
            width: 140,
            ellipsis: true
        },
        {
            title: 'Nachname',
            dataIndex: 'NACHNAME',
            width: 160,
            ellipsis: true
        },
        {
            title: 'Mobil / Telefon',
            dataIndex: 'MOBILTELEFON',
            width: 100,
            ellipsis: true
        },
        {
            title: 'OBK (J/N)',
            dataIndex: 'OBK_ZUTR',
            width: 65,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.OBK_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'MAP (J/N)',
            dataIndex: 'MAP_ZUTR',
            width: 65,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.MAP_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'MAP_DOK (J/N)',
            dataIndex: 'MAP_DOK_ZUTR',
            width: 95,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.MAP_DOK_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'ARTLEX (J/N)',
            dataIndex: 'ARTLEX_ZUTR',
            width: 80,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.ARTLEX_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'MW (J/N)',
            dataIndex: 'MW_ZUTR',
            width: 65,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.MW_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'ASP (J/N)',
            dataIndex: 'ASP_ZUTR',
            width: 65,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.ASP_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'MON (J/N)',
            dataIndex: 'MON_ZUTR',
            width: 75,
            align: 'center',
            ellipsis: true,
            render: (_, record) => {
                return (record.MON_ZUTR == 1) ? <CheckOutlined style={{color: "#237804"}} /> : "";
            }
        },
        {
            title: 'Status',
            dataIndex: 'STATUS_ID',
            width: 65,
            ellipsis: false,
            // fixed: 'right',
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
        // {
        //     title: 'Aktion',
        //     dataIndex: 'operation',
        //     width: 80,
        //     ellipsis: false,
        //     // fixed: 'right',
        //     render: (_, record) => {
        //         return (
        //             <>
        //                 <Button size="small" onClick={(event) =>  handleOnDelete(event, record)}>
        //                     <DeleteOutlined />
        //                 </Button>
        //             </>
        //         )
        //     },
        // },
    ]);

    const [selectedRowKey, setSelectedRowKey] = useState();

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


    const handleClickRow = (record) => {
        console.log(record)
        if(selectedRowKey == record.key)
        {
            onResetSelectedRow();
            setSelectedRowKey([]);
        }
        else 
        {
            onClickRow(record);
            setSelectedRowKey([record.key]);
        }
    }

    return (
        <Table
            loading={loading}
            bordered
            size="small"
            columns={mergeColumns}
            dataSource={users}
            pagination={pagination}
            scroll={{ x: 1700, y: 280 }}
            // style={{ height: '380px' }}
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => handleClickRow(record), // click row
                };
            }}
            rowSelection={{
                selectedRowKeys: selectedRowKey,
                type: 'radio',
                columnWidth: 0,
                renderCell: () => "",
            }}
            onChange={(newPagination) => onChangePagination(newPagination)}
        />
    );
};

export default ResizeableUsersTable;