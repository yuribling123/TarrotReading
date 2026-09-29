import { DiceExperience } from "@/app/components/dice/dice-experience";
import { StarfieldBackground } from "@/app/components/dice/starfield-background";

export default function DicePage() {
  return (
    <div className="relative min-h-[calc(100svh-76px)] bg-[#0c0913] bg-[radial-gradient(ellipse_55%_38%_at_50%_38%,rgba(138,108,168,0.11),transparent_75%)] px-6 pt-[5svh] text-[#f7efe3] sm:pt-[12svh]">
      <StarfieldBackground />
      <div className="relative z-10">
        <DiceExperience />
      </div>
    </div>
  );
}
