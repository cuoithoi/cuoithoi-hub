import React, { useCallback, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export const Panel = (props) => {
    const { title, children, valiOpen } = props;

    const [open, setOpen] = useState(true)

    const handleChange = useCallback(() => {
        setOpen(!open)
    }, [open])

    return (
        <div className='accordion '>
            <div className="panel multi-collapse" onClick={handleChange}>
                <div className='card_body'>
                    <h2 className='collapse-child-title'>
                        {title}
                        {
                            !open ? <FaAngleUp /> : <FaAngleDown />
                        }
                    </h2>
                </div>
            </div>
            <div className={`${'collapse-child'} ${valiOpen == false || !open ? 'ishow' : 'isclose'}`}>
                {children}
            </div>
        </div>
    );
};
