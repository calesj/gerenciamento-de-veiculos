import React, {useEffect, useState} from "react"
import axios from "axios"
import { Button, Input, Form, Card } from "antd"
import {CloseOutlined} from "@ant-design/icons"

const CarroForm = ({ onClose, selectedItem, onRefresh }) => {

    const [isVisible, setIsVisible] = useState(true)

    const [originalDefeitos, setOriginalDefeitos] = useState("");

    // transforma o texto dos defeitos em array, se não tiver nada, retorna um array vazio
    const transformDefeitosToDescricaoArray = (defeitos) => {
        if (!defeitos) {
            return [];
        }

        return defeitos.map((defeito) => defeito.descricao);
    }

    // se existir um selectedItem, significa que é edição, logo todos os campos serão preenchidos com seus respectivos dados
    const [formValues, setFormValues] = useState({
        modelo: selectedItem?.modelo || "",
        fabricante: selectedItem?.fabricante || "",
        ano: selectedItem?.ano || "",
        preco: selectedItem?.preco || "",
        descricao: transformDefeitosToDescricaoArray(selectedItem?.defeitos) || [],
    });

    // aqui ficará armazenado as mensagens de validação
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        if (selectedItem) {
            setOriginalDefeitos(
                transformDefeitosToDescricaoArray(selectedItem?.defeitos).join(",")
            );
        }
    }, [selectedItem]);

    // fecha o componente
    const handleClose = () => {
        setIsVisible(false)
        onClose(true)
    }

    // essa função é chamada toda vez que o valor de um input for alterado, ele atualiza o valor de formValue
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    }

    const handleTextAreaChange = (event) => {
        const { value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, descricao: value.split(",") }));
    };

    // faz requisição pra api
    const handleSubmit = async () => {
        try {
            let response;

            if (selectedItem) {
                response = await axios.put(`http://127.0.0.1:8000/api/carro/${selectedItem.id}`, formValues);
            } else {
                response = await axios.post("http://127.0.0.1:8000/api/carro", formValues);
            }

            console.log(response);
            onRefresh()
            handleClose();
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.errors);
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
                <Card
                    title={"Dados do Carro"}
                    style={{ width: 400 }}
                    extra={
                        <Button type="text" icon={<CloseOutlined />} onClick={handleClose} />
                    }
                >
                    <Form layout="vertical" initialValues={selectedItem} onFinish={handleSubmit}>
                        <Form.Item
                            label="Modelo"
                            name="modelo"
                            validateStatus={errorMessage.modelo ? "error" : ""}
                            help={errorMessage.modelo?.[0]}
                        >
                            <Input
                                type="text"
                                name="modelo"
                                placeholder="Digite o modelo"
                                value={formValues.modelo}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Fabricante"
                            name="fabricante"
                            validateStatus={errorMessage.fabricante ? "error" : ""}
                            help={errorMessage.fabricante}
                        >
                            <Input
                                type="text"
                                name="fabricante"
                                placeholder="Digite o nome da fabricante"
                                value={formValues.fabricante}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ano"
                            name="ano"
                            validateStatus={errorMessage.ano ? "error" : ""}
                            help={errorMessage.ano}
                        >
                            <Input
                                type="text"
                                name="ano"
                                placeholder="Digite o ano do veículo"
                                value={formValues.ano}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Preço"
                            name="preco"
                            validateStatus={errorMessage.preco ? "error" : ""}
                            help={errorMessage.preco}
                        >
                            <Input
                                type="text"
                                name="preco"
                                placeholder="Digite o preço do veículo"
                                value={formValues.preco}
                                onChange={handleInputChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Defeitos"
                            validateStatus={errorMessage.descricao ? "error" : ""}
                            help={errorMessage.descricao}
                        >
                            <Input.TextArea
                                name="descricao"
                                rows={4}
                                placeholder="Digite os defeitos separados por vírgula"
                                value={formValues.descricao.join(',')}
                                onChange={handleTextAreaChange}
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            )}
        </div>
    )
}

export default CarroForm
