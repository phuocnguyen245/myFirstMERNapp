import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { getHomepageDataSuccess } from '../../components/homepage/homePageSlice'

function* getData() {
    const cats = yield call(() => axios.get('http://localhost:5000/'))
    const formattedCats = yield cats.data
    console.log(formattedCats);
    yield put(getHomepageDataSuccess(formattedCats))
}
function* mySaga() {
    yield takeLatest('homepage/getHomepageDataFetch', getData)
}
export default mySaga;
