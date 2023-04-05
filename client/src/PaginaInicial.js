// importação dos pacotes necessários
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spin } from 'antd';
import DataTable from './components/DataTable'
import {Button} from "antd"
import CarroForm from "./components/Formulario/CarroForm"

// definindo um componente PaginaInicial
function PaginaInicial() {
    // criando dois estados usando o hook useState

    //'carregando' indica se os dados estão sendo carregados ou não

    // 'listaDeCarros' um lista de objetos que representa os carros que estão vindo da API
    const [carregando, setCarregando] = useState(true)
    const [listaDeCarros, setListaDeCarros] = useState([])
    const [mostrarFormCarro, setMostrarFormCarro] = useState(false)

    /*
    deixa o formulario visivel
     */
    const handleClick = () => {
        setMostrarFormCarro(true)
    }

    /*
    função vai verificar se o usuario clicou no botao fechar dentro do component, se ele clicar, um evento será chamado
    para essa função e definira ele como invisivel
     */
    const handleCloseForm = (formClosed) => {
        setMostrarFormCarro(false)
        if (formClosed) {
            carregarDados()
        }
    }

    // função responsavel por consumir a API utilizando o axios e passar os dados para o listaDeCarros
    async function carregarDados() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/carro/')
            setListaDeCarros(response.data)
            setCarregando(false)
        } catch (error) {
            console.error(error)
        }
    }

    // irá chamar a função carregarDados após a renderização do componente
    useEffect(() => {
        carregarDados()
    }, [])

    return (
        <div style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("/imagens/imagem-fundo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>

            <div style={{
                display: 'flex',
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor: '#DCDCDC', // cor de fundo
                padding: '1px', // espaçamento interno
                marginBottom: '50px',
            }}>
            <h1 style={{ marginRight: '20px'}}>Gerenciamento de Carros</h1>
                <Button type="primary" onClick={handleClick}>Adicionar Novo Carro</Button>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                {carregando ? (
                    <Spin size="large" />
                ) : (
                    <DataTable data={listaDeCarros} onRefresh={carregarDados} />
                )}
                {mostrarFormCarro && <CarroForm onClose={handleCloseForm} />}
            </div>
        </div>
    )
}

export default PaginaInicial
