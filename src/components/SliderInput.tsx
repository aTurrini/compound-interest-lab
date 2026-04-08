interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xl font-semibold text-slate-900 dark:text-white tabular-nums">
          {format(value)}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={format(value)}
        />
        {/* Thumb indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-md pointer-events-none transition-all"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {format(min)}
        </span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {format(max)}
        </span>
      </div>
    </div>
  );
}
