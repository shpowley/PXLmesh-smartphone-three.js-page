import { create } from 'zustand'

const useVideoStore = create(set => ({
  video: null,
  setVideo: video => set({ video }),
}))

export default useVideoStore