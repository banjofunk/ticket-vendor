import React from 'react'
import './progress.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { checkoutPath } from 'paths/app'

const Progress = ({activeClass}) => {
  const steps = ['cart', 'payment', 'tickets']
  const progressItems = steps.map( (step, index) => {
    const active = activeClass.includes(step) ? 'active' : ''
    return(
      <li
        key={index}
        className={classNames(active, 'progress-item')}
        icon={step}>
        <Link to={checkoutPath(step)}>
          {step}
        </Link>
      </li>
    )
  })
  return (
    <div className={'progress-container'}>
      <ul className={'progress-bar'}>
        {progressItems}
      </ul>
      <br />
      <br />
    </div>
  )
}

export default Progress
