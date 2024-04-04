import styled from 'styled-components'
import { BorderColor } from '../constants/Colors'

const Card = styled.div<{ width?: string }>`
    width: ${props => props.width ? props.width : ''};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid ${BorderColor};
    width: 30%;
    @media (max-width: 750px) {
        width: 45%;
    }
    @media (max-width: 400px) {
        width: 90%;
    }
    
`
const CardImg = styled.img`
    width: 100%;
`
const PlayerField = styled.div`
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    @media (max-width: 750px) {
        padding: 10px 10px;
    }
`
const PlayerName = styled.span`
    font-size: 16px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    @media (max-width: 750px) {
        font-size: 14px;
    }
`
const PlayerRank = styled.span`
    font-size: 15px;
    color: white;
    font-weight: bold;
    @media (max-width: 750px) {
        font-size: 12px;
    }
`

const WinnerCard = (props: { avatar: string, username: string, rank: number }) => {
    const { avatar, username, rank } = props;
    return (
        <Card>
            <CardImg src={avatar==""?'/images/avatar/nouser.png':avatar} />
            <PlayerField>
                <PlayerName>{username}</PlayerName>
                <PlayerRank>Rank {rank}</PlayerRank>
            </PlayerField>
        </Card>
    )
}

export default WinnerCard