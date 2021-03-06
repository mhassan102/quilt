import { call, put, takeLatest } from 'redux-saga/effects';

import makeError from 'utils/error';
import config from 'constants/config';
import { requestJSON } from 'utils/request';

import {
  getLatestError,
  getLatestSuccess,
} from './actions';

import { GET_LATEST } from './constants';

function* doGetLatest() {
  try {
    const { api: server } = config;
    const endpoint = `${server}/api/recent_packages`;
    const response = yield call(requestJSON, endpoint, { method: 'GET' });
    if (response.message) {
      throw makeError('Package hiccup', response.message);
    }
    yield put(getLatestSuccess(response));
  } catch (err) {
    if (!err.headline) {
      err.headline = 'Package hiccup';
      err.detail = `doGetPackage: ${err.message}`;
    }
    yield put(getLatestError(err));
  }
}

function* watchGetLatest() {
  yield takeLatest(GET_LATEST, doGetLatest);
}

export default [
  watchGetLatest,
];
