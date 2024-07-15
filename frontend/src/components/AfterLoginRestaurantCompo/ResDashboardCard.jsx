import React from 'react'
import { ResDashboardCardData } from '../../pages/restaurant/ResDashboardCardData/ResDashboardCardData';

const ResDashboardCard = (props) => {
    const repeatedCard = Array.from({ length: 4 }, () => ResDashboardCardData).flat();
  return (
    <>
    <div className='flex flex-col items-center border border-neutral-300 shadow-md rounded-md px-28 py-4 gap-3'>
        <p className='text-green-500 text-4xl'>
            {props.number}
        </p>
        <p className='text-xl font-medium'>
            {props.description}
        </p>
        
    </div>
    </>
  )
}

export default ResDashboardCard