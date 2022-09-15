import {makeArr} from './makeArr';
import {Trophy } from './Trophy.jsx';
import { useEffect, useState } from 'react'; 

export const Trophies = ({trophies}) => {
    const [trophiesCount, setTrophiesCount] = useState(0);
    useEffect(() =>
        setTrophiesCount(() => Math.floor(trophies / 10))
    ,[trophiesCount, trophies])
        
    return(
        <div
            className='trophyField'
        >
            {makeArr(trophiesCount, id => <Trophy key={id}/>)}
        </div>
    )
}
