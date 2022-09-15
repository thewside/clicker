export const Trophy = ({id}) => {
    return(
            <div 
                data-testid="trophy" 
                key={id} 
                className="trophyContainer"
                >
                <img className='trophy'
                    src="https://media.discordapp.net/attachments/973983774046048266/980517344407330876/clipart2713481.png"
                    alt="trophy"
                >
                </img>
            </div>
    )
};