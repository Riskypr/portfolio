"use client";

import { useEffect, useRef, useState } from "react";
import { Disc3, Eye, EyeOff, Pause, Play } from "lucide-react";

const TRACK_URL = "/play.m4a";
const LYRICS_URL = "/Bleachers%20-%20Merry%20Christmas%2C%20Please%20Don%27t%20Call.lrc";

type LyricLine = { time: number; text: string };

function parseLyrics(lrc: string): LyricLine[] {
    return lrc
        .split(/\r?\n/)
        .flatMap((line) => {
            const timestamps = [...line.matchAll(/\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g)];
            const text = line.replace(/\[[^\]]+\]/g, "").trim();

            if (!text || timestamps.length === 0) return [];

            return timestamps.map(([, minutes, seconds, fraction = "0"]) => ({
                time: Number(minutes) * 60 + Number(seconds) + Number(`0.${fraction}`),
                text,
            }));
        })
        .sort((a, b) => a.time - b.time);
}

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showLyrics, setShowLyrics] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        fetch(LYRICS_URL, { signal: controller.signal })
            .then((response) => (response.ok ? response.text() : ""))
            .then((lrc) => {
                if (lrc) setLyrics(parseLyrics(lrc));
            })
            .catch(() => {
                // Keep the player usable if the optional lyrics file cannot be loaded.
            });

        return () => controller.abort();
    }, []);

    const activeLyric = lyrics.reduce<LyricLine | null>(
        (active, line) => (line.time <= currentTime ? line : active),
        null,
    );

    const togglePlayback = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            return;
        }

        try {
            await audio.play();
        } catch {
            setIsPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[60] flex w-max max-w-[calc(100vw-2.5rem)] flex-col items-end sm:bottom-7 sm:right-7">
            <audio
                ref={audioRef}
                src={TRACK_URL}
                preload="none"
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onSeeked={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onEnded={() => setCurrentTime(0)}
            />

            {isPlaying && showLyrics && activeLyric && (
                <div
                    key={`${activeLyric.time}-${activeLyric.text}`}
                    aria-live="polite"
                    aria-atomic="true"
                    className="mb-3 max-w-[min(22rem,calc(100vw-2.5rem))] animate-lyric-enter overflow-hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-right shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:max-w-sm"
                >
                    <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                        Now playing
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-neutral-800 sm:text-base">
                        {activeLyric.text}
                    </p>
                    <span className="mt-2 ml-auto block h-0.5 w-10 overflow-hidden rounded-full bg-neutral-200">
                        <span className="block h-full w-full origin-left animate-pulse rounded-full bg-neutral-800" />
                    </span>
                </div>
            )}

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setShowLyrics((visible) => !visible)}
                    aria-label={showLyrics ? "Hide lyrics" : "Show lyrics"}
                    aria-pressed={showLyrics}
                    title={showLyrics ? "Hide lyrics" : "Show lyrics"}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 text-neutral-600 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-all duration-200 hover:border-neutral-300 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                >
                    {showLyrics ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>

                <button
                    type="button"
                    onClick={togglePlayback}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    aria-pressed={isPlaying}
                    className="group flex w-[184px] shrink-0 items-center gap-3 rounded-full border border-neutral-200/80 bg-white/90 py-2.5 pl-3 pr-4 text-left shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-105">
                        {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-neutral-900">
                            {isPlaying ? "NOW PLAYING" : "PLAY MUSIC"}
                            {isPlaying && <Disc3 className="size-3 animate-spin text-neutral-400" style={{ animationDuration: "4s" }} />}
                        </span>
                        <span className="mt-0.5 block text-[10px] text-neutral-400">Portfolio soundtrack</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
