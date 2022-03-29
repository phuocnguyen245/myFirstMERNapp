import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHomepageDataFetch } from '../homePageSlice';
import LeftHomePage from './LeftHomePage'
import RightHomePage from './RightHomePage';

const HomePage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHomepageDataFetch())
    }, [dispatch])

    return (
        <div>
            <LeftHomePage />
            <RightHomePage />
        </div>
    )
}

export default HomePage