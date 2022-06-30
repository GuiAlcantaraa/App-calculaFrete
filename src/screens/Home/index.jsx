import { Container, Title, Input, TextErro, ResultadoFrete } from './styles';
import { Button } from '../../components/Button'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';
import { Resultado } from '../../components/Resultado';


import api from '../../services/api'

export default function Home() {


    const [cepUser, setCepUser] = useState('')
    const [endereco, setEndereco] = useState([])

    const [peso, setPeso] = useState(0)
    const [erroCep, setErrocep] = useState(false)

    const [erroPeso, setErroPeso] = useState(false)
    const [visible, setVisible] = useState(false)
    const [valorFrete, setValorFrete] = useState(0)


    async function buscarCep() {
        const numeroCep = cepUser

        try {
            if (numeroCep !== '') {
                const { data } = await api.get(`/${numeroCep}/json`)
                setEndereco(data)
                setVisible(true)
                setErrocep(false)
            }
            else {
                setErrocep(true)
            }

        } catch (erro) {
            alert(`Informe um cep valido `)
        }
    }
    function calcularFrete() {

        const estado = endereco.uf

        const estados5 = ['MG', 'SP', 'RJ', 'ES']
        const estados15 = ['PR', 'SC', 'RS']
        const estados50 = ['AC', 'AM', 'RO', 'RR', 'AP', 'PA', 'TO']

        const valor5 = estados5.some(element => element === estado)
        const valor15 = estados15.some(element => element === estado)
        const valor50 = estados50.some(element => element === estado)

        if (peso <= 0) {
            setErroPeso(true)
            return;
        }
        if (valor5) {
            if (peso >= 0 && peso <= 10) {
                const taxaPeso = peso * 0.80
                const taxaEstado = taxaPeso * 5
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 10.1 && peso <= 20) {
                const taxaPeso = peso * 0.96
                const taxaEstado = taxaPeso * 5
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 20) {
                const taxaPeso = peso * 2.10
                const taxaEstado = taxaPeso * 5
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
        }
        if (valor15) {
            if (peso >= 0 && peso <= 10) {
                const taxaPeso = peso * 0.80
                const taxaEstado = taxaPeso * 15
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 10.1 && peso <= 20) {
                const taxaPeso = peso * 0.96
                const taxaEstado = taxaPeso * 15
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 20) {
                const taxaPeso = peso * 2.10
                const taxaEstado = taxaPeso * 15
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
        }
        if (valor50) {
            if (peso >= 0 && peso <= 10) {
                const taxaPeso = peso * 0.80
                const taxaEstado = taxaPeso * 50
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 10.1 && peso <= 20) {
                const taxaPeso = peso * 0.96
                const taxaEstado = taxaPeso * 50
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
            else if (peso > 20) {
                const taxaPeso = peso * 2.10
                const taxaEstado = taxaPeso * 50
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
        }
    }
    function novoFrete() {
        setCepUser('')
        setVisible(false)

    }

    return (

        <Container>
            <Title>Calcular frete</Title>
            <StatusBar style='auto' />

            <Input
                placeholder='Informe o cep'
                placeholderTextColor="#ffffff"
                onChangeText={setCepUser}
            />
            {erroCep ? <TextErro>Informe o cep</TextErro> : null}

            <Button
                description="Buscar"
                onPress={buscarCep}
            />

            {visible ?
                <View>
                    <Resultado
                        logradouro={endereco.logradouro}
                        cidade={endereco.localidade}
                        bairro={endereco.bairro}
                    />

                    <Input
                        placeholder='Informe o peso do produto'
                        placeholderTextColor="#ffffff"
                        onChangeText={setPeso}
                    />

                    {erroPeso ? <TextErro>Informe peso maior que 0</TextErro> : null}

                    <Button
                        description="calcular frete"
                        onPress={calcularFrete}
                    />

                    <ResultadoFrete>Valor do frete: R${valorFrete.toFixed(2)}</ResultadoFrete>

                    <Button
                        description="novo frete"
                        onPress={novoFrete}
                    />
                </View>
                : null}


        </Container >
    );
}
