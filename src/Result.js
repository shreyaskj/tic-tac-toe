export default function Result(props) {
    return (
        <div className={`resultContainer ${props.className}`}>
            <h3>{"Number of Win's"}</h3>
            <div className="relative">
                <div className="playerOneCoinResult">{props.firstPlayerCount || 0}</div>
                <div className="playerTwoCoinResult">{props.secondPlayerCount || 0}</div>
            </div>
        </div>
    )
}