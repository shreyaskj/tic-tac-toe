export default function Result({className, playerWinningCount}) {
    const { first, second } = playerWinningCount;

    return (
        <div className={`resultContainer ${className}`}>
            <h3>{"Number of Win's"}</h3>
            <div className="relative">
                <div className="playerOneCoinResult">{first || 0}</div>
                <div className="playerTwoCoinResult">{second || 0}</div>
            </div>
        </div>
    )
}