import './loading.scss';
import { LoadingUnit } from "./LoadingUnit";

export class Loading {

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

        unit.show();

        return unit;
    }
}