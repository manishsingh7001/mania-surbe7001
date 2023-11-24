import React, { useRef } from 'react'
import { Link } from 'react-router-dom';    

const Main = () => {
    const inputRef = useRef(null)
  return (
    <div className='cont'>
        <h1 >Quiz Applications</h1>

        <ol>
            <li>You will asked 10 question one after one.</li>
            <li>10 points is awarded for correct answer.</li>
            <li>Each question has four option.You can choose only onw option.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>the result will be declared at the end of quiz.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} type="text" className='userid' placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'}>Start Quiz</Link>
        </div>
      
    </div>
  )
}

export default Main
