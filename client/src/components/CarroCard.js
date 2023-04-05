// importação dos pacotes necessários
import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import {Button} from 'antd'
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
                <Card style={{ height: 400, width: 300 }}>
                    <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                        <Button style={{ marginLeft: 'auto' }} type="primary" onClick={handleClose}>x</Button>
                        <Typography>
                            <b>Modelo:</b> {carro.modelo}
                        </Typography>
                        <Typography>
                            <b>Fabricante:</b> {carro.fabricante}
                        </Typography>
                        <Typography>
                            <b>Ano:</b> {carro.ano}
                        </Typography>
                        <Typography>
                            <b>Preço:</b> R$ {carro.preco}
                        </Typography>
                        <b>Defeitos:</b>

                        {//percorrendo os defeitos do objeto carro, e criando um typography pra cada um deles
                            carro.defeitos &&
                            carro.defeitos.map((defeito) => (
                                <Typography key={defeito.id} variant="body2" component="p">
                                    <li style={{color: 'red'}}>{defeito.descricao}</li>
                                </Typography>
                            ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default CarroCard
