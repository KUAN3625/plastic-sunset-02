import { create } from "zustand";
import { Howl } from "howler";


export const useSFXStore = create(() => ({
    //儲存各種音效
    sounds:{
        ui:{
            click: new Howl({src:["/SFX/click1.ogg","/SFX/click.mp3"], 
                volume: 0.4}),



        }

    },

    play:(keyPath) => {
        const{sounds} = useSFXStore.getState();

        //keyPath拆分
        const keys = keyPath.split(".")
        let sound = sounds;
        for(const k of keys){
            sound = sound?.[k];
            if(!sound) return;
        }
        sound.play();
    }


}) )