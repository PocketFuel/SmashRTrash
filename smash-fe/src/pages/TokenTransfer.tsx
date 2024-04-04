import { RBYTokenAddr, treasuryToken } from "../constants/TokenConfig";
// import { RBYTokenAddr } from "../constants/TokenConfig";
import { createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token"
// import { getAssociatedTokenAddress } from "@solana/spl-token"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
// import { Connection, PublicKey } from "@solana/web3.js";

const tresuryTokenAccount: PublicKey = new PublicKey(treasuryToken)
const tokenMint = new PublicKey(RBYTokenAddr)

export const depositToken = async (wallet: WalletContextState, connection: Connection, depositAmount: number) => {
    console.log("🚀 ~ depositToken ~ depositAmount:", depositAmount)
    console.log("🚀 ~ depositToken ~ connection:", connection)
    console.log("🚀 ~ depositToken ~ wallet:", wallet)
    try {
        if (!wallet || !wallet.publicKey) {
            console.log("Wallet not connected")
            return { signature: '', tokenBalance: 0 }
        }
        const bal = await getTokenBalance(wallet, connection )
        console.log("🚀 ~ depositToken ~ bal:", bal)

        const sourceAccount = await getAssociatedTokenAddress(
            tokenMint,
            wallet.publicKey
        );

        const mintInfo = await connection.getParsedAccountInfo(tokenMint)
        if (!mintInfo.value) throw new Error("Token info error")

        // @ts-ignore
        const numberDecimals = mintInfo.value.data.parsed!.info.decimals;
        console.log("🚀 ~ depositToken ~ numberDecimals:", numberDecimals)
        // create tx
        const tx = new Transaction();
        // send token
        tx.add(createTransferInstruction(
            sourceAccount,
            tresuryTokenAccount,
            wallet.publicKey,
            depositAmount * Math.pow(10, numberDecimals)
        ))
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        tx.feePayer = wallet.publicKey
        console.log("🚀 ~ depositToken ~ tx:", tx)

        console.log(await connection.simulateTransaction(tx), "========><><><><<<")
        await wallet.signTransaction!(tx)
        // wallet.signTransaction(tx)

        // send and confirm
        const signature = await wallet.sendTransaction(tx, connection);
        console.log('---------------------', signature)
        await connection.confirmTransaction(signature, "confirmed");

        const log = `\x1b[32mTransaction Success!🎉\nhttps://solscan.io/tx/${signature}`
        console.log(log)
        const tokenBalance = await getTokenBalance(wallet, connection);

        return { signature: signature, tokenBalance: tokenBalance }
    } catch (e) {
        console.warn(e)
        return { signature: '', tokenBalance: 0 }
    }
}

export const getTokenBalance = async (wallet: WalletContextState, connection: Connection) => {
    try {
        if (!wallet.publicKey) {
            console.log("Wallet not connected")
            return undefined
        }
        const sourceAccount = await getAssociatedTokenAddress(
            tokenMint,
            wallet.publicKey
        );

        console.log('0000000000000000000',sourceAccount.toString(), tokenMint.toString(), wallet.publicKey.toString())

        const info = await connection.getTokenAccountBalance(sourceAccount);
        if (info.value.uiAmount == null) throw new Error('No balance found');

        return info.value.uiAmount;
    } catch (e) {
        return 0
    }
}