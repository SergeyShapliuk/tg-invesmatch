import Modal from "react-modal";
import MemoAlertIcon from "../../svg/AlertIcon";


Modal.setAppElement("#root");

type ModalProps = {
    error: { isOpen: boolean, message: string }
    close: () => void
}

function ModalError({error, close}: ModalProps) {
    return (
        <Modal isOpen={error.isOpen} onRequestClose={close} style={{
            overlay: {background: "rgba(0,0,0,0.7)", zIndex: 999}, content: {
                width: "95%",
                top: 0,
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, 10px)",
                border: "none",
                borderRadius: 12,
                background: "#272727"
            }
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <div>
                    <MemoAlertIcon/>
                </div>
                <div style={{marginLeft: 12}}>{error.message}</div>
            </div>

            {/*{error.message !== "" ?*/}
            {/*    <>*/}
            {/*        <h3> An error has occurred:</h3>*/}

            {/*        <p>Try again later</p>*/}
            {/*    </>*/}
            {/*    :*/}
            {/*    <>*/}
            {/*        <h3>Something went wrong.</h3>*/}
            {/*        <p>Try again later</p>*/}
            {/*    </>*/}
            {/*}*/}

        </Modal>
    );
}

export default ModalError;
