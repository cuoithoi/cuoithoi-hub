import React, { useEffect, useState } from 'react'

import { APi, config } from '@/commons/Constant.ts'

import IcCheck from '@/assets/home-image/IcCheck.svg'

import Validate from '@/utils/Validate'
import { useBaseService } from '@/utils/BaseServices'
const PackageProduct = () => {
  const [data, setData] = useState(null)
  const { get } = useBaseService()
  useEffect(() => {
    const asyncListProduct = async () => {
      const response = await get(APi.listProduct, config)
      setData(response.data)
    }
    asyncListProduct()
  }, [])
  return (
    <div className='scale-90 text-sm md:text-lg'>
      <h2 className='text-4xl font-bold pb-10'>Các gói dịch vụ</h2>
      <div className='xs:grid xs:grid-cols-3 xs:gap-10'>
        {data?.map(function (item, index) {
          return (
            <div className='item_package_level'>
              <div className='header' style={{ backgroundColor: '#cf9897' }}>
                {item.name}
                <div className=' text-white'>
                  {Validate.formatMoney(item.amount)}
                </div>
              </div>
              <div className='List_item_show'>
                {item.subProduct.map(function (item, index) {
                  return (
                    <div key={index} className='item_single_line'>
                      <img src={IcCheck} alt='IcCheck' />
                      {item.name}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PackageProduct
