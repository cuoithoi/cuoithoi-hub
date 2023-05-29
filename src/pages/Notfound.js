import Loading from '@/components/Loading'
import React from 'react'
import { FaReplyAll } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Notfound = () => {
    return (
        <>
            <Loading />
            <div className='Notfound'>

                <div className="number">404</div>
                <div className="text"><span>Ooops...</span><br />page not found</div>
                <Link className="backlink" to="/">Quay lại trang chủ  <FaReplyAll /></Link>
            </div>
        </>

    )
}


export default Notfound
