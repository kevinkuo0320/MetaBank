import "./airdrop.scss";

function Airdrop() {
    return (
        <div className="stake-view">
            <div className="stake-card">
                <div className="stake-card-header">
                    <div
                        className="stake-card-wallet-connect-btn" /* onClick={connect}*/
                        style={{
                            boxShadow: "0px 0px 10px rgba(44, 39, 109, 0.1)",
                            borderRadius: "10px",
                            padding: "14px 58px",
                            cursor: "pointer",
                            margin: "auto",
                            maxWidth: "280px",
                            marginTop: "20px",
                        }}
                    >
                        <p>Claim Airdrop</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Airdrop;
