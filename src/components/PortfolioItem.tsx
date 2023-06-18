import React from 'react';
import TradeData from '../types/TradeDataType';
import TradeItem from './TradeItem'

type Props = {
  name: string,
  data: TradeData[],
}

const PortfolioItem = ({ data, name }: Props) => {

  const handleAddNew = () => { console.log("add new"); };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`new name: ${e.currentTarget.value}`);
  };
  return (
    <div className='bg-white rounded-md shadow-md mx-auto flex flex-col items-center gap-4 p-4 m-4' >
      <input
        type='text'
        placeholder='coin name'
        className='w-96 rounded-md shadow-md border-neutral-200 p-2 border-solid border'
        defaultValue={name}
        onChange={handleNameChange}
      />
      <div className='flex flex-col'>
        {data.map((data, id) => <TradeItem data={data} key={id} />)}
        <button
          className="m-1 p-1 border bg-white hover:bg-gray-100 active:bg-orange-100"
          onClick={handleAddNew}
        >
          Add new
        </button>
      </div>
    </div >
  )
}

export default PortfolioItem
