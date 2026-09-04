import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignIn() {
  return (
    <div className="mx-auto w-full max-w-sm border border-border bg-background">
      <div className="border-b border-border px-8 py-6">
        <p className="type-overline text-foreground">
          Ballast<span className="text-signal">*</span>
        </p>
        <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight">
          Back to the board.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to see what moved overnight.
        </p>
      </div>
      <form className="space-y-5 px-8 py-8">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="type-overline">
            Work email
          </Label>
          <Input id="signin-email" type="email" placeholder="june@atlasbicycle.co" />
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="signin-password" className="type-overline">
              Password
            </Label>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-signal">
              Forgot?
            </a>
          </div>
          <Input id="signin-password" type="password" />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          New here? <a href="#" className="text-foreground underline underline-offset-4 hover:text-signal">Start a 14-day trial</a>
        </p>
      </form>
    </div>
  );
}
