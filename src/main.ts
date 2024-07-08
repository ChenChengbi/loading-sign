import './main.scss';
import { Loading } from './LoadingSign/Loading';

function toggleLoading() {
    const unit = Loading.service({ body: true, lock: true });
}