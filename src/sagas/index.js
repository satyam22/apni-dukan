
import loadInitialData from './initialData';

export default function* indexSaga() {
  yield [loadInitialData()];
}