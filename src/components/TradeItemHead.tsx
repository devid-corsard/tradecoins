// import React from 'react'

const TradeItemHead = () => {
  const styleSpan = 'w-28 p-1 m-1 text-left';

  return (
    <div className='flex items-center'>
      <span className={styleSpan} >Amount:</span>
      <div className="flex flex-wrap">
        <span className={styleSpan} >Buy price:</span>
        <span className={styleSpan}>Spend:</span>
      </div>
      <div className="flex flex-wrap">
        <span className={styleSpan} >Sell price:</span>
        <span className={styleSpan}>Recieved:</span>
      </div>
      <span className={styleSpan}>Difference:</span>
      <div>Actions:</div>
    </div>
  )
}

export default TradeItemHead
