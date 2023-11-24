import React, { useState } from 'react'

const Questions = () => {
    const [checked,setChecked] = useState(undefined)

    function onSelect(){
        setChecked(true)
console.log('radio button change')
    }
  return (
    <div>
        <h1>Simple Questions</h1>

        <ul>
            <li>
                <input type="radio" value={false} name="options" id='q1-option' onChange={onSelect} />
                <label htmlFor='q1-option'>options</label>
            </li>
        </ul>
      
    </div>
  )
}

export default Questions
