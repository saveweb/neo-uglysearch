import * as React from "react";
import { cn } from "@/lib/utils";
import { useCompositionInput } from "foxact/use-composition-input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    handleChange?: (value: string) => void;
  }
>(({ className, type, value, handleChange, ...props }, forwardedRef) => {
  // 创建内部ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // 合并refs
  React.useImperativeHandle(forwardedRef, () => inputRef.current!);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      // HTMLInputElement: setSelectionRange() method
      // The element must be of one of the following input types: password, search, tel, text, or url.
      // Otherwise the browser throws an InvalidStateError exception.
      if (
        ["password", "search", "tel", "text", "url"].includes(
          inputRef.current.type
        )
      ) {
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, []);

  const inputProps = useCompositionInput(
    React.useCallback((value: string) => {
      handleChange?.(value);
    }, [])
  );

  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-base border-2 text-text font-base selection:bg-main selection:text-mtext border-border bg-bw px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        // disabled:cursor-not-allowed disabled:opacity-50
        className
      )}
      ref={inputRef}
      defaultValue={value}
      {...inputProps}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
