import React, { useState } from "react";
import { Mic, MicOff, Video, VideoOff, Settings, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";

export const LobbyPreview: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video bg-neutral-900 rounded-3xl overflow-hidden border-4 border-white shadow-2xl group">
        {videoOn ? (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-900">
            {/* Simulation of a video stream background */}
            <div className="w-full h-full opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse" />
            <div className="text-center space-y-3 z-10 transition-transform duration-700 group-hover:scale-105">
              <div className="size-24 mx-auto rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center text-primary-400 font-bold text-3xl shadow-[0_0_30px_rgba(var(--primary-600-rgb),0.3)]">
                ME
              </div>
              <p className="text-neutral-300 font-medium tracking-wide">Camera is on</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950">
            <VideoOff className="size-16 text-neutral-700 mb-4" />
            <p className="text-neutral-500 text-sm font-medium">Camera is disabled</p>
          </div>
        )}

        {/* Floating Controls in Preview */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setMicOn(!micOn)}
            className={cn(
              "size-12 rounded-2xl transition-all duration-300 backdrop-blur-md border",
              micOn 
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                : "bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30"
            )}
          >
            {micOn ? <Mic className="size-5" /> : <MicOff className="size-5" />}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setVideoOn(!videoOn)}
            className={cn(
              "size-12 rounded-2xl transition-all duration-300 backdrop-blur-md border",
              videoOn 
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                : "bg-red-500/20 border-red-500/50 text-red-500 hover:bg-red-500/30"
            )}
          >
            {videoOn ? <Video className="size-5" /> : <VideoOff className="size-5" />}
          </Button>
        </div>

        {/* Audio Visualizer Pill */}
        {micOn && (
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-20">
            <Volume2 className="size-3.5 text-emerald-400" />
            <div className="flex gap-0.5 items-end h-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="w-1 bg-emerald-400 rounded-full animate-bounce" 
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s'
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-neutral-500">
          <Settings className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">A/V Settings</span>
        </div>
        <div className="flex gap-2">
           <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full font-bold">HD High Quality</span>
        </div>
      </div>
    </div>
  );
};
