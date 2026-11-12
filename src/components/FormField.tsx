import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label: string;
  type?: string | undefined;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  placeholder?: string | undefined;
  autoComplete?: string | undefined;
};

export function FormField({ id, label, type = "text", value, onChange, error, placeholder, autoComplete }: Props) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-semibold">{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="h-11 rounded-xl bg-background"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
