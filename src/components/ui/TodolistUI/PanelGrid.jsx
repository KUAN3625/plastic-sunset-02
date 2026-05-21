export const PanelGrid = () => {
  return (
    <div className=" w-56 h-36 rounded-3xl bg-neutral-200 grid grid-cols-3 gap-2 p-3 transition-transform duration-300">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg" />
      ))}
    </div>
  )
}

export default PanelGrid
