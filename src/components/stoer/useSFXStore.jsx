import { create } from "zustand";
import { Howl } from "howler";


export const useSFXStore = create((set, get) => ({
    sfxVolume: 0.4,

    sounds:{
        ui:{
            click: new Howl({src:["/SFX/click1.ogg","/SFX/click.mp3"],
                volume: 0.4}),
        }
    },

    setSfxVolume: (v) => {
        const clamped = Math.max(0, Math.min(1, v));
        set({ sfxVolume: clamped });
        const { sounds } = get();
        const applyVolume = (obj) => {
            for (const val of Object.values(obj)) {
                if (val instanceof Howl) val.volume(clamped);
                else if (typeof val === "object") applyVolume(val);
            }
        };
        applyVolume(sounds);
    },

    play:(keyPath) => {
        const{sounds} = useSFXStore.getState();
        const keys = keyPath.split(".")
        let sound = sounds;
        for(const k of keys){
            sound = sound?.[k];
            if(!sound) return;
        }
        sound.play();
    }
}))