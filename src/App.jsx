import BountyTable from "./Table";
import { Footer } from "./Footer";

function App() {
  return (
    <main className="h-lvh">
      <div className="fixed bg-gradient-to-tr via-[#211d1d] from-[#000] to-[#131212] h-lvh w-full object-cover -z-20" />
      <div
        className="fixed h-full w-full bg-cover -z-10 bg-center"
        style={{ backgroundImage: "url('/mainBG.png')" }}
      />
      <BountyTable />
      <Footer />
    </main>
  );
}
export default App;
