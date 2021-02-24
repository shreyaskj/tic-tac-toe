export default function Result(props){
    return (
        <div className={`resultContainer ${props.className}`}>
            <h3>{"Results Dashboard"}</h3>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>{"Player"}</td>
                            <td>{"Number of Win's"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <b>{"First Player"}</b>
                                <div className="playerOneCoin"></div>
                            </td>
                            <td>{props.firstPlayerCount || 0}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>{"Second Player"}</b>
                                <div className="playerTwoCoin"></div>
                            </td>
                            <td>{props.secondPlayerCount || 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}