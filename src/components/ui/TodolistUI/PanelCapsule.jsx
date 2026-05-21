export const PanelCapsule = () => {
  return (
    <div className=" w-44 h-12 rounded-full bg-neutral-200 flex items-center justify-evenly transition-transform duration-300">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-6 h-6 rounded-full bg-white" />
      ))}
    </div>
  )
}

export default PanelCapsule
