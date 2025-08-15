import * as React from "react";
import { cn } from "../../lib/util";

type TabsValue = string;

interface TabsRootProps {
  value?: TabsValue;
  defaultValue?: TabsValue;
  onValueChange?: (v: TabsValue) => void;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: TabsValue;
  setValue: (v: TabsValue) => void;
} | null>(null);

export function Tabs({ value, defaultValue, onValueChange, children, className }: TabsRootProps) {
  const [internal, setInternal] = React.useState<TabsValue>(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? (value as TabsValue) : internal;

  const setValue = React.useCallback(
    (v: TabsValue) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center gap-1 rounded-md bg-gray-100 p-1", className)} {...props} />;
}

export function TabsTrigger({
  value,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: TabsValue }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within <Tabs>");

  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "px-3 py-1.5 text-sm rounded-md transition",
        active ? "bg-white shadow border border-gray-200" : "text-gray-600 hover:text-gray-900",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: TabsValue }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within <Tabs>");
  if (ctx.value !== value) return null;
  return <div className={cn("mt-3", className)} {...props} />;
}
