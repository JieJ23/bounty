export default function Header() {
  return (
    <div
      className="navbar w-[95%] mx-auto rounded-lg bg-[#00000073] max-w-[1000px] font-serif sticky top-2 z-40 backdrop-blur-md border-[1px] border-white/10"
      data-theme="dark"
    >
      <div className="navbar-start"></div>

      <div className="navbar-center">
        <div className="flex items-center justify-center gap-2 select-none">
          <div className="w-8 rounded">
            <img src="/Neathiron.png" />
          </div>
          <div className="text-white font-customCin text-[20px]">
            Neathiron's Bounties
          </div>
        </div>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
}
