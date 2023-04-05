import React, {useState} from 'react'
import {Button, Table} from 'antd'
import CarroCard from "./CarroCard"
import DefeitoForm from "./Formulario/DefeitoForm";

// definindo o componente DataTable
function DataTable(props) {

    const [selectedCarro, setSelectedCarro] = useState(null)

    const [showDefeitoForm, setShowDefeitoForm] = useState(false);

    const [showVisualizarCard, setShowVisualizarCard] = useState(false);

    function handleEdit(item) {
        
    }

    function handleDelete(item) {
        
    }

    function handleDefeito(item) {
        setSelectedCarro(item);
        setShowDefeitoForm(true);
    }

    function handleVisualizar(item) {
        setSelectedCarro(item);
        setShowVisualizarCard(true);
    }

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
        {
            title: 'Ações',
            key: 'actions',
            render: (text, item) => (
                <>
                    <Button type="primary" onClick={() => handleVisualizar(item)}>Visualizar</Button>
                    <Button type="default" onClick={() => handleEdit(item)}>Editar</Button>
                    <Button danger onClick={() => handleDelete(item)}>Excluir</Button>
                    <Button warning onClick={() => handleDefeito(item)}>Adicionar Defeitos</Button>
                    {showDefeitoForm && selectedCarro && (
                        <DefeitoForm carro_id={selectedCarro.id} onClose={() => setShowDefeitoForm(false)} />
                    )}
                </>
            ),
        },
    ]

    return (
        <div>
            <Table columns={columns} dataSource={props.data}/>

            {showVisualizarCard && selectedCarro && (
                <CarroCard
                    carro={selectedCarro}
                    onClose={() => {
                        setSelectedCarro(null)
                        setShowVisualizarCard(false)
                    }
                    }
                />
            )}
        </div>

    )
}
export default DataTable


