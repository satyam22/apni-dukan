
import { API_BASE_URL } from './../config';
import loadInitialData from './initialData';



export default function* indexSaga() {
  console.log("Hello Saga");
  yield [loadInitialData()]
}