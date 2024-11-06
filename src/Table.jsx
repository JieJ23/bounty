import { dataLogic } from "./DataLogic";
import { bountyScore } from "./BountyScore";
import Header from "./Header";
import { useState } from "react";
import { data } from "autoprefixer";

export default function BountyTable() {
  const [category, setCategory] = useState(0);

  function handleCategoryChange(num) {
    setCategory(num);
  }

  const allInfo = [...new Set(dataLogic.map((obj) => obj.Info))].sort();

  // --------------------------------------------------
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

  const claimedFilter = sortByName.filter(
    (obj) => findScore(bountyScore, obj.Item).length > 0
  );

  const fullData = [sortByNameThenStatus, sortByName, claimedFilter];

  for (let i = 0; i < allInfo.length; i++) {
    let temp = sortByNameThenStatus.filter((obj) =>
      obj.Info.includes(allInfo[i])
    );
    fullData.push(temp);
  }

  const displayData = fullData[category];

  return (
    <section
      className="max-w-[1200px] mx-auto bg-transparent select-none py-2"
      data-theme="dark"
    >
      <Header />
      <div className="text-center text-[#fff] font-customCin text-[16px] my-5 underline">
        ✭ Must Be 4GA & Max Aspect ✭
      </div>
      {/* -------------------------------------------------- */}
      <section className="flex flex-wrap max-w-[1000px] justify-center mx-auto mb-5 gap-1">
        <button
          className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_grey] font-customCin text-[10px]"
          onClick={() => handleCategoryChange(0)}
        >
          Original
        </button>
        <button
          className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_grey] font-customCin text-[10px]"
          onClick={() => handleCategoryChange(1)}
        >
          Alphabetical
        </button>
        <button
          className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_grey] font-customCin text-[10px]"
          onClick={() => handleCategoryChange(2)}
        >
          Claimed
        </button>
        {allInfo.map((ite, index) => (
          <button
            className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
            onClick={() => handleCategoryChange(3 + index)}
          >
            {ite.slice(7)}
          </button>
        ))}
      </section>
      {/* -------------------------------------------------- */}
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
            {displayData.map((obj, index) => (
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
