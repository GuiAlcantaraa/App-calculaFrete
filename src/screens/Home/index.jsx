import { Container, Title, Input, TextErro, ResultadoFrete } from './styles';
import { Button } from '../../components/Button'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native'

import api from '../../services/api'

export default function Home() {


    const [cepUser, setCepUser] = useState('')
    const [cep, setCep] = useState([])
    const [peso, setPeso] = useState(0)
    const [erroCep, setErrocep] = useState(false)
    const [erroPeso, setErroPeso] = useState(false)
    const [visible, setVisible] = useState(false)
    const [valorFrete, setValorFrete] = useState(0)


    async function buscarCep() {

        if (cepUser === '') {
            setErrocep('Informe um cep.')
            return;
        }
        else {
            const meuCep = cepUser
            const { data } = await api.get(`/${meuCep}/json`)
                .catch(erro => alert(`Informe um cep valido ${erro}`))

            setCep(data)
            setErrocep(false)
            setVisible(true)

        }

    }
    function calcularFrete() {

        const estado = cep.uf
        console.log(estado)

        const estados5 = ['MG', 'SP', 'RJ', 'ES']
        const estados15 = ['PR', 'SC', 'RS']
        const estados50 = ['AC', 'AM', 'RO', 'RR', 'AP', 'PA', 'TO']

        const valor5 = estados5.some(element => element === estado)
        const achou15 = estados15.some(element => element === estado)
        const achou50 = estados50.some(element => element === estado)

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

        if (achou15) {
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
                const taxaEstado = taxaPeso * 50
                const resultadoFrete = taxaPeso + taxaEstado
                setValorFrete(resultadoFrete)
            }
        }

        if (achou50) {
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
                    <ResultadoFrete>Logradouro: {cep.logradouro}</ResultadoFrete>
                    <ResultadoFrete>Cidade: {cep.localidade}</ResultadoFrete>
                    <ResultadoFrete>Bairro: {cep.bairro}</ResultadoFrete>

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
