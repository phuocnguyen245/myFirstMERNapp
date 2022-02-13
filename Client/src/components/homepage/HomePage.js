import React from 'react'
import LeftHomePage from './LeftHomePage'
import RightHomePage from './RightHomePage'
import { useState } from 'react';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getHomepageDataFetch } from './homePageSlice'
const HomePage = () => {
    const [leftValue, setLeftValue] = useState(0)
    const [rightValue, setRightValue] = useState(0)

    const left = (left) => {
        setLeftValue(() => left)
    }
    const right = (right) => {
        setRightValue(() => right)
    }
    const homePageData = useSelector(state => state.homepage)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHomepageDataFetch())
    }, [dispatch])
      console.log(homePageData);
    return (
        <div>
            <h1>{rightValue}</h1>
            <LeftHomePage left={left} rightValue={rightValue} />
            <RightHomePage right={right} leftValue={leftValue} />
            <h1>{rightValue}</h1>
        </div>
    )
}

export default HomePage