const defaultSpinnerSvg = `<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>`;
import { addClassFirst } from "../util";

export class LoadingUnit {
    private _target: HTMLElement; // Loading 需要覆盖的 DOM 节点
    private _body: boolean; // 是否在 body 上添加加载状态
    private _fullscreen: boolean; // 是否全屏显示加载状态
    private _lock: boolean; // 是否锁定滚动条
    private _text?: string; // 加载状态的文本
    private _spinner: HTMLElement; // 加载状态的图标
    private _background: string; // 加载状态的遮罩的背景色
    private _customClass?: string; // 加载状态的自定义类名
    private _size?: number; // 加载状态的大小

    private _loadingElement?: HTMLElement; // 加载状态的 DOM 节点
    private _isClosed: boolean = false; // 是否已销毁

    private get container(): HTMLElement {
        let container;
        if (this._body) container = document.body;
        else container = this._target;
        return container;
    }

    public get target(): HTMLElement | null {
        return this._target;
    }

    // 是否可见
    public get isVisible(): boolean {
        return !this._isClosed;
    }

    constructor(params: {
        target: HTMLElement,
        body: boolean,
        fullscreen: boolean,
        lock: boolean,
        text?: string,
        spinner?: HTMLElement,
        background: string,
        customClass?: string,
        size: number,
    }) {
        const {
            target,
            body,
            fullscreen,
            lock,
            text,
            spinner,
            background,
            customClass,
            size,
        } = params;

        this._target = target;
        this._body = body;
        this._fullscreen = fullscreen;
        this._lock = lock;
        this._text = text;
        this._background = background;
        this._customClass = customClass;
        this._size = size;

        if (spinner instanceof HTMLElement) this._spinner = spinner;
        else this._spinner = this.generateDefaultSpinner(size);

        addClassFirst(this._spinner, 'loading__spinner');
    }

    // 展示加载状态
    public show(): void {
        if (!this._loadingElement) {
            this._loadingElement = this.generateLoadingElement();
        }

        let container;
        if (this._body) container = document.body;
        else container = this._target;

        // 如果已经存在，则不重复添加
        // (hide 之后不销毁，只隐藏，需要判断是否已经存在；close 之后销毁，不需要判断；但不知道之前是调用了 hide 还是 close，所以还是判断一下)
        if (!container.contains(this._loadingElement)) {
            container.appendChild(this._loadingElement);
        }

        container.classList.add('loading-parent');
        this._loadingElement.style.display = 'block';
        this._isClosed = false; // 设置为 false，表示未销毁
    }

    // // 隐藏加载状态
    // public hide(): void {
    //     if (this._loadingElement) {
    //         // 只隐藏，不销毁
    //         this._loadingElement.style.display = 'none';
    //     }
    // }

    // 关闭(销毁)加载状态
    public close(): void {
        if (this._loadingElement) {
            // 销毁
            this._loadingElement.remove();
            this._loadingElement = undefined;
        }

        let container;
        if (this._body) container = document.body;
        else container = this._target;

        container.classList.remove('loading-parent');
        this._isClosed = true; // 设置为 true，表示已销毁
    }

    // 生成加载状态的完整 DOM 节点
    private generateLoadingElement(): HTMLElement {
        const mask = this.generateLoadingMask();
        const container = this.generateSpinnerContainer();
        container.appendChild(this._spinner);
        mask.appendChild(container);
        return mask;
    }

    // 生成默认的加载状态图标
    private generateDefaultSpinner(size: number): HTMLElement {
        const spinner = document.createElement('div');
        spinner.className = 'default-spinner';
        // const svgElement = new DOMParser().parseFromString(defaultSpinnerSvg, 'image/svg+xml').documentElement;
        // spinner.appendChild(svgElement.cloneNode(true));
        spinner.innerHTML = defaultSpinnerSvg;
        spinner.style.width = `${size}px`;
        spinner.style.height = `${size}px`;
        return spinner;
    }

    // 生成加载状态的容器
    private generateSpinnerContainer(): HTMLElement {
        const spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'loading__spinner-container';
        return spinnerContainer;
    }

    // 生成加载状态的遮罩
    private generateLoadingMask(): HTMLElement {
        const loadingMask = document.createElement('div');
        loadingMask.className = 'loading__mask';
        loadingMask.style.backgroundColor = this._background;

        const spinner = this._spinner;
        loadingMask.appendChild(spinner);

        if (this._customClass) {
            loadingMask.classList.add(this._customClass);
        }
        if (this._fullscreen) {
            loadingMask.classList.add('fullscreen');
        }
        // if (this._body) {
        //     loadingElement.classList.add('loading--body');
        // }
        if (this._lock) {
            loadingMask.classList.add('lock');
        }
        if (this._text) {
            const textElement = document.createElement('div');
            textElement.className = 'loading__text';
            textElement.textContent = this._text;
            loadingMask.appendChild(textElement);
        }

        return loadingMask;
    }

    // public destroy(): void {
    //     // ...
    // }

    // private _create(): void {
    //     // ...
    // }

    // private _update(): void {
    //     // ...
    // }

    // private _destroy(): void {
    //     // ...
    // }

    // private _mount(): void {
    //     // ...
    // }

    // private _unmount(): void {
    //     // ...
    // }
}