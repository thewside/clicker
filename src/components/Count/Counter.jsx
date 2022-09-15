export const Counter = ({count}) => {
    return ( 
        <div 
            className='countField'
        >
            <h1
                id="count"
                data-testid="count"
                className="counter"
            >
            Count: {count}
            </h1>
        </div>
    )
}