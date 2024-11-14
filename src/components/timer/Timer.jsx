import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'

const Timer = ({timeLeft, setTimeLeft, onTimerEnd, duration}) => {
    const {timerRunning} = useContext(AppContext)

    useEffect(() => {
        const timer = setInterval(( ) => {
            if (timerRunning) {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - 1)
                } else {
                    clearInterval(timer)
                    onTimerEnd()
                }
            }
        }, 1000)

        return () => clearInterval(timer)

    }, [duration, timeLeft, onTimerEnd])
  return (
    <span className='timer'>{timeLeft}s</span>
  )
}

export default Timer