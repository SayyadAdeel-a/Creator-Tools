export function AdSlot({ className }) {
  return (
    <div 
      className={`bg-slate-100 rounded-lg flex items-center justify-center py-8 px-4 ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      <span className="text-slate-400 font-medium">Advertisement</span>
    </div>
  )
}
