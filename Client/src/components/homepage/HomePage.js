import React, { useState } from 'react';
import LeftHomePage from './LeftHomePage';
import RightHomePage from './RightHomePage';

const HomePage = () => {

    const [leftValue, setLeftValue] = useState(0)
    const [rightValue, setRightValue] = useState(0)

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