import styled from 'styled-components'
// import { Yellow } from '../constants/Colors'
import ConnectButton from '../components/ConnectBtn'

const Main = styled.div`
    max-width: 1440px;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 30px 20px;
    margin: auto;
`

// eslint-disable-next-line @typescript-eslint/ban-types
const Header = () => {
  return (
    <Main>
        <ConnectButton />
    </Main>
  )
}

export default Header