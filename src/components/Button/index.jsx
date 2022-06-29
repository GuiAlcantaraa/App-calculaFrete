import { Container, Title } from "./styles";

export function Button({ onPress, description }) {

    return (

        <Container
            activeOpacity={0.7}
            onPress={onPress}
        >

            <Title>{description}</Title>
        </Container>

    );
}