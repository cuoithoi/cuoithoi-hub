import Languages from '@/commons/Languages';
import React, { useCallback, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export const Panel = (props) => {
    const { title, children, valiOpen, date, noFields, icon, style, textNofields } = props;

    const [open, setOpen] = useState(true)

    const handleChange = useCallback(() => {
        setOpen(!open)
    }, [open])

    return (
        <div className={`accordion ${valiOpen == false || !open ? 'ishow' : 'isclose'}`}>
            <div className="panel multi-collapse" onClick={handleChange}>
                <div className='card_body'>
                    <h2 className={`collapse-child-title ${style}`}>
                        <div className='right_title_panel'>

                            {
                                date && <span className='date'>
                                    {date}
                                </span>
                            }
                            {
                                !open ? <FaAngleUp /> : <FaAngleDown />
                            }
                            {
                                icon && <span className='text-center' style={{ display: 'inline-block', fontSize: 14 }}>{icon}</span>
                            }
                        </div>
                        {title}
                        {
                            noFields && <span className='no_fields'>
                                {textNofields || Languages.text.noFields}
                            </span>
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
