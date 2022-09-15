export const OverdriveTimer = ({isOverdrive, countOverdrive}) => {
    return (
        <div className='overdriveField'>
            <h1
             data-testid='overdrive'
             className='overdrive'
             >
            {isOverdrive ? "Overdrive: " + countOverdrive : <></>}
            </h1>
        </div>
    )
};