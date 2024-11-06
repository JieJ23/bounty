// import { dataLogic } from "./DataLogic";
// import { bountyScore } from "./BountyScore";
import Header from "./Header";
import { useState } from "react";

import { useData } from "./Hook/FetchData";
import Loading from "./Hook/Loading";

import { getColorByName } from "./Data/NameColor";

export default function BountyTable() {
  const { posts, loader } = useData();
  const [category, setCategory] = useState(0);

  function handleCategoryChange(num) {
    setCategory(num);
  }

  const allInfo = [...new Set(posts.map((obj) => obj.Info))].sort();

  // --------------------------------------------------
  const sortByName = posts.slice().sort((a, b) => (a.Item > b.Item ? 1 : -1));

  function findScore(arr, targetItem) {
    const match = arr.filter((obj) => obj.item === targetItem);
    return match;
  }

  const sortByNameThenStatus = posts.slice().sort((a, b) => {
    const aExists = !!a.Player;
    const bExists = !!b.Player;

    if (aExists && !bExists) return -1;
    if (!aExists && bExists) return 1;

    return a.Item > b.Item ? 1 : -1;
  });

  const claimedFilter = sortByName.filter((obj) => obj.Player);

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
      {loader ? (
        <Loading />
      ) : (
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
              key={index}
              onClick={() => handleCategoryChange(3 + index)}
            >
              {ite.slice(7)}
            </button>
          ))}
        </section>
      )}
      {/* -------------------------------------------------- */}
      {loader ? (
        <div />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
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
                <tr key={index}>
                  <td className="py-2 font-[Roberto] text-[12px]">
                    {index + 1}
                  </td>
                  <td className="py-2">
                    <div className="relative">
                      <div className="w-9 absolute top-0 left-0">
                        <img src={`/ubg.png`} draggable={false} />
                      </div>
                      <div className="w-9 scale-[90%] z-20">
                        <img
                          src={`/Uniques/${obj.Item}.png`}
                          draggable={false}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 font-customCin min-w-[250px] w-[300px] text-[12px] sm:text-[14px]">
                    <section className="flex flex-col">
                      <div>{obj.Item}</div>
                      <div className="text-[10px] text-gray-400">
                        {obj.Info}
                      </div>
                    </section>
                  </td>
                  <td className="py-2 font-customCin">
                    <section className="flex gap-2">
                      {obj.Player &&
                        obj.Player.split(",").map((ite, index) => (
                          <div
                            className="font-serif bg-[#0f0f0f] p-1 px-2 rounded-md"
                            style={{ color: getColorByName(ite) }}
                            key={index}
                          >
                            {ite}
                          </div>
                        ))}
                    </section>
                  </td>
                  <td className="py-2 font-customCin text-[12px] sm:text-[14px]">
                    {obj.Player ? (
                      <div className="font-customAnt text-[14px] text-[red] border-y-2 border-[red] inline-block -rotate-[15deg]">
                        Claimed
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div>{`${obj.Bounty}`} B</div>
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
      )}
    </section>
  );
}
