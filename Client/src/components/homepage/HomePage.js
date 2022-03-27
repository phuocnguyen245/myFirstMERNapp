import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHomepageDataFetch } from './homePageSlice';
import LeftHomePage from './LeftHomePage';
import RightHomePage from './RightHomePage';

const HomePage = () => {

    const [leftValue, setLeftValue] = useState(0)
    const [rightValue, setRightValue] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHomepageDataFetch())
    }, [dispatch])
    const left = (left) => {
        setLeftValue(() => left)
    }
    const right = (right) => {
        setRightValue(() => right)
    }

    return (
        <div>
            <LeftHomePage left={left} rightValue={rightValue} />
            <RightHomePage right={right} leftValue={leftValue} />
        </div>
    )
}

export default HomePage