// import {createActions} from 'redux-actions';
// export const getHomepageData = createActions({
//     getHomepageData: undefined,
//     getHomepageDataSuccess: (payload) => payload,
//     getHomepageDataFailure: (err) => err
// })
export const getHomepageData = (data) =>{
    return {
        type: 'homepage/getHomepageData',
        payload: data
    }
}
