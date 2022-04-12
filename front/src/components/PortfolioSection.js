import styled from "styled-components";

function PortfolioSection(){
    const COLOR = '#6D55FF'

    return (
        <>
            <Rect style={{backgroundColor: COLOR}}>
                <Title>
                    <TitleText>Portfolio</TitleText>
                </Title>
            </Rect>
            <Description>당신의 포트폴리오를 완성하세요.</Description>

        </>
    )
}
export default PortfolioSection

const Rect = styled.div`
    position: relative;
    width: 40px;
    height: 25px;
`;

const Title = styled.div`
    position: absolute;
    top:0;
    padding-left: 1.3em;
    padding-top: 8px;
`;

const TitleText = styled.h1`
    font-size: 1.8em;
    font-weight: bold;
`;

const Description = styled.p`
    padding-left: 1.3em;
    margin-bottom: 3em;
    margin-top: 2em;
`;