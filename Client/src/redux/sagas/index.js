import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { getCategoriesSuccess, getShopSuccess, getSearchSuccess, getSearchFetch } from '../../components/homepage/homePageSlice'

function* getData(action) {
    const cats = yield call(() => axios.get('http://localhost:5000/api/homepage/'))
    const formattedCats = yield cats.data
    yield put(getCategoriesSuccess(formattedCats.categories))
    yield put(getShopSuccess(formattedCats.shops))
}
function* searchData(action) {
    const searchApi = yield call(() => axios.get(`http://localhost:5000/api/search?q=${action.payload}`))
    const data = yield searchApi.data
    yield put(getSearchSuccess(data.shops))
}
function* mySaga() {
    yield takeEvery('homepage/getHomepageDataFetch', getData)
    yield takeEvery('homepage/getSearchFetch', searchData)
}
export default mySaga;
