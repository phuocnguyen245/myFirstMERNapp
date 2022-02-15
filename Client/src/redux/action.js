
export const getHomepageData = (data) =>{
    return {
        type: 'homepage/getHomepageData',
        payload: data
    }
}

export const searchData = (data) =>{
    return {
        type: 'homepage/searchData',
        payload: data
    }
}