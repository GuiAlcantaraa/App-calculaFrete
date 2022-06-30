import { Descricao } from './styles'
import { View } from 'react-native'

export function Resultado({ logradouro, cidade, bairro }) {
    return (
        <View>
            <Descricao>logradouro: {logradouro}</Descricao>
            <Descricao>cidade: {cidade}</Descricao>
            <Descricao>bairro: {bairro}</Descricao>
        </View>
    )
}