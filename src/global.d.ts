declare module "solid-js" {
  export namespace JSX {
    interface DialogHtmlAttributes<T> {
      onclose?: DialogHtmlAttributes<HTMLDialogElement>["onClose"];
      oncancel?: DialogHtmlAttributes<HTMLDialogElement>["onCancel"];
    }

    interface TextareaHTMLAttributes<T> extends Pick<InputHTMLAttributes<T>, "autocorrect"> {}
  }
}

export {};
