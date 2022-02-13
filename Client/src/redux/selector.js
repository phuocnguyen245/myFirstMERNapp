import { createSelector } from '@reduxjs/toolkit'

export const rightHeightSelector = state => state.interface.rightHeight
export const leftHeightSelector = state => state.interface.leftHeight
export const heightValue = createSelector(
    rightHeightSelector,
    leftHeightSelector,
    (rightHeight, leftHeight) => {
        const abc = {
            rightHeight , leftHeight
        }
        return abc
    }
)