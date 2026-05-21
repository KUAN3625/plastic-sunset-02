

export const SideButton = ({ icon, children, isOpen, setIsOpen, offsetY = 0 }) => {
  return (
    <div className="pointer-events-auto relative flex items-center">
      {isOpen && (
        <div
          className={`absolute right-[calc(100%+24px)] top-[${offsetY}px] transition-all duration-300 ease-out`}
        >
          {children}
        </div>
      )}

      <button
        className="w-12 h-12 rounded-full bg-orange-100 text-white text-xl hover:bg-neutral-00"
        onClick={() => setIsOpen((v) => !v)}
      >
        {icon}
      </button>
    </div>
  )
}

export default SideButton
