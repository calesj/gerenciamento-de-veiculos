import React from 'react';
import { Table } from 'antd'


function DataTable(props) {
    //colunas da tabela
    const columns = [
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            key: 'modelo'
        },
        {
            title: 'Fabricante',
            dataIndex: 'fabricante',
            key: 'fabricante'
        },
        {
            title: 'Ano',
            dataIndex: 'ano',
            key: 'ano'
        },
        {
            title: 'Preço',
            dataIndex: 'preco',
            key: 'preco'
        },
    ]

    return (
        <Table columns={columns} dataSource={props.data}/>
    );
}
export default DataTable


