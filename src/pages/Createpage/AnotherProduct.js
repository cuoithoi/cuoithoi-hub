import React from 'react'

import itemImageServices1 from '@/assets/home-image/IMG_Sv1.png'
import itemImageServices2 from '@/assets/home-image/IMG_Sv2.png'
import itemImageServices3 from '@/assets/home-image/IMG_Sv3.png'

const AnotherProduct = () => {
  return (
    <div className='list_item_services_another'>
      <div className='md:grid md:grid-cols-3 md:gap-6 xs:grid xs:grid-cols-3 xs:gap-6'>
        <div className='item'>
          <div className='item_img'>
            <img src={itemImageServices1} alt='itemImageServices1' />
          </div>
          <div className='item_content'>
            <h3>We got married (2023)</h3>
            <div className='property_type'>
              <div className='property_desc'>Heerak Park, South Korea</div>
              <div className='property_size'>
                <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
              </div>
            </div>
          </div>
        </div>
        <div className='item'>
          <div className='item_img'>
            <img src={itemImageServices2} alt='itemImageServices2' />
          </div>
          <div className='item_content'>
            <h3>Couple at the races (1916)</h3>
            <div className='property_type'>
              <div className='property_desc'>Ethel Plummer, America</div>
              <div className='property_size'>
                <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
              </div>
            </div>
          </div>
        </div>
        <div className='item'>
          <div className='item_img'>
            <img src={itemImageServices3} alt='itemImageServices3' />
          </div>
          <div className='item_content'>
            <h3>Love. Neue graphik (1968)</h3>
            <div className='property_type'>
              <div className='property_desc'>Robert Indiana, America</div>
              <div className='property_size'>
                <span>Kích thước: A3</span>|<span>Khung Gỗ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnotherProduct
