import { clsx } from "@minicdn/toolkit";
import { css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, unsafeStatic } from "lit/static-html.js";

type Color =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "quinary"
  | "senary"
  | "septenary"
  | "octonary"
  | "nonary"
  | "denary"
  | "success"
  | "warning"
  | "danger"
  | "error"
  | "info"
  | "information";

@customElement("ui-button")
export class UIButton extends LitElement {
  public static override styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  public override prefix: string = "ui-button";

  @property()
  public variant: "contained" | "outlined" | "dashed" | "text" | string =
    "contained";

  @property()
  public shape: "circular" | "rounded" | "square" = "square";

  @property()
  public size: "mini" | "small" | "medium" | "large" = "medium";

  @property()
  public color: Color | string = "red";

  @property({ type: Boolean, reflect: true })
  public iconOnly?: boolean;

  @property()
  public component?: string;

  // ---

  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  @property()
  public type: "button" | "submit" | "reset" = "button";

  // ---

  @property()
  public href?: string;

  @property()
  public target?: "_blank" | "_parent" | "_self" | "_top";

  @property()
  public download?: string;

  // ---

  public override render() {
    const isAnchor = !!this.href;

    const tagName = unsafeStatic(this.component || (isAnchor ? "a" : "button"));

    const isColor = !!this.color;

    const isCustomColor = ![
      "primary",
      "secondary",
      "tertiary",
      "quaternary",
      "quinary",
      "senary",
      "septenary",
      "octonary",
      "nonary",
      "denary",
      "success",
      "warning",
      "danger",
      "error",
      "info",
      "information",
    ].includes(this.color);

    const className = clsx(this.prefix, {
      [`${this.prefix}-size-${this.size}`]: this.size,
      [`${this.prefix}-variant-${this.variant}`]: this.variant,
      [`${this.prefix}-color-custom`]: isColor && isCustomColor,
      [`${this.prefix}-color-${this.color}`]: isColor && !isCustomColor,
      [`${this.prefix}-icon-only`]: this.iconOnly,
    });

    return html`
      <${tagName} 
        href=${ifDefined(isAnchor ? this.href : undefined)} 
        class="${className}"
      >
        <slot name="icon"></slot>
        <slot></slot>
      </${tagName}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-button": UIButton;
  }
}
