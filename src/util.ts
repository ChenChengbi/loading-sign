export function addClassFirst(element: HTMLElement, className: string) {
    let classes = Array.from(element.classList); // 获取所有类名
    classes.forEach(c => element.classList.remove(c)); // 移除所有类名
    element.classList.add(className); // 添加新的类名
    classes.forEach(c => element.classList.add(c)); // 添加原来的类名
}