import styled from "styled-components/native";

export const Container = styled.View`
        background: black;

        flex: 1;
`;
export const Title = styled.Text`

        text-align: center;
        margin-top: 40px ;
        color: white;
        font-size:24px;
        font-weight:bold ;

`;
export const TextErro = styled.Text`
color: red;
text-align: center;
margin-left: 20px;
`
export const Input = styled.TextInput`

        background-color: #1f1e25;
        font-size: 18px;
        padding: 15px;
        margin-top: 45px;
        border-radius: 50px;
        margin-left: 20px;
        margin-right: 20px;
        color: white;
`;
export const ResultadoText = styled.Text`
        font-size: 18px ;
        font-weight: bold;
        color: #000;
        margin-left: 15px;
        margin-top: 15px;
`
export const ResultadoFrete = styled.Text`
color: red;
text-align: left;
margin-left: 20px;
margin-top: 20px;
font-size: 20px;

`