import './loading.scss';
import { LoadingUnit } from "./LoadingUnit";

export class Loading {

    // 全屏 Loading 的单列
    private static fullscreenInstance: LoadingUnit | null = null;
    // 保存非全屏 Loading 的实例
    private static loadingUnitsMap: Map<HTMLElement, LoadingUnit> = new Map();

    /**
     * 创建一个“加载动画”实例
     * 以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
     * 以服务的方式调用的非全屏 Loading 不是单例的：每次调用都会创建一个新的 Loading 实例；
     * 但是，若在同一个 DOM 节点上，前一个非全屏 Loading 关闭前再次调用非全屏 Loading，则会返回现有非全屏 Loading 的实例
     * @param options 配置项
     * @param options.target 加载动画要覆盖的 DOM 节点或 DOM 选择器
     * @param options.body 是否在 body 上添加加载动画(默认值为 false)
     * @param options.fullscreen 是否全屏显示加载动画(默认值为 false)
     * @param options.lock 是否锁定滚动条(默认值为 false)
     * @param options.text 加载动画的文本
     * @param options.spinner 加载动画的图标
     * @param options.background 加载动画的遮罩的背景色(默认值为 'rgba(0, 0, 0, 0.7)'
     * @param options.customClass 加载动画的自定义类名
     * @param options.size 加载动画的大小(默认值为 42)
     * @throws 当 body 为 false 且 target 不存在时抛出异常
     * @throws 当 body 为 true 且 fullscreen 为 false 且 target 不存在时抛出异常
     * @throws 当 target 为字符串时，且 document.querySelector(target) 不存在时抛出异常
     * @returns “加载动画”实例
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
            fullscreen = false,
            lock = false,
            text,
            spinner,
            background = 'rgba(0, 0, 0, 0.7)',
            customClass,
            size = 42
        } = options;

        if (!body && !target) throw new Error('[Loading] target is required when body is false');
        if (!fullscreen && body && !target) throw new Error('[Loading] target is required when body is true and fullscreen is false');

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
        } else if (!fullscreen && Loading.loadingUnitsMap.has(_target) && Loading.loadingUnitsMap.get(_target)?.isVisible) {
            // 若非全屏 Loading 已存在，则返回现有非全屏 Loading 的实例；否则创建一个新的非全屏 Loading 实例
            return Loading.loadingUnitsMap.get(_target) as LoadingUnit;
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
            else
                Loading.loadingUnitsMap.set(_target, unit);

            unit.show();
            return unit;
        }
    }
}