import React, {useState} from 'react'
import {Table, Button, Space, Card} from 'antd';
import CarroCard from "./CarroCard"
import { EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import CarroForm from "./Formulario/CarroForm";
import axios from "axios";

// definindo o componente DataTable
function DataTable(props) {

    const [selectedCarro, setSelectedCarro] = useState(null)

    const [showVisualizarCard, setShowVisualizarCard] = useState(false);

    const [mostrarFormCarro, setMostrarFormCarro] = useState(false)

    // seleciona o carro, e abre o formulario de edição
    const handleEdit = (item) => {
        setSelectedCarro(item);
        setMostrarFormCarro(true);
    };

    // avisa que o componente de formulario foi fechado
    const handleCloseForm = () => {
        setMostrarFormCarro(false)
    }

    // deleta o carro selecionado
    async function handleDelete(item) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/carro/${item.id}/`);
            alert(response.data.message)
            props.onRefresh();
        } catch (error) {
            alert('a')
        }
    }

    // abre o card de visualização
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
                    <Space size={8}>
                        <Button type="primary" onClick={() => handleVisualizar(item)}>
                            <EyeOutlined />
                        </Button>
                        <Button type="default" onClick={() => handleEdit(item)}>
                            <EditOutlined />
                        </Button>
                        <Button danger onClick={() => handleDelete(item) && props.onRefresh}>
                            <DeleteOutlined />
                        </Button>
                    </Space>
                </>
            ),
        },
    ]

    return (
        <div style={{width: '70%',display: 'flex', justifyContent: 'center'}}>
                <Card style={{ width: '100%'}}>
                <Table onEdit={(item) => handleEdit(item)} style={{width: '100%' }} columns={columns} dataSource={props.data}/>
                </Card>

            {showVisualizarCard && selectedCarro && ( //se um carro estiver selecionado e o visualizar card estiver como true, o componente sera renderizado
                <CarroCard
                    carro={selectedCarro}
                    onClose={() => {
                        setSelectedCarro(null)
                        setShowVisualizarCard(false)
                    }
                    }
                />
            )}

            {mostrarFormCarro && <CarroForm selectedItem={selectedCarro} onRefresh={props.onRefresh} onClose={handleCloseForm} />}
        </div>

    )
}
export default DataTable


