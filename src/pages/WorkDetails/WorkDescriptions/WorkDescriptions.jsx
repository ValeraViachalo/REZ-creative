import React, { useContext } from 'react'

import './WorkDescriptions.scss';
import { DataContext } from '@/helpers/dataHelpers/dataProvider';

export default function WorkDescriptions() {
  const { data, isLoading } = useContext(DataContext);

  return !isLoading && data.main && (
    <section className='container work-descriptions'>
      <p className="work-descriptions__descriptions">{data.main.descriptions}</p>

      <div className="info-list__wrapper">
        {data.main.info_list && data.main.info_list.map((currList, i) => (
          <div className="info-list semiBold smallText" key={`${currList.title}--${i}`}>
            <p>{currList.title}</p>
            <p>{currList.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
