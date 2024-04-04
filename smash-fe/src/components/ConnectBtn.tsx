import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { RiArrowDropDownFill } from 'react-icons/ri'
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// import { depositToken, getTokenBalance } from "../pages/TokenTransfer";
import { getTokenBalance, depositToken } from "../pages/TokenTransfer";
import '@solana/wallet-adapter-react-ui/styles.css'

import styled from "styled-components";

import { Yellow } from "../constants/Colors";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import axios from "axios";

import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

const ConnectBtn = styled.div`
    display: flex;
    align-items: center;
    background-color: ${Yellow};
    border-radius: 10px;
    padding: 10px 30px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        background-color: yellowgreen;
    }
    min-width: 172px;
    text-align: center;
    justify-content: center;
`
const DropDiv = styled.div`
    position: relative;
`
const WalletHandleDiv = styled.div`
    position: absolute;
    display: flex;
    gap: 5px;
    flex-direction: column;
    left: 50%;
    transform: translate(-50%, 10px);
`
const Main = styled.div`
    display: flex;
    @media (max-width: 560px){
        flex-wrap: wrap;
        justify-content: center;
    }
`

// eslint-disable-next-line @typescript-eslint/ban-types
const ConnectButton = () => {
    const { setVisible } = useWalletModal();

    const wallet = useWallet();
    const { publicKey, disconnect } = useWallet();
    const { connection } = useConnection();
    const [dropshow, setDropshow] = useState(false);

    const [walletBalance, setBalance] = useState(0);

    // Deposit/Withdraw modal setting
    const [dmodal, setDmodal] = useState(false);
    const [wmodal, setWmodal] = useState(false);

    const [siteBalance, setSiteBalance] = useState(0);

    useEffect(() => {
        if (wallet.publicKey) {
            getWalletBalance();
            getSiteBalance();
        }
    }, [wallet, wallet.publicKey])

    const getWalletBalance = async () => {
        const tokenAmount = await getTokenBalance(wallet, connection);
        if (tokenAmount) {
            setBalance(Math.ceil(tokenAmount));
        }
    }

    const getSiteBalance = async () => {
        if (wallet.publicKey) {
            try {
                const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/getBalance/${wallet.publicKey.toString()}`);
                if (result) {
                    if (result.data.balance) {
                        setSiteBalance(result.data.balance);
                    } else {
                        setSiteBalance(0);
                    }
                } else {
                    setSiteBalance(0);
                }
            } catch (error: any) {
                toast.error(error.response.data.err)
            }
        }
    }

    const depositRain = async (amount: number) => {
        try {
            const depositAmoutn = amount;
            if (wallet.publicKey) {
                const tokenAmount = await getTokenBalance(wallet, connection);

                if (tokenAmount && tokenAmount < depositAmoutn) {
                    toast.error("You don't have enough balance to deposit!");
                } else {
                    const txHash = await depositToken(wallet, connection, depositAmoutn);
                    if (txHash.signature && txHash.signature != "") {                        
                        const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/deposit`, { walletAddress: wallet.publicKey.toString(), signature: txHash.signature });
                        if (result) {
                            console.log("Result ==> ", result);
                            toast.success("Successfully deposited!")
                            location.href = "/"
                        }
                    } else {
                        toast.error("We dind't get signature!")
                    }
                }
            }
        } catch (error: any) {
            console.log("Deposit error ===> ", error)
            toast.error(error.response.data.err)
        }

    }

    const withDraw = async (amount: number) => {
        try {
            const withdrawAmount = amount;
            if (wallet.publicKey) {
                const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/withdraw`, { walletAddress: wallet.publicKey.toString(), withdrawAmount: withdrawAmount });
                if (result) {
                    toast.success("Successfully withdrawn! Please confirm your wallet!")
                    setWmodal(false)
                    location.href = "/"
                }
            }
        } catch (error: any) {
            console.log("Withdraw error ===> ", error)
            toast.error(error.response.data.err)
        }

    }

    const closeDmodal = () => setDmodal(false);
    const closeWmodal = () => setWmodal(false);

    return (
        <Main>
            {publicKey ? (
                <DropDiv>
                    <ConnectBtn onClick={() => setDropshow(!dropshow)}>
                        <>Balance: {siteBalance}</> <RiArrowDropDownFill size={'2em'} />
                    </ConnectBtn>
                    {
                        dropshow && (
                            <WalletHandleDiv>
                                <ConnectBtn>
                                    {walletBalance} $RAIN
                                </ConnectBtn>
                                <ConnectBtn
                                    onClick={() => setVisible(true)}
                                >
                                    Change Wallet
                                </ConnectBtn>
                                <ConnectBtn
                                    onClick={disconnect}
                                >
                                    Disconnect
                                </ConnectBtn>
                                <ConnectBtn
                                    onClick={() => setDmodal(true)}
                                >
                                    Deposit
                                </ConnectBtn>
                                <ConnectBtn
                                    onClick={() => setWmodal(true)}
                                >
                                    Withdraw
                                </ConnectBtn>
                            </WalletHandleDiv>
                        )
                    }
                </DropDiv>
            ) : (
                <ConnectBtn
                    onClick={() => setVisible(true)}
                >
                    Connect
                </ConnectBtn>
            )}
            <DepositModal show={dmodal} closeModal={closeDmodal} deposit={depositRain} />
            <WithdrawModal show={wmodal} closeModal={closeWmodal} withdraw={withDraw} />
        </Main>
    );
};
export default ConnectButton;