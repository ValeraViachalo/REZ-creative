import React, { useContext } from 'react'

import './WorkDescriptions.scss';

export default function WorkDescriptions({ data }) {

  return data && (
    <section className='container work-descriptions'>
      <p className="work-descriptions__descriptions">{data.descriptions}</p>

      <div className="info-list__wrapper">
        {data.info_list && data.info_list.map((currList, i) => (
          <div className="info-list semiBold smallText" key={`${currList.title}--${i}`}>
            <p>{currList.title}</p>
            <p>{currList.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
