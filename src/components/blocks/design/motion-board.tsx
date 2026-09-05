import { Reveal } from "@/components/blocks/motion/reveal";
import { Specimen } from "./specimen";

const steps = [
  { delay: 0, label: "First" },
  { delay: 100, label: "Second" },
  { delay: 200, label: "Third" },
];

/* The motion vocabulary: reveal entrances, the marquee (artifacts group), and
   the scroll-progress hairline running at the top of this page. All of it
   freezes under prefers-reduced-motion via the globals.css kill switch. */
export function MotionBoard() {
  return (
    <Specimen title="Motion" note="blocks/motion · reduced-motion safe">
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <Reveal key={step.label} delay={step.delay}>
            <div className="border border-border bg-muted px-4 py-6">
              <p className="type-overline text-muted-foreground">Reveal</p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {step.label} · +{step.delay}ms
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="type-overline mt-6 text-muted-foreground">
        The hairline at the top of this page is blocks/motion/scroll-progress
      </p>
    </Specimen>
  );
}
