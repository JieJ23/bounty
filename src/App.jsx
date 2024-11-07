import BountyTable from "./Table";
import { Footer } from "./Footer";
import Header from "./Header";

function App() {
  return (
    <main className="h-lvh">
      <div className="fixed bg-gradient-to-tr via-[#211d1d] from-[#000] to-[#131212] h-lvh w-full object-cover -z-20" />
      <div
        className="fixed h-full w-full bg-cover -z-10 bg-center"
        style={{ backgroundImage: "url('/mainBG.png')" }}
      />
      {/* <section className="flex items-center justify-center gap-2 py-10 select-none">
        <div className="w-10 rounded">
          <img src="/Neathiron.png" />
        </div>
        <div className="text-white font-customCin text-[23px]">
          Neathiron's Bounties
        </div>
      </section> */}
      <BountyTable />
      <Footer />
    </main>
  );
}
export default App;
