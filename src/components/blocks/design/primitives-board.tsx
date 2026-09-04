import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PrimitivesBoard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-4">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">On water</Badge>
        <Badge variant="outline" className="border-signal text-signal">
          Customs hold
        </Badge>
        <Badge variant="destructive">Failed</Badge>
      </div>
      <div className="grid max-w-lg gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="spec-input">Text input</Label>
          <Input id="spec-input" placeholder="MSKU 4839201" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="spec-disabled">Disabled</Label>
          <Input id="spec-disabled" disabled placeholder="Read only" />
        </div>
      </div>
    </div>
  );
}
