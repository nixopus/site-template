import { ChatCard } from "@/components/blocks/artifacts/chat-card";
import { ImgSlot } from "@/components/blocks/artifacts/img-slot";
import { Marquee } from "@/components/blocks/artifacts/marquee";
import { MockWindow } from "@/components/blocks/artifacts/mock-window";
import { SectionFrame } from "@/components/blocks/artifacts/section-frame";
import { Specimen } from "./specimen";

const consoleRows = [
  { label: "Container", value: "MSKU 4839201" },
  { label: "Status", value: "On water, Pacific crossing" },
  { label: "Free days", value: "3 remaining" },
];

const chatMessages = [
  { from: "M. Osei", initials: "MO", time: "09:12", text: "Did the origin certificate for the bicycle order clear?", self: true },
  { from: "Ballast", initials: "BA", time: "09:12", text: "Not yet. The broker has it; free days run out Friday." },
  { from: "Ballast", initials: "BA", time: "09:40", text: "Cleared. Entry packet sent to your broker." },
];

const marqueePhrases = [
  "ISF filed", "MBL matched", "COO awaiting", "Discharge confirmed",
  "3 free days left", "Duty estimated", "Dray booked",
];

/* The artifact vocabulary: manufactured objects any direction can skin.
   Every one is token-only; depth rides the --depth-float stance. */
export function ArtifactsBoard() {
  return (
    <>
      <Specimen title="Mock window" note="blocks/artifacts/mock-window">
        <MockWindow title="ballast.app/console" className="max-w-md">
          <dl className="divide-y divide-border">
            {consoleRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="type-overline text-muted-foreground">{row.label}</dt>
                <dd className="font-mono text-sm text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </MockWindow>
      </Specimen>
      <Specimen title="Chat card" note="blocks/artifacts/chat-card">
        <ChatCard title="Ops · fictional demo thread" messages={chatMessages} className="max-w-md" />
      </Specimen>
      <Specimen title="Marquee" note="blocks/artifacts/marquee · hover pauses">
        <Marquee className="border-y border-border py-4">
          {marqueePhrases.map((phrase) => (
            <span key={phrase} className="flex items-center gap-12">
              <span className="type-overline text-muted-foreground">{phrase}</span>
              <span aria-hidden className="reg-tick" />
            </span>
          ))}
        </Marquee>
      </Specimen>
      <Specimen title="Image slot" note="blocks/artifacts/img-slot · authored plate until src arrives">
        <div className="grid gap-8 sm:grid-cols-2">
          <ImgSlot caption="Plate 01 / Warehouse door, Reno" />
          <ImgSlot caption="Plate 02 / Oakland OICT" label="Awaiting photography" ratio="4 / 3" />
        </div>
      </Specimen>
      <Specimen title="Section frame" note="blocks/artifacts/section-frame">
        <SectionFrame label="Record 07 / Bounded">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            A section presented as a bounded card instead of full-bleed rules.
            The label breaks the dashed frame like a tab on a folder.
          </p>
        </SectionFrame>
      </Specimen>
    </>
  );
}
