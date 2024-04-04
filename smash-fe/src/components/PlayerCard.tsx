import styled from 'styled-components'
import { BorderColor } from '../constants/Colors'

const Card = styled.div`
    border-radius: 10px;
    border: 0.5px solid ${BorderColor};
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    max-height: 200px;
    overflow-y: hidden;
    position: relative;
`

const UserAvatar = styled.img`
    width: 100%;
    /* height: 100px; */
    border-radius: 10px;
    
    @media (max-width: 390px){
        width: 100%;
        height: auto;
    }
`
const UserName = styled.div`
    font-size: 16px;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 2px 5px;
    background-color: black;
    width: 90%;
    text-align: center;
    border-radius: 5px;
`

const PlayerCard = (props: {avatar: string, username: string, user?: boolean}) => {
    const {avatar, username} = props;

    if (avatar) {
        return (
          <Card>
              <UserAvatar src={avatar} />
              <UserName>{username}</UserName>
          </Card>
        )      
    } else {
        return (
            <Card>
                <UserAvatar src='/images/avatar/nouser.png' />
                <UserName>Empty</UserName>
            </Card>
          )    
    }

}

export default PlayerCard