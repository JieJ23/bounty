import { dataLogic } from "./DataLogic";
import { bountyScore } from "./BountyScore";

export default function BountyTable() {
  const sortByName = dataLogic
    .slice()
    .sort((a, b) => (a.Item > b.Item ? 1 : -1));

  function findScore(arr, targetItem) {
    const match = arr.filter((obj) => obj.item === targetItem);
    return match;
  }

  const sortByNameThenStatus = dataLogic.slice().sort((a, b) => {
    // Check if items exist in bountyScore
    const aExists = findScore(bountyScore, a.Item).length > 0;
    const bExists = findScore(bountyScore, b.Item).length > 0;

    // Prioritize items that exist in bountyScore
    if (aExists && !bExists) return -1;
    if (!aExists && bExists) return 1;

    // If both exist or both don't exist, sort alphabetically A-Z
    return a.Item > b.Item ? 1 : -1;
  });

  return (
    <section
      className="max-w-[1200px] mx-auto bg-transparent select-none"
      data-theme="dark"
    >
      <div className="text-center text-[#fff] font-customCin text-[16px] mb-5 underline">
        ✭ Must Be 4GA & Max Aspect ✭
      </div>
      <div className="overflow-x-auto">
        <table className="table mb-12">
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
            {sortByNameThenStatus.map((obj, index) => (
              <tr>
                <td className="py-2 font-[Roberto] text-[12px]">{index + 1}</td>
                <td className="py-2">
                  <div className="relative">
                    <div className="w-9 absolute top-0 left-0 -z-10">
                      <img src={`/ubg.png`} draggable={false} />
                    </div>
                    <div className="w-9 scale-[90%]">
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
                  <section className="flex gap-4">
                    {findScore(bountyScore, obj.Item) &&
                      findScore(bountyScore, obj.Item).map((obj) => (
                        <div
                          className="font-customCin"
                          style={{ color: obj.color }}
                        >
                          {obj.player}
                        </div>
                      ))}
                  </section>
                </td>
                <td className="py-2 font-customCin text-[12px] sm:text-[14px]">
                  {findScore(bountyScore, obj.Item).length > 0 ? (
                    <div className="font-customAnt text-[14px] text-[red] border-y-2 border-[red] inline-block -rotate-[15deg]">
                      Claimed
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div>{`${obj.Bounty} B`}</div>
                      <div className="w-5">
                        <img src="/gold.png" />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
