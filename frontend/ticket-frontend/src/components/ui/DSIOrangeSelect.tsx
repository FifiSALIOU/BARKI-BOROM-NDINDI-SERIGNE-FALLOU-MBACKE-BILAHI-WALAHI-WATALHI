import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type DSIOrangeSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
};

export function DSIOrangeSelect({ value, onChange, options }: DSIOrangeSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);
  const selected = options.find((o) => o.value === value) || options[0];
  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className="dsi-orange-select-trigger"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#f9fafb",
          fontSize: "14px",
          height: "36px",
          cursor: "pointer",
          color: "#111827",
        }}
      >
        <span>{selected?.label ?? value}</span>
        <ChevronDown size={16} color="#6b7280" />
      </div>
      {open && (
        <div
          className="dsi-orange-select-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`dsi-orange-select-option ${value === opt.value ? "dsi-orange-select-option-selected" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                padding: "8px 10px",
                cursor: "pointer",
                fontSize: "14px",
                backgroundColor: "transparent",
                color: "#111827",
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
