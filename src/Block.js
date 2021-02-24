
export default function Block(props){
    return (
        <button
            name={props.name}
            className="blockContainer"
            onClick={props.handler}
            data-event="play"
        >
        {
            !props.input ? null : (props.input === 1 ? 
            <div className="playerOneCoin"></div> : 
            <div className="playerTwoCoin"></div>)
        }
        </button>
    )
}