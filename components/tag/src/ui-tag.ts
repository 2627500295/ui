import { html, LitElement, css } from "lit";
import { customElement, property, queryAssignedElements, queryAssignedNodes } from "lit/decorators.js";
import cs from "@minicdn/clsx";
import * as _ from "@minicdn/toolkit";

@customElement("ui-tag")
export class Tag extends LitElement {
  public static override styles = css`
    .tag-root {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
    }
  `;

  @queryAssignedNodes({ slot: "icon" })
  public $icon!: HTMLElement[];

  @queryAssignedElements({ slot: "close" })
  public $closeIcon!: HTMLElement[];

  @queryAssignedElements({})
  public $children!: HTMLElement[];

  /**
   * 是否显示
   */
  @property({ type: Boolean })
  public visible?: boolean;

  /**
   * 颜色
   */
  @property({ type: String })
  public color?: string;

  /**
   * 尺寸
   */
  @property({ type: String || Number })
  public size?: "small" | "default" | "medium" | "large" | number;

  /**
   * 是否显示边框
   */
  @property({ type: Boolean })
  public bordered?: boolean;

  //

  /**
   * 是否可以关闭
   */
  @property({ type: Boolean })
  public closable?: boolean;

  /**
   * 关闭回调
   */
  public onClose?: (e?: any) => Promise<any> | void;

  //

  /**
   * 是否支持选中
   */
  @property({ type: Boolean })
  public checkable?: boolean;

  /**
   * 选中状态
   */
  @property({ type: Boolean })
  public checked?: boolean;

  /**
   * 是否默认选中
   */
  @property({ type: Boolean })
  public defaultChecked?: boolean;

  /**
   * 选中回调
   */
  @property()
  public onCheck?: (checked?: boolean) => void;

  public override firstUpdated() {
    const $icon = _.head(this.$icon);
    const $closeIcon = _.head(this.$closeIcon);
    const $children = this.$children;
    console.log($icon, $closeIcon, $children);
  }

  public override render() {
    const prefix = "tag";
    const classNames = cs(prefix, `${prefix}-root`);
    const isCustomColor = true;
    let style = "";
    if (isCustomColor) style += `--custom-color: ${this.color}`;

    return html`
      <div class="${classNames}" style="${style}">
        <slot name="icon"></slot>
        <slot></slot>
        <slot name="close"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-tag": Tag;
  }
}
