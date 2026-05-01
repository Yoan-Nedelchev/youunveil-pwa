/**
 * Fixed nebula orbs used behind oracle / spread experiences (Stitch-style).
 */
export function CosmicBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="nebula-orb absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full"
        style={{
          background: "linear-gradient(45deg, #ddb8ff, #e9c349, #c3c6d7)",
        }}
      />
      <div
        className="nebula-orb absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full"
        style={{
          background: "linear-gradient(45deg, #470e78, #2d303d)",
        }}
      />
      <div
        className="nebula-orb absolute top-[20%] right-[10%] h-[30%] w-[30%] rounded-full"
        style={{
          background: "linear-gradient(45deg, #1a0033, #0a0e1a)",
        }}
      />
    </div>
  );
}
