import { useEffect, useState } from "react";
import splashBg from "@/assets/splash-bg.jpg";
import { playSplashAmbient } from "@/utils/sound-engine";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => { setPhase(1); playSplashAmbient(); }, 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background">
      <div
        className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${
          phase >= 1 ? "opacity-40 scale-100" : "opacity-0 scale-110"
        }`}
      >
        <img src={splashBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className={`text-center transition-all duration-1000 ease-out ${
          phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-wider text-primary glow-gold-text leading-tight">
            DUNGEONS
          </h1>
          <div className="flex items-center gap-3 justify-center my-1">
            <div className={`h-px bg-primary/40 transition-all duration-1000 ${phase >= 2 ? "w-12 sm:w-16 md:w-24" : "w-0"}`} />
            <span className={`text-xl sm:text-2xl md:text-3xl font-display text-primary/80 transition-all duration-700 ${
              phase >= 2 ? "opacity-100" : "opacity-0"
            }`}>&amp;</span>
            <div className={`h-px bg-primary/40 transition-all duration-1000 ${phase >= 2 ? "w-12 sm:w-16 md:w-24" : "w-0"}`} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-wider text-primary glow-gold-text leading-tight">
            DRAGONS
          </h1>
        </div>

        <div className={`mt-4 h-px ornament-divider transition-all duration-1000 ${
          phase >= 2 ? "w-48 sm:w-64 md:w-80 opacity-100" : "w-0 opacity-0"
        }`} />

        <p className={`mt-3 sm:mt-4 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.35em] uppercase text-parchment/70 font-heading transition-all duration-700 px-4 text-center ${
          phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          The Fantasy Adventure Board Game
        </p>

        <div className={`mt-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 transition-all duration-500 ${
          phase >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}>
          <span className="text-xs tracking-[0.4em] uppercase text-primary/80 font-heading">
            Companion App
          </span>
        </div>

        <p className={`mt-8 text-sm font-display font-bold tracking-wider text-primary glow-gold-text transition-all duration-500 ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          Built by Parkash
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(225, 20%, 6%) 100%)" }}
      />
    </div>
  );
};

export default SplashScreen;
