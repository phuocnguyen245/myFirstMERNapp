// import { createSelector } from '@reduxjs/toolkit'

import { RootState } from './store';

export const categoriesSelector = (state: RootState) => state.homepage.categories;
export const shopsSelector = (state: RootState) => state.homepage.shops;
// export const heightValue = createSelector(
//     rightHeightSelector,
//     leftHeightSelector,
//     (rightHeight, leftHeight) => {
//         const abc = {
//             rightHeight , leftHeight
//         }
//         return abc
//     }
// )
