import styled from 'styled-components'
import { BorderColor, Yellow } from '../constants/Colors'

const Card = styled.div<{ selected?: boolean }>`
    background-color: ${props => props.selected ? '#0c0c0c' : '#131313'} ;
    border: 2px solid ${props => props.selected ? Yellow : BorderColor};
    /* width: 24%; */
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        border-color: ${Yellow};
    }
`
const Role = styled.div`
    font-size: 16px;
`
const Score = styled.div`
    font-size: 26px;
    font-weight: bold;
`
const Token = styled.div`
    font-size: 18px;
`

// eslint-disable-next-line @typescript-eslint/ban-types
const ScoreCard = (props: { role: string, score: number, seleted?: boolean, setVote: Function }) => {
    const { role, score, seleted, setVote } = props;

    // const [selected, setSelect] = useState(false);

    return (
        <Card onClick={() => { setVote(score) }} selected={seleted}>
            <Role> {role} </Role>
            <Score>{score}</Score>
            <Token> $RAIN </Token>
        </Card>
    )
}

export default ScoreCard