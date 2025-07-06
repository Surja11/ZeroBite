import React from 'react'
import zero from "/images/zero.png";
import facebook from "/images/facebook.png";
import instagram from "/images/instagram.png";
import twitter from "/images/twitter.png";
function Footer() {
  return (
    <div>
        <div className='bg-[#7bb400] flex flex-col justify-evenly items-center space-y-5 py-5 '>
<div>
    <img src={zero} alt="zero.png" className='w-25 lg:w-30' />
    <p className='font-bold ml-4  text-[14px] lg:text-[18px]'>Follow us </p>
</div>

<div className='flex justify-between'>
  <div className='mr-5'>
    <img src={facebook} alt="" className='w-7'/>
  </div>
  <div className='mr-5'>
        <img src={instagram} alt="" className='w-7'/>

  </div>
  <div>
        <img src={twitter} alt="" className='w-7'/>

  </div>
</div>
        </div>
    </div>
  )
}

export default Footer