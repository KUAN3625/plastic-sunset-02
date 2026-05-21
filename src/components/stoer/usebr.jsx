import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 📦 攝影機預設資料
const cameraPresets = {
  login: {
    cameraPosition: [12.67, -0.46, 29.93],
    cameraRotation: [-0.00, 1.44, -0.00],
    fov: 30,
    near: 0.1,
    far: 1000,
  },

  menu: {
    cameraPosition: [12.67, -0.46, 29.93],
    cameraRotation: [3.10, 0.75, -3.11],
    fov: 30, near: 0.1, far: 1000,
  },

  core: {
    cameraPosition: [47.70, 0.33, -1.93],
    cameraRotation: [2.93, 1.43, -2.94],
    fov: 30, near: 0.1, far: 1000,
  },

  mainScene: {
    cameraPosition: [69.69, 1.92, 20.80],
    cameraRotation: [-0.01, 1.10, 0.01],
    fov: 30, near: 0.1, far: 1000,
  },

  twoScene:  {
  cameraPosition: [48, 7, -17],
  cameraRotation: [3.08, 1.41, -3.07],
  fov: 30,
  near: 0.1,
  far: 1000,
},

  threeScene: {
  cameraPosition: [52.41, 1, 19.89],
  cameraRotation: [2.11, 1.45, -2.12],
  fov: 30,
  near: 0.1,
  far: 1000,
  },
}

// 🧠 加上 persist — 自動存取 localStorage
const useCameraStore = create(
  persist(
    (set, get) => ({
      // ✅ 預設從 login 開始
      activeCamera: 'login',
      ...cameraPresets.login,

      setCameraPosition: (pos) => set({ cameraPosition: pos }),
      setCameraRotation: (rot) => set({ cameraRotation: rot }),
      setCameraFov: (fov) => set({ fov }),
      setCameraNear: (near) => set({ near }),
      setCameraFar: (far) => set({ far }),

      // 🔄 切換攝影機預設
      switchTo: (name) => {
        const preset = cameraPresets[name]
        if (!preset) {
          console.warn(`Camera preset "${name}" not found.`)
          return
        }
        set({ ...preset, activeCamera: name, _updatedAt: Date.now() })
      },
    }),
    {
      name: 'camera-store', // 🗂 localStorage 的 key 名稱
      partialize: (state) => ({
        // 💾 只儲存必要資訊
        cameraPosition: state.cameraPosition,
        cameraRotation: state.cameraRotation,
        fov: state.fov,
        near: state.near,
        far: state.far,
        activeCamera: state.activeCamera,
      }),
    }
  )
)

export default useCameraStore
