import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

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
      <div className="flex flex-wrap items-center gap-8">
        <Tabs defaultValue="board">
          <TabsList>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Checkbox id="spec-check" defaultChecked />
          <Label htmlFor="spec-check">Notify broker</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="spec-switch" defaultChecked />
          <Label htmlFor="spec-switch">Email alerts</Label>
        </div>
        <Skeleton className="h-7 w-36" />
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
        <div className="space-y-2">
          <Label htmlFor="spec-select">Terminal</Label>
          <Select defaultValue="oakland">
            <SelectTrigger id="spec-select" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oakland">Oakland OICT</SelectItem>
              <SelectItem value="longbeach">Long Beach Pier E</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="spec-notes">Notes</Label>
          <Textarea id="spec-notes" placeholder="Dray booked for Sep 14." rows={2} />
        </div>
      </div>
    </div>
  );
}
