import React from 'react'
import './styles.css';

function ItemList({title,description,link}) {
  return (
    <div className='itemlist'>

        <strong>{title}</strong>
            <p>{description}</p>
            
            <div className='linke'>
                <a href={link}>Link do Projeto</a>
            </div>

            <div className='divi'>
                <hr />
            </div>
    </div>
  )
}

export default ItemList