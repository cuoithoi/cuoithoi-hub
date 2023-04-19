import React, { useEffect, useState } from 'react'

const Loading = () => {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
        }, 1500);
    }, []);

    return load && <div className='loading'>
        <span className="loader"></span>
    </div>
}

export default Loading
