import styled from 'styled-components'
import { BGColor, Yellow } from '../constants/Colors'

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    background-color: ${BGColor};
    border-radius: 10px;
    margin-bottom: 10px;
`
const CardLeft = styled.div`
    display: flex;
    /* gap: 50px; */
    align-items: center;
`
const RankTxt = styled.div`
    text-transform: uppercase;
    width: 100px;
    @media (max-width: 550px) {
        font-size: 14px;
        width: 60px;
    }
`
const CardLeftDiv = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    @media (max-width: 550px) {
        gap: 10px;
    }
`
const AvatarImg = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 100%;
    @media (max-width: 550px) {
        width: 50px;
        height: 50px;
    }
`
const UsernameTxt = styled.div`
    font-size: 18px;
    @media (max-width: 550px) {
        font-size: 14px;
    }
`
const CardRight = styled.div`
    color: ${Yellow};
    max-width: 150px;
    text-wrap: nowrap;
    overflow: hidden;
`
const VoteTxt = styled.span`
    @media (max-width: 350px) {
        display: none;
    }
`


const RankCard = (props: {rank: number, avatar: string, username: string, vote?:number}) => {

    const {rank, avatar, username, vote} = props;

  return (
    <Card>
        <CardLeft>
            <RankTxt>
                Rank {rank}
            </RankTxt>
            <CardLeftDiv>
                <AvatarImg src={avatar==""?'/images/avatar/nouser.png':avatar} />
                <UsernameTxt>{username==""?"No User":username}</UsernameTxt>
            </CardLeftDiv>
        </CardLeft>
        <CardRight><VoteTxt>Votes: </VoteTxt>{vote || 0}</CardRight>
    </Card>
  )
}

export default RankCard