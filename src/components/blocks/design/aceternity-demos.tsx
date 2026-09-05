import { FlipWords } from "@/components/ui/aceternity/flip-words";
import { Button as MovingBorderButton } from "@/components/ui/aceternity/moving-border";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Specimen } from "./specimen";

/* Three vendored pieces skinned to the site's tokens at the call site: proof
   the library takes a direction rather than imposing its own. */
export function AceternityDemos() {
  return (
    <Specimen title="Aceternity, skinned" note="ui/aceternity · motion honors reduced-motion">
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-center gap-8">
          <MovingBorderButton
            borderRadius="0rem"
            containerClassName="h-11 w-48"
            borderClassName="bg-[radial-gradient(var(--signal)_40%,transparent_60%)]"
            className="type-overline border border-border bg-background text-foreground"
          >
            Moving border
          </MovingBorderButton>
          <p className="text-lg text-foreground">
            Every container
            <FlipWords
              words={["tracked", "filed", "cleared", "delivered"]}
              className="font-medium text-signal"
            />
          </p>
        </div>
        <TextGenerateEffect
          words="Text generate effect, one word at a time."
          className="max-w-md"
          duration={0.4}
        />
      </div>
    </Specimen>
  );
}
