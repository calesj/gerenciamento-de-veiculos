// importação dos pacotes necessários
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';

// definindo um componente PaginaInicial
function PaginaInicial() {
    // criando dois estados usando o hook useState

    //'carregando' indica se os dados estão sendo carregados ou não

    // 'listaDeCarros' um lista de objetos que representa os carros que estão vindo da API
    const [carregando, setCarregando] = useState(true);
    const [listaDeCarros, setListaDeCarros] = useState([]);

    // função responsavel por consumir a API utilizando o axios
    async function carregarDados() {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/carro/');
            setListaDeCarros(response.data);
            setCarregando(false);
        } catch (error) {
            console.error(error);
        }
    }

    // irá chamar a função carregarDados após a renderização do componente
    useEffect(() => {
        carregarDados();
    }, []);

    return (
        <div>
            <h1>Minha Página</h1>
            {carregando ? (
                <p>Carregando dados...</p>
            ) : (
                <DataTable data={listaDeCarros} />
            )}
        </div>
    );
}

export default PaginaInicial;
