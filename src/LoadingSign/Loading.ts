import './loading.scss';
import { LoadingUnit } from "./LoadingUnit";

export class Loading {

    // 全屏 Loading 的单列
    private static fullscreenInstance: LoadingUnit | null = null;

    /**
     * 创建一个“加载状态”实例
     * 以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
     */
    public static service(options: {
        target?: HTMLElement | string,
        body?: boolean,
        fullscreen?: boolean,
        lock?: boolean,
        text?: string,
        spinner?: HTMLElement,
        background?: string,
        customClass?: string,
        size?: number,
    }): LoadingUnit {
        const {
            target,
            body = false,
            fullscreen = true,
            lock = false,
            text,
            spinner,
            background = 'rgba(0, 0, 0, 0.7)',
            customClass,
            size = 42
        } = options;

        if (!body && !target) throw new Error('[Loading] target is required when body is false');

        let _target: HTMLElement;

        if (target) {
            if (typeof target === 'string') {
                const ele = document.querySelector(target);
                if (ele instanceof HTMLElement) _target = ele;
                else throw new Error(`[Loading] target is not a valid HTMLElement: ${target}`);
            } else _target = target;
        } else {
            _target = document.body; // 默认为 body
        }

        // 若全屏 Loading 已存在，则返回现有全屏 Loading 的实例；否则创建一个新的全屏 Loading 实例
        if (fullscreen && Loading.fullscreenInstance && Loading.fullscreenInstance.isVisible) {
            return Loading.fullscreenInstance;
        } else {
            const unit = new LoadingUnit({
                target: _target,
                body,
                fullscreen,
                lock,
                text,
                spinner,
                background,
                customClass,
                size,
            });

            if (fullscreen)
                Loading.fullscreenInstance = unit;

            unit.show();
            return unit;
        }
    }
}