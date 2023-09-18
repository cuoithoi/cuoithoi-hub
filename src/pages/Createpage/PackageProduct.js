import React, { useEffect, useState } from 'react'

import { APi, config } from '@/commons/Constant.ts'

import IcCheck from '@/assets/home-image/IcCheck.svg'

import Validate from '@/utils/Validate'
import { useBaseService } from '@/utils/BaseServices'
import Languages from '@/commons/Languages'
import { AnimationOnScroll } from 'react-animation-on-scroll'
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
    <div className="all_services">
      <div className="container mx-auto">
        <div className="all_services_types">
          <div className="head_hot">
            <h2>{Languages.text.packageServices}</h2>
            <span>{Languages.text.hot}</span>
          </div>
          <div className="package_Box_sellect">
            <div className="md:grid md:grid-cols-3 md:gap-10">
              {data?.map(function (item, index) {
                return (
                  <div className="item_package_level" key={index}>
                    <div className="header">
                      {item.name}
                      <div className="header_price">{Validate.formatMoney(item.amount)}</div>
                    </div>
                    <div className="List_item_show">
                      {item.subProduct.map(function (item, index) {
                        return (
                          <div key={index} className="item_single_line">
                            <img src={IcCheck} alt="IcCheck" />
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageProduct
