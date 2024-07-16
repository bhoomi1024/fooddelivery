import React from 'react'
import chef from '../../assets/chef image.webp'
import { ResDashboardCardData } from './ResDashboardCardData/ResDashboardCardData';
import ResDashboardCard from '../../components/AfterLoginRestaurantCompo/ResDashboardCard';


function ResDashboard() {
  //Total menus, total revenue, items sold, No of orders will be fetched from backend 
  const repeatedCard = Array.from({ length: 4 }, () => ResDashboardCardData).flat();
  return (
    <>
      <div className='flex flex-col items-center  ml-60 mt-[78px] w-full font-poppins'>
        <div className='text-3xl mt-8 font-semibold'>
          Restaurant XYZ
        </div>
        <div className='inline-flex mt-12 '>
          <div className='grid grid-cols-2 gap-8 h-72 ml-8'>
            {repeatedCard.map((item, index) => (
              <ResDashboardCard
                key={index}
                number={item.number}
                description={item.description}
              />
            ))}
          </div>
          <div className='size-72 ml-20 -mt-16 bg-red-300'>
            <img src={chef} alt="" />
          
          </div>
        </div>
      </div>
    </>
  )
}

export default ResDashboard