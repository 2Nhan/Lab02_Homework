export interface VNode {
  type: string | ComponentFunction;
  props: Record<string, any>;
  children: (VNode | string | number)[];
}

export interface ComponentProps {
  children?: (VNode | string | number)[];
  [key: string]: any;
}

export type ComponentFunction = (props: ComponentProps) => VNode | string | number;

let currentRoot: HTMLElement | null = null;
let currentVNode: VNode | null = null;
let hookStates: any[] = [];
let hookIndex = 0;

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, any> | null,
  ...children: (VNode | string | number | boolean | null | undefined)[]
): VNode {
  const safeProps = props ? { ...props } : {};
  const flatChildren = (children ?? [])
    .flat()
    .filter((c): c is VNode | string | number => c != null && c !== false);
  (safeProps as ComponentProps).children = flatChildren;
  return { type, props: safeProps, children: flatChildren };
}

export function createFragment(
  props: Record<string, any> | null,
  ...children: (VNode | string | number)[]
): VNode {
  return createElement("fragment", props, ...children);
}

function setProp(el: HTMLElement, key: string, value: any) {
  if (value == null || value === false) return;
  if (key === "children") return;
  if (key === "ref") {
    if (typeof value === "function") value(el);
    else if (typeof value === "object" && "current" in value) value.current = el;
    return;
  }
  if (key.startsWith("on") && typeof value === "function") {
    const eventName = key.slice(2).toLowerCase();
    el.addEventListener(eventName, value as EventListener);
    return;
  }
  if (key === "className") {
    el.setAttribute("class", String(value));
    return;
  }
  if (key === "style") {
    if (typeof value === "string") {
      el.setAttribute("style", value);
    } else if (typeof value === "object") {
      const css = Object.entries(value)
        .map(([k, v]) => {
          const kebabKey = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
          return `${kebabKey}:${v}`;
        })
        .join(";");
      el.setAttribute("style", css);
    }
    return;
  }
  if (typeof value === "boolean") {
    if (value) el.setAttribute(key, "");
    return;
  }
  el.setAttribute(key, String(value));
}

export function renderToDOM(vnode: VNode | string | number): Node {
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }
  if (typeof vnode.type === "function") {
    const rendered = (vnode.type as ComponentFunction)(vnode.props);
    return renderToDOM(rendered);
  }
  if (vnode.type === "fragment") {
    const frag = document.createDocumentFragment();
    vnode.children.forEach((child) => frag.appendChild(renderToDOM(child)));
    return frag;
  }
  const el = document.createElement(vnode.type as string);
  for (const [k, v] of Object.entries(vnode.props || {})) setProp(el, k, v);
  vnode.children.forEach((child) => el.appendChild(renderToDOM(child)));
  return el;
}

export function mount(vnode: VNode, container: HTMLElement): void {
  currentRoot = container;
  currentVNode = vnode;
  hookIndex = 0;
  container.innerHTML = "";
  container.appendChild(renderToDOM(vnode));
}

function rerender() {
  if (!currentRoot || !currentVNode) return;
  hookIndex = 0;
  currentRoot.innerHTML = "";
  currentRoot.appendChild(renderToDOM(currentVNode));
}

export function useState<T>(initialValue: T): [() => T, (v: T) => void] {
  const idx = hookIndex;
  if (hookStates[idx] === undefined) {
    hookStates[idx] = initialValue;
  }
  const get = () => (hookStates[idx] === undefined ? initialValue : hookStates[idx]);
  const set = (v: T) => {
    hookStates[idx] = v;
    requestAnimationFrame(rerender);
  };
  hookIndex++;
  return [get, set];
}
