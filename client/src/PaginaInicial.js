// importação dos pacotes necessários
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
    const [mostrarCarroForm, setMostrarCarroForm] = useState(false)

    /*
    deixa o formulario visivel
     */
    const handleClick = () => {
        setMostrarCarroForm(true)
    }

    /*
    função vai verificar se o usuario clicou no botao fechar dentro do component, se ele clicar, um evento será chamado
    para essa função e definira ele como invisivel
     */
    const handleCloseForm = (formClosed) => {
        setMostrarCarroForm(false)
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
        <div>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20px' }}>
                <h1>Página Inicial</h1>
                <Button type="primary" onClick={handleClick}>Adicionar Novo Carro</Button>
            </span>
            {carregando ? (
                <p>Carregando dados...</p>
            ) : (
                <DataTable data={listaDeCarros} />
            )}
            {mostrarCarroForm && <CarroForm onClose={handleCloseForm} />}
        </div>
    )
}

export default PaginaInicial
