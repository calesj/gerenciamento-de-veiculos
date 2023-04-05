import React, {useState} from "react";
import axios from "axios";
import {Card, CardContent} from "@material-ui/core";
import {Button, Input} from "antd";

function DefeitoForm(props) {

    // definindo a variavel que vai setar se o componente está visivel ou não
    const [isVisible, setIsVisible] = useState(true);

    const [formValues, setFormValues] = useState({
        'carro_id': props.carro_id,
        'descricao': ''
    })

    // definindo a constante que mostrará a mensagem de erro de validação que está vindo da API
    const [errorMessage, setErrorMessage] = useState("");

    // método responsavel por fechar o componente
    const handleClose = () => {
        setIsVisible(false)
        props.onClose(true)
    }

    // método responsavel por atualizar o estado dos valores do Form quando o usuario digita
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    }

    // metodo assincrono responsavel por fazer a requisição via POST através do Axios, e enviando os valores do FORM
    // por ser assincrono, significa que ele esperará uma resposta
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/defeito', formValues)
            alert(response.data.message)
            handleClose()
        } catch (error) {
            setErrorMessage(error.response.data.errors)
        }
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
                                <label>Descreva o Defeito</label>
                                <Input
                                    type="text"
                                    name="descricao"
                                    placeholder="Digite o defeito"
                                    validateStatus={errorMessage.descricao}
                                    value={formValues.descricao}
                                    onChange={handleInputChange}
                                />
                                <p style={{ color: 'red'}}>{errorMessage.descricao && <div>{errorMessage.descricao}</div>}</p>
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

export default DefeitoForm