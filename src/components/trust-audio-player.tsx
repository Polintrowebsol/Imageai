import { Pause, Play, Volume2 } from "lucide-react";
import { useRef, useState } from "react";

export function TrustAudioPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    if (!audio.current) return;
    if (audio.current.paused) {
      try {
        await audio.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    audio.current.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-signal/25 bg-background/95 p-1.5 shadow-xl backdrop-blur sm:bottom-6 sm:right-6">
      <audio ref={audio} src="/audio/why-raw-ai-ruins-product-trust.m4a" preload="metadata" onEnded={() => setIsPlaying(false)} />
      <span className="hidden items-center gap-2 pl-3 text-[10px] font-bold uppercase tracking-[.12em] text-primary sm:flex"><Volume2 size={14} className="text-signal" /> Why raw AI hurts trust</span>
      <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause audio: Why raw AI hurts product trust" : "Play audio: Why raw AI hurts product trust"} className="flex size-11 items-center justify-center rounded-full bg-signal text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-px" />}
      </button>
    </div>
  );
}
