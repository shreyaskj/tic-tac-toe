
export default function Block({ name, handler, input }) {
    return (
        <button
            name={name}
            className="blockContainer"
            onClick={handler}
            data-event="play"
        >
            {
                !input ? null : (input === 'one' ?
                    <div className="playerOneCoin"></div> :
                    <div className="playerTwoCoin"></div>)
            }
        </button>
    )
}