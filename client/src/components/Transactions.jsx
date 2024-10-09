import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, Input, message, Image } from 'antd';
import axios from 'axios';

const { Search } = Input;

const columns = [
    {
        title: "#",
        dataIndex: "id",
        width: "40px",
    },
    {
        title: "Title",
        dataIndex: "title",
        width: "200px",
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (price) => parseFloat(price).toFixed(2),
        width: "80px"
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Category",
        dataIndex: "category",
        width: "120px"
    },
    {
        title: "Sold",
        dataIndex: "sold",
        render: (sold) => (sold ? "Yes" : "No"),
        width: "50px"
    },
    {
        title: "Date",
        dataIndex: "dateOfSale",
        render: (date) => moment(date).format("DD MMM YYYY"),
        width: "100px"
    },
    {
        title: "Image",
        dataIndex: "image",
        render: (url) => <Image src={url} alt="Product" />,
        width: "80px"
    }
];

function Transactions({ month, monthText }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10
        }
    });

    const getData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://roxiler-pvpf.onrender.com/transactions`, {
                params: {
                    month,
                    page: tableParams.pagination.current,
                    limit: tableParams.pagination.pageSize,
                    search: tableParams.search
                }
            });
            setData(response.data.transactions);
            setLoading(false);
            setTableParams((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    total: response.data.totalCount,
                }
            }));
            message.success('Data loaded successfully');
        } catch (error) {
            console.error(error);
            message.error('Error loading data');
        }
    };

    const handleTableChange = (pagination) => {
        setTableParams((prev) => ({
            ...prev,
            pagination
        }));

        if (pagination.pageSize !== tableParams.pagination.pageSize) {
            setData([]);
        }
    };

    const handleSearch = (value) => {
        setTableParams((prev) => ({
            ...prev,
            search: value
        }));
    };

    useEffect(() => {
        getData();
    }, [JSON.stringify(tableParams), month]);

    return (
        <div style={styles.container}>
            <div style={styles.searchContainer}>
                <Search
                    placeholder="Search"
                    allowClear
                    onSearch={handleSearch}
                    style={styles.searchInput}
                />
            </div>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size='small'
                bordered
                title={() => <strong style={styles.title}>Transactions for {monthText}</strong>}
                scroll={{ y: 540 }}
                style={{ backgroundColor: '#fff9c4' }} // Light yellow background for the whole table
                rowClassName={() => 'custom-row'}
                rowStyle={{ backgroundColor: '#fff9c4' }} // Set light yellow background for each row
            />
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        width: '300px',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.2s',
    },
    title: {
        color: '#333',
        textAlign: 'center',
        marginBottom: '10px',
    },
};

export default Transactions;
