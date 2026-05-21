import { useState, useEffect } from "react";
import { Howl } from "howler";
import { useAudioSettings } from "../../stoer/useAudioSettings";

const Musicbox = ({ songs = [] }) => {
  const { musicVolume } = useAudioSettings(); // 🎧 全域音量
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentIndex];

  // 🧠 建立或取得全域播放器
  const getOrCreatePlayer = (index) => {
    if (window.__globalPlayer) {
      return window.__globalPlayer;
    }

    const sound = new Howl({
      src: [songs[index].url],
      html5: true,
      volume: musicVolume,
      onend: () => {
        const next = (index + 1) % songs.length;
        setCurrentIndex(next);
      },
    });

    window.__globalPlayer = sound;
    return sound;
  };

  // ▶ 播放
  const playSong = () => {
    const sound = getOrCreatePlayer(currentIndex);
    sound.play();
    setIsPlaying(true);
  };

  // ⏸ 暫停
  const pauseSong = () => {
    const sound = window.__globalPlayer;
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  // ⏭ 下一首
  const nextSong = () => {
    const sound = window.__globalPlayer;
    if (sound) {
      sound.stop();
      sound.unload();
      window.__globalPlayer = null;
    }
    const next = (currentIndex + 1) % songs.length;
    setCurrentIndex(next);
  };

  // ⏮ 上一首
  const prevSong = () => {
    const sound = window.__globalPlayer;
    if (sound) {
      sound.stop();
      sound.unload();
      window.__globalPlayer = null;
    }
    const prev = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prev);
  };



  // 🎵 當歌曲索引變化且正在播放時 → 換新歌
  useEffect(() => {
    if (!isPlaying) return;
    const sound = getOrCreatePlayer(currentIndex);
    sound.play();
  }, [currentIndex]);

  // 🚫 不清除播放器，確保跨頁仍能播放

  // 🚀 UI
  return (
 <section
   className="
     pointer-events-auto select-none fixed bottom-[clamp(0.5rem,2vh,2rem)] left-[clamp(5rem,3vw,2rem)]
     w-[clamp(16rem,35vw,28rem)] max-w-[322px] h-18
     rounded-xl border-2 bg-white/60 backdrop-blur-md shadow-md
     flex items-center px-1 z-[55]
   "
   role="region"
   aria-label="音樂播放器"
 >
      <div className="flex items-center gap-1 w-full px-3">
        {/* 封面 */}
        <div className="h-12 w-12 rounded-md overflow-hidden bg-amber-600 shrink-0">
          <img
            src={currentSong?.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* 標題與演出者 */}
        <div style={{ fontFamily: "system-ui, sans-serif" }}
        className="flex flex-col gap-2  min-w-0 mr-1">
          <div className="text-black text-[0.9rem] font-black leading-none truncate">
            {currentSong?.title || "Unknown Title"}
          </div>
          <div className="text-black/80 text-[0.6rem] font-medium leading-none truncate">
            {currentSong?.artist || "Unknown Artist"}
          </div>
        </div>

        {/* 控制鈕 */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={prevSong}
            className="h-8 w-8 flex items-center justify-center rounded-md bg-black/5 hover:bg-black/10 active:bg-black/15 text-sm"
            aria-label="上一首"
          >
            ←
          </button>

          <button
            type="button"
            onClick={isPlaying ? pauseSong : playSong}
            className="h-8 w-8 text flex items-center justify-center rounded-md bg-black/10 hover:bg-black/20 active:bg-black/30 font-semibold text-lg"
            aria-label="播放/暫停"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          <button
            type="button"
            onClick={nextSong}
            className="h-8 w-8 flex items-center justify-center rounded-md bg-black/5 hover:bg-black/10 active:bg-black/15 text-sm"
            aria-label="下一首"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Musicbox;
