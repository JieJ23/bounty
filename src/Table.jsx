import { dataLogic } from "./DataLogic";
import { bountyScore } from "./BountyScore";

export default function BountyTable() {
  const sortByName = dataLogic.sort((a, b) => (a.Item > b.Item ? 1 : -1));

  function findScore(arr, targetItem) {
    const match = arr.filter((obj) => obj.item === targetItem);
    return match;
  }

  return (
    <section
      className="max-w-[1200px] mx-auto bg-transparent select-none"
      data-theme="dark"
    >
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-customCin text-gray-300">
              <th>Index</th>
              <th></th>
              <th>Item Name</th>
              <th>Player</th>
              <th>Bounty</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {sortByName.map((obj, index) => (
              <tr>
                <td className="py-2 font-[Roberto] text-[12px]">{index + 1}</td>
                <td className="py-2">
                  <div className="relative">
                    <div className="w-9 absolute top-0 left-0 -z-10">
                      <img src={`/ubg.png`} draggable={false} />
                    </div>
                    <div className="w-9">
                      <img src={`/Uniques/${obj.Item}.png`} draggable={false} />
                    </div>
                  </div>
                </td>
                <td className="py-2 font-customCin min-w-[250px] w-[300px] text-[12px] sm:text-[14px]">
                  <section className="flex flex-col">
                    <div>{obj.Item}</div>
                    <div className="text-[10px] text-gray-400">{obj.Info}</div>
                  </section>
                </td>
                <td className="py-2 font-customCin">
                  <section className="flex gap-2">
                    {findScore(bountyScore, obj.Item) &&
                      findScore(bountyScore, obj.Item).map((obj) => (
                        <div
                          className="bg-[#28282b] px-2 py-1 rounded-lg font-serif"
                          style={{ color: obj.color }}
                        >
                          {obj.player}
                        </div>
                      ))}
                  </section>
                </td>
                <td className="py-2 font-customCin text-[12px] sm:text-[14px]">
                  {obj.Bounty} B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
