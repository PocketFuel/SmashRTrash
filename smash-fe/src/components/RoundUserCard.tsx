import styled from 'styled-components'

const RoundUser = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    @media (max-width: 1300px){
        gap: 10px;
    }
`
const UserNumber = styled.div`
    font-size: 16px;
`
const UserAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    @media (max-width: 1300px){
        width: 40px;
        height: 40px;
    }
`
const NameVote = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
`
const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
    @media (max-width: 1300px){
        font-size: 14px;
        
    }
    
`
const Votes = styled.div`
    font-size: 12px;
`

const RoundUserCard = (props: {u_number?: number, username: string, vote: number, avatar: string}) => {
    const {u_number, username, vote, avatar} = props;
    if (username && username !== "") {
        return (
          <RoundUser>
              <UserNumber>{u_number||0}</UserNumber>
              <UserAvatar src={avatar} />
              <NameVote>
                  <UserName>{username}</UserName>
                  <Votes>Votes: {vote}</Votes>
              </NameVote>
          </RoundUser>
        )
    } else {
        return (
            <RoundUser>
                <UserNumber>0</UserNumber>
                <UserAvatar src='/images/avatar/nouser.png' />
                <NameVote>
                    <UserName>No User</UserName>
                    <Votes>0</Votes>
                </NameVote>
            </RoundUser>
          )
    }
}

export default RoundUserCard