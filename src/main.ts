import './main.scss';
import { Loading } from './LoadingSign/Loading';

const DURATION = 3000;

// 加载状态添加到 body 上，全屏显示
document.querySelector('#btn-body-full-screen')?.addEventListener('click', () => {
    const unit = Loading.service({ body: true, fullscreen: true, lock: true });
    setTimeout(() => { unit.close(); }, DURATION);
});

// 加载状态添加到 DOM 节点上, 不全屏显示
document.querySelector('#btn-div-specified-region')?.addEventListener('click', () => {
    // const target = document.querySelector('.specified-region') as HTMLElement;
    const unit = Loading.service({ target: '.specified-region', fullscreen: false, lock: true });
    setTimeout(() => { unit.close(); }, DURATION);
});

// 加载状态添加到 body 上, 不全屏显示
document.querySelector('#btn-body-specified-region')?.addEventListener('click', () => {
    const target = document.querySelector('.specified-region') as HTMLElement;
    const unit = Loading.service({ target, body: true, fullscreen: false, lock: true });
    setTimeout(() => { unit.close(); }, DURATION);
});

// 加载状态添加到 DOM 节点上, 全屏显示
document.querySelector('#btn-div-full-screen')?.addEventListener('click', () => {
    const target = document.querySelector('.specified-region') as HTMLElement;
    const unit = Loading.service({ target, fullscreen: true, lock: true });
    setTimeout(() => { unit.close(); }, DURATION);
});