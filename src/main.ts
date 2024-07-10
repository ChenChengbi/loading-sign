import './main.scss';
import { Loading } from './LoadingSign/Loading';

document.querySelector('#btn-full-screen')?.addEventListener('click', () => {
    const unit = Loading.service({ body: true, lock: true });
});

// const unit = Loading.service({ body: true, lock: true });
