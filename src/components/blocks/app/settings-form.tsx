import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function SettingsForm() {
  return (
    <form className="w-full max-w-lg space-y-8">
      <fieldset className="space-y-5">
        <legend className="type-overline text-muted-foreground">Company</legend>
        <div className="space-y-2">
          <Label htmlFor="set-company">Company name</Label>
          <Input id="set-company" defaultValue="Atlas Bicycle Co." />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="set-ein">Importer of record no.</Label>
            <Input id="set-ein" defaultValue="94-2404110" className="font-mono" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="set-port">Default port of entry</Label>
            <Input id="set-port" defaultValue="Oakland, CA (2811)" />
          </div>
        </div>
      </fieldset>
      <Separator />
      <fieldset className="space-y-5">
        <legend className="type-overline text-muted-foreground">Alerts</legend>
        <div className="space-y-2">
          <Label htmlFor="set-days">Demurrage alert threshold</Label>
          <Input id="set-days" type="number" defaultValue={2} className="max-w-28 font-mono" />
          <p className="text-xs text-muted-foreground">
            Alert the whole team when a container has this many free days left.
          </p>
        </div>
      </fieldset>
      <div className="flex items-center gap-4 border-t border-border pt-6">
        <Button type="submit">Save changes</Button>
        <Button type="button" variant="ghost">
          Discard
        </Button>
      </div>
    </form>
  );
}
