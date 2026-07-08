"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  className?: string;
  onValueChange: (value: string) => void;
};

export function SelectField({ label, value, options, className = "", onValueChange }: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function handleSelect(nextValue: string) {
    onValueChange(nextValue);
    setIsOpen(false);
  }

  return (
    <div
      ref={fieldRef}
      className={`relative grid gap-2 text-xs font-black uppercase tracking-[0.2em] text-chalk/55 ${
        isOpen ? "z-[90]" : "z-0"
      } ${className}`}
    >
      <span>{label}</span>
      <button
        type="button"
        className="focus-ring flex h-12 min-w-0 items-center justify-between gap-3 rounded-md border border-chalk/15 bg-ink/70 px-3 text-left text-sm font-bold normal-case tracking-normal text-chalk outline-none transition hover:border-brass/50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown className={`size-4 shrink-0 text-brass transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-[14.25rem] overflow-y-auto overscroll-contain rounded-md border border-brass/25 bg-ink/95 p-1 shadow-casino backdrop-blur-xl"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className="focus-ring flex h-11 w-full items-center justify-between gap-3 rounded px-3 text-left text-sm font-bold normal-case tracking-normal text-chalk transition hover:bg-brass/10 hover:text-brass"
                onClick={() => handleSelect(option.value)}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? <Check className="size-4 shrink-0 text-brass" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
