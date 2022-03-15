import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
    getCategoriesSuccess, getSearchSuccess, getShopSuccess
} from '../../components/homepage/homePageSlice'
import { getUserInfoSuccess } from '../../components/loginPage/loginSlice'
function* getData() {
    const header = localStorage.getItem('accessToken')
    if (header) {
        const homepageApi = yield call(() => axios.get('http://localhost:5000/api/homepage/',
            { headers: { authorization: `Bearer ${JSON.parse(header)}` } }
        ))
        const data = yield homepageApi.data
        yield put(getCategoriesSuccess(data.categories))
        yield put(getShopSuccess(data.shops))
    }
}

function* searchData(action) {
    const searchApi = yield call(() => axios.get(`http://localhost:5000/api/search?q=${action.payload}`))
    const data = yield searchApi.data
    yield put(getSearchSuccess(data.shops))
}

function* checkData(action) {
    const userApi = yield call(() => axios.post('http://localhost:5000/api/check-user', action.payload))
    const data = yield userApi.data
    console.log(userApi.data);
    yield put(getUserInfoSuccess(data))
}

function* mySaga() {
    yield takeEvery('homepage/getHomepageDataFetch', getData)
    yield takeEvery('homepage/getSearchFetch', searchData)
    yield takeEvery('loginpage/getUserInfoFetch', checkData)
}
export default mySaga;
