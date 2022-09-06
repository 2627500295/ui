import { html, LitElement } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";

export type SpaceSize = number | "mini" | "small" | "medium" | "large";

function wrap(wrapper: HTMLElement, element: HTMLElement) {
  if (!element.parentElement) return;
  element.parentElement.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

@customElement("ui-space")
export class Space extends LitElement {
  @queryAssignedElements({})
  public _children!: HTMLElement[];

  @queryAssignedElements({ slot: "split" })
  public _split!: HTMLElement[];

  @property({ type: Boolean })
  public rtl?: boolean;

  @property({ type: Boolean })
  public vertical?: boolean;

  @property({ type: Boolean })
  public block?: boolean;

  @property({ type: Boolean })
  public wrap?: boolean;

  @property({ type: Boolean })
  public fill?: boolean;

  @property({ type: Array })
  public size: SpaceSize | SpaceSize[] = "small";

  @property({ type: String })
  public align?: "start" | "end" | "center" | "baseline";

  public getMargin(size: SpaceSize) {
    if (typeof size === "number") return size;

    const sizes = {
      mini: 4,
      small: 8,
      medium: 6,
      large: 24,
    };

    return sizes[size] ?? sizes.small;
  }

  public getMarginStyle(index: number) {
    const isLast = this._children.length === index + 1;
    console.log(isLast);
    const marginDirection = this.rtl ? "margin-left" : "margin-right";
    const marginHorizontal = this.getMargin(Array.isArray(this.size) ? this.size[0] : this.size);
    const marginButton = this.getMargin(Array.isArray(this.size) ? this.size[1] : this.size);
    let str = "";
    if (this.wrap || this.vertical) str += `margin-bottom: ${marginButton}px;`;
    if ((this.wrap || !this.vertical) && !isLast) str += `${marginDirection}: ${marginHorizontal}px;`;
    return str;
  }

  public createWrapper<K extends keyof HTMLElementTagNameMap = "div">(tagName: K = "div" as K) {
    const wrapper = document.createElement(tagName);
    wrapper.className = "space-item";
    return wrapper;
  }

  public override firstUpdated() {
    const lastIndex = this._children.length - 1;

    const splitChildren = this._split[0];

    this._children.forEach((element, index) => {
      const isLast = lastIndex === index;

      // 包裹
      const wrapper = document.createElement("div");
      wrapper.className = "space-item";
      wrapper.style = this.getMarginStyle(index);
      wrap(wrapper, element);

      // 间隔符
      if (splitChildren && !isLast) {
        const splitElement = this._split[0].cloneNode(true) as HTMLElement;
        splitElement.removeAttribute("slot");
        const splitWrapper = document.createElement("div");
        splitWrapper.className = "space-split";
        splitWrapper.appendChild(splitElement);
        wrapper.parentElement!.insertBefore(splitWrapper, wrapper.nextSibling);
      }
    });

    // 移除间隔插槽内容
    if (splitChildren) splitChildren.remove();
  }

  public override render() {
    let style = `display: ${!!this.block ? "flex" : "inline-flex"};`;
    if (!!this.vertical) style += ` flex-direction: column;`;
    if (!!this.wrap) style += ` flex-wrap: wrap;`;
    if (!!this.fill) style += ` width: 100%;`;
    if (!!this.rtl) style += ` direction: rtl;`;
    const alignItems = ["start", "end"].includes(this.align!) ? `flex-${this.align}` : this.align;
    if (!!this.align) style += ` align-items: ${alignItems};`;

    return html`
      <div class="space-root" style=${style}>
        <slot></slot>
        <slot name="split"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-space": Space;
  }
}
