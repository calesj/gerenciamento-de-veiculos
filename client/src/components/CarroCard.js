// importação dos pacotes necessários
import React, { useState, useEffect } from 'react'
import {Button, Card} from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios'

// definindo o componente CarroCard
function CarroCard(props) {
    const [carro, setCarro] = useState(null)

    // funciona como método mounted () do vue, tudo aqui dentro será chamado assim que a pagina for renderizada
    useEffect(() => {

        // faz a requisição na API do carro com seu respectivo ID vindo da tabela
        async function fetchCarro() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/carro/${props.carro.id}/`)
                setCarro(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCarro()
    }, [props.carro.id])

    // seta o valor de carro como nulo para o componente pai, e fecha o componente card
    function handleClose() {
        setCarro(null)
        props.onClose()
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {   //se carro for verdadeiro ele renderiza o componente
                carro && (
                    <Card title="Detalhes do carro" extra={ <Button type="text" icon={<CloseOutlined />} onClick={handleClose}></Button>} style={{ width: 300 }}>

                        <p><b>Modelo:</b> {carro.modelo}</p>
                        <p><b>Fabricante:</b> {carro.fabricante}</p>
                        <p><b>Ano:</b> {carro.ano}</p>
                        <p><b>Preço:</b> R$ {carro.preco}</p>
                        <p><b>Defeitos:</b></p>
                        {carro.defeitos &&
                            carro.defeitos.map((defeito) => (
                                <p key={defeito.id} style={{ color: 'red' }}>
                                    - {defeito.descricao}
                                </p>
                            ))}
                    </Card>
                )}
        </div>
    )
}

export default CarroCard
