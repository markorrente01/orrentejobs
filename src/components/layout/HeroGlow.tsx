export function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* Top left glow */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{ background: "var(--color-brand-primary)" }}
      />
      {/* Top right glow */}
      <div
        className="absolute -top-20 right-0 w-72 h-72 rounded-full opacity-10 dark:opacity-5 blur-3xl"
        style={{ background: "var(--color-brand-secondary)" }}
      />
    </div>
  )
}