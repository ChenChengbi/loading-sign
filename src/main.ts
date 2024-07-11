import './main.scss';
import { Loading } from './LoadingSign/Loading';

document.querySelector('#btn-full-screen')?.addEventListener('click', () => {
    const unit = Loading.service({ body: true, lock: true });
    setTimeout(() => {
        unit.close();
    }, 2000);
});

document.querySelector('#btn-specified-region')?.addEventListener('click', () => {
    const target = document.querySelector('.specified-region') as HTMLElement;
    console.log('target :>> ', target);
    const unit = Loading.service({ target, fullscreen: false });
    // setTimeout(() => {
    //     unit.close();
    // }, 5000);
});

// const unit = Loading.service({ body: true, lock: true });
