import {useNavigate} from "react-router-dom";
import {
    SendTransactionRequest,
    TonConnectButton,
    useIsConnectionRestored,
    useTonAddress,
    useTonConnectUI,
    useTonWallet, WalletInfoWithOpenMethod
} from "@tonconnect/ui-react";
import {useLaunchParams} from "@telegram-apps/sdk-react";

function Wallet() {
    const lp = useLaunchParams();
    const navigation = useNavigate();
    const [tonConnectUI] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const wallet = useTonWallet();
    const connectionRestored = useIsConnectionRestored();

    const transaction: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        messages: [
            {
                address:
                    "0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-", // message destination in user-friendly format
                amount: "20000000" // Toncoin in nanotons
            }
        ]
    };

    type TonProofItemReply = {
        proof: string;
        // другие поля
    };

    type TonProofItemReplyError = {
        error: {
            message: string;
            // другие поля ошибки
        };
    };

    type TonProofItem = TonProofItemReply | TonProofItemReplyError;

    const tonProof = wallet?.connectItems?.tonProof as TonProofItem;

    if (!connectionRestored) {
        return <div>Please wait...</div>;
    }
    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            padding: "73px 25px 19px 25px",
            overflow: "auto"
        }}>
            <button onClick={() => navigation(-1)}
                    style={{position: "absolute", backgroundColor: "white", top: 10, left: 10}}>Back
            </button>
            <span style={{textAlign: "center"}}>My wallet</span>
            <TonConnectButton style={{display: "flex", alignSelf: "center", marginTop: 10}}/>
            <span>User-friendly address: {userFriendlyAddress}</span>
            <span>Raw address: {rawAddress}</span>
            <span>Connected wallet address: {wallet?.account?.address}</span>
            <span>Device: {wallet?.device?.appName}</span>
            <span>Connected via: {wallet?.provider}</span>
            {tonProof && "proof" in tonProof ? (
                <span>Ton proof: {tonProof.proof}</span>
            ) : tonProof?.error ? (
                <span>Error: {tonProof.error.message}</span>
            ) : null}


            <div>Connected wallet info:</div>
            <div>
                {(wallet as WalletInfoWithOpenMethod)?.name && <span>{(wallet as WalletInfoWithOpenMethod).name}</span>}
                {(wallet as WalletInfoWithOpenMethod)?.imageUrl &&
                <img src={(wallet as WalletInfoWithOpenMethod).imageUrl} alt="wallet image"
                     style={{width: 100, height: 100}}/>}

            </div>
            <button onClick={() => tonConnectUI.sendTransaction(transaction)} style={{backgroundColor: "white"}}>
                Send transaction
            </button>

            <div>{JSON.stringify(lp)}</div>
        </div>
    );
}

export default Wallet;
