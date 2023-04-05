// definindo os modulos que iremos utilizar
import React, { useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@material-ui/core"
import {Button, Input} from "antd"

/*
definindo o componente funcional CarroForm, ele recebe o onClose como argumento que vai definir o estado inicial
do isVisible como true
 */

const CarroForm = ({ onClose }) => {

    // definindo a constante que vai setar se o componente está visivel ou não
    const [isVisible, setIsVisible] = useState(true)

    // definindo os campos do form
    const [formValues, setFormValues] = useState({
        modelo: '',
        fabricante: '',
        ano: '',
        preco: '',
    })

    // definindo a constante que mostrará a mensagem de erro de validação que está vindo da API
    const [errorMessage, setErrorMessage] = useState("")

    // método responsavel por fechar o componente
    const handleClose = () => {
        setIsVisible(false)
        // avisa o componente pai que o componente filho está fechado
        onClose(true)
    }

    // metodo assincrono responsavel por fazer a requisição via POST através do Axios, e enviando os valores do FORM
    // por ser assincrono, significa que ele esperará uma resposta
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/carro', formValues)
            alert(response.data.message)
            handleClose()
        } catch (error) {
            setErrorMessage(error.response.data.errors)
        }
    }

    // método responsavel por atualizar o estado dos valores do Form quando o usuario digita
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isVisible && (
                <Card style={{ height: 600, width: 400 }}>
                    <CardContent style={{ display: "flex", flexDirection: "column" }}>
                        <Button style={{ marginLeft: 'auto' }} type="primary" onClick={handleClose}>x</Button>
                        <form onSubmit={handleSubmit}>
                        <h1>Formulario</h1>
                        <div className="form-group">
                            <label>Modelo</label>
                            <Input
                                type="text"
                                name="modelo"
                                placeholder="Digite o modelo"
                                validateStatus={errorMessage.modelo}
                                value={formValues.modelo}
                                onChange={handleInputChange}
                            />
                            <p style={{ color: 'red'}}>{errorMessage.modelo && <div>{errorMessage.modelo}</div>}</p>
                        </div>

                        <div className="form-group">
                            <label>Fabricante</label>
                            <Input
                                type="text"
                                name="fabricante"
                                placeholder="Digite o nome da fabricante"
                                value={formValues.fabricante}
                                onChange={handleInputChange}
                            />
                            <p style={{ color: 'red'}}>{errorMessage.fabricante && <div>{errorMessage.fabricante}</div>}</p>
                        </div>

                        <div className="form-group">
                            <label>Ano</label>
                            <Input
                                type="text"
                                name="ano"
                                placeholder="Digite o ano do veiculo"
                                value={formValues.ano}
                                onChange={handleInputChange}
                            />
                            <p style={{ color: 'red'}}>{errorMessage.ano && <div>{errorMessage.ano}</div>}</p>
                        </div>

                        <div className="form-group">
                            <label>Preço</label>
                            <Input
                                type="text"
                                name="preco"
                                placeholder="Digite o preço do veiculo"
                                value={formValues.preco}
                                onChange={handleInputChange}
                            />
                            <p style={{ color: 'red'}}>{errorMessage.ano && <div>{errorMessage.ano}</div>}</p>
                        </div>

                        <button type="submit" className="primary">
                            Enviar
                        </button>
                        </form>
                    </CardContent>
                </Card>
                )}

        </div>
    )
}

export default CarroForm
