import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    q: "Which carriers do you track?",
    a: "Ninety-eight ocean carriers, including every alliance member on the transpacific and transatlantic lanes, plus BNSF, UP, CSX and NS rail. If your carrier publishes milestones anywhere, we reconcile them.",
  },
  {
    q: "Do you replace my freight forwarder?",
    a: "No. Your forwarder moves the freight; Ballast makes sure you can see it. Most customers give their forwarder a seat. The arguments get shorter when both sides read the same timeline.",
  },
  {
    q: "How does the demurrage clock work?",
    a: "We hold the tariff tables for 214 terminals. When your container discharges, the clock starts against that terminal's free-time rules, alerts your team at two days remaining, and prices each day beyond in dollars.",
  },
  {
    q: "Can my customs broker log in?",
    a: "Yes, and broker seats are free on every plan. Brokers see documents and duty lines for the shipments they're assigned, and nothing else.",
  },
  {
    q: "What does onboarding look like?",
    a: "Forward one booking confirmation. Your first container is on the board in about four minutes; historical shipments import from a spreadsheet the same afternoon.",
  },
];

export function Faq() {
  return (
    <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
      <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
        Asked at the gate.
      </h2>
      <Accordion type="single" collapsible className="border-t border-border">
        {questions.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-border">
            <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
