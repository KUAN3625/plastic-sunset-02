import { useState } from "react"
import { create } from "zustand"

{/*番茄鐘滑稈控制層*/}


export const usePomodoroSettings = create((set) => ({

    focus:{
        time: 25,
        isDragging: false,
    },

    rest:{
        time: 5,
        isDragging: false,
    },

//Focus 控制器
setFocusTime: (v) => set((state) => ({focus:{ ...state.focus, time: v }})),
setFocusDragging: (v) => set((state) => ({focus:{ ...state.focus, isDragging: v }})),

//Rest 控制器
setRestTime: (v) => set((state) => ({ rest: { ...state.rest, time: v } })),
setRestDragging: (v) => set((state) => ({ rest: { ...state.rest, isDragging: v } })),



}))