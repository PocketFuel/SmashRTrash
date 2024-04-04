import styled from 'styled-components'
import { BorderColor, Yellow } from '../constants/Colors'

const Card = styled.div<{checked: boolean}>`
    width: 49%;
    border: 2px solid ${Yellow};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }
    opacity: ${props => props.checked?1:0.5}
`
const CardImg = styled.img`
    width: 100%;
    height: 85%;
`
const Score = styled.div`
    /* width: 50px; */
    text-align: center;
    padding: 5px 10;
    background-color: #131313;
    border: 1px solid ${BorderColor};
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 2px 12px;
    font-size: 14px;
    border-radius: 10px;
    font-weight: bold;
`
const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
`
// const ReadBtn = styled.div`
//     padding: 10px;
//     cursor: pointer;
//     font-size: 15px;
//     font-weight: bold;
// `
const Checked = styled.input`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
`

// eslint-disable-next-line @typescript-eslint/ban-types
const PlayCard = (props: { avatar: string, username: string, score?: number, checked?: boolean, selected: boolean, select: Function, usernumber: number }) => {
    const { avatar, username, score, selected, usernumber, select } = props;

    return (
        <Card onClick={() => {select(usernumber)}} checked={selected}>
            <CardImg src={avatar==""?'/images/avatar/nouser.png':avatar} />
            <UserName>{username==""?"No User":username}</UserName>
            {/* <ReadBtn onClick={ready}>Ready</ReadBtn> */}
            <Checked checked={selected} type='checkbox' readOnly/>
            <Score>
                {
                    score?score:0
                }
            </Score>
        </Card>
  )
}

export default PlayCard