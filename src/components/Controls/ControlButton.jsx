export const ControlButton = ({onClick, wait})=>{
    return(
        <div className="controlField">
            <button
                data-testid="countButton"
                className='buttonClick'
                onFocus={event => event.target.blur()}
                onKeyDown={onClick}
                onClick={onClick}
                style={{ backgroundColor: wait === true ? "green" : "yellow" }}
            >
                Tap / click / space key
            </button >
        </div>

    )
}

