// import { dataLogic } from "./DataLogic";
// import { bountyScore } from "./BountyScore";
import Header from "./Header";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

import { useData } from "./Hook/FetchData";
import Loading from "./Hook/Loading";

// import { getColorByName } from "./Data/NameColor";
import { ItemBg, ItemBg2, ItemBg3, ItemBg4 } from "./Data/ItemBatch";

export default function BountyTable() {
  const { posts, loader } = useData();
  const [category, setCategory] = useState(0);
  const [visibleRows, setVisibleRows] = useState(25);

  useEffect(() => {
    setVisibleRows(25);
  }, [category]);

  function handleCategoryChange(num) {
    setCategory(num);
  }

  const loadMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 25);
  };

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

    if (aExists && !bExists) return 1;
    if (!aExists && bExists) return -1;

    return a.Item > b.Item ? 1 : -1;
  });

  const claimedFilter = sortByName.filter((obj) => obj.Player);
  const unlaimedFilter = sortByName.filter((obj) => !obj.Player);

  const fullData = [
    sortByNameThenStatus,
    sortByName,
    unlaimedFilter,
    claimedFilter,
  ];

  for (let i = 0; i < allInfo.length; i++) {
    let temp = sortByNameThenStatus.filter((obj) =>
      obj.Info.includes(allInfo[i])
    );
    fullData.push(temp);
  }

  const displayData = fullData[category];

  const randomBg = [<ItemBg />, <ItemBg2 />, <ItemBg3 />, <ItemBg4 />];

  return (
    <section
      className="max-w-[1200px] mx-auto bg-transparent select-none py-2"
      data-theme="dark"
    >
      <Header />

      {/* -------------------------------------------------- */}
      {loader ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="flex justify-center">
            <div className="text-[#fff] font-customExo text-[16px] my-5 border-b-2 inline-block">
              ✭ Must Be 4GA & Max Aspect ✭
            </div>
          </div>
          <section className="flex flex-wrap max-w-[1200px] justify-center mx-auto mb-5 gap-1">
            <button
              className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
              onClick={() => handleCategoryChange(0)}
            >
              Original
            </button>
            <button
              className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
              onClick={() => handleCategoryChange(1)}
            >
              Alphabetical
            </button>
            <button
              className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
              onClick={() => handleCategoryChange(2)}
            >
              Unclaimed
            </button>
            <button
              className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
              onClick={() => handleCategoryChange(3)}
            >
              Claimed
            </button>
            {allInfo.map((ite, index) => (
              <button
                className="btn btn-sm text-white btn-neutral shadow-[inset_0_0_10px_black] font-customCin text-[10px]"
                key={index}
                onClick={() => handleCategoryChange(4 + index)}
              >
                {ite.slice(7)}
              </button>
            ))}
          </section>
        </>
      )}
      {/* -------------------------------------------------- */}
      {loader ? (
        <div />
      ) : (
        <Marquee>
          <section className="flex gap-40 px-20">
            {claimedFilter.map((obj, index) => (
              <div className="flex items-center gap-2 px-2">
                <div className="py-2">
                  <div className="relative">
                    <div className="w-9 absolute top-0 left-0">
                      <img src={`/ubg.png`} draggable={false} />
                    </div>
                    <div className="w-9 scale-[90%] z-20">
                      <img src={`/Uniques/${obj.Item}.png`} draggable={false} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    key={index}
                    className="font-customExo text-[12px] text-white"
                  >
                    {obj.Item}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="font-customAnt text-[red] text-[14px]">
                      CLAIMED
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current text-[#16f38f]"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </Marquee>
      )}
      {/* -------------------------------------------------- */}
      {loader ? (
        <div />
      ) : (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-[1200px] gap-0.5 gap-y-4 px-2 mt-4">
            {displayData.slice(0, visibleRows).map((obj) => (
              <div
                className={`relative flex min-h-[225px] justify-center items-center`}
              >
                {randomBg[Math.floor(Math.random() * randomBg.length)]}
                <section className="z-30 h-full w-full px-6 py-4 flex flex-col justify-between">
                  {obj.Player !== "" && (
                    <>
                      <div className="font-customAnt text-[24px] text-[#ff0000] border-y-2 border-[#ff0000] inline-block -rotate-[20deg] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-center">
                        Claimed
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="w-[70%]">
                      <div className="font-customExo text-[12px] text-white">
                        {obj.Item}
                      </div>
                      <div className="font-customExo text-[10px] text-gray-400">
                        {obj.Info}
                      </div>
                    </div>
                    <div className="w-[25%] z-10">
                      <img src={`/Uniques/${obj.Item}.png`} draggable={false} />
                    </div>
                  </div>
                  <img src="/full_div.png" className="p-0.5" />

                  {obj.Affix1 && (
                    <div>
                      <div className="text-[10px] text-gray-400 font-customExo">
                        Affix Range
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="font-customExo text-[10px]">
                          {obj.Affix1}
                        </div>
                        {obj.Affix2 && (
                          <div className="text-[pink] text-[10px]">{`/`}</div>
                        )}
                        {obj.Affix2 && (
                          <div className="font-customExo text-[10px]">{`${obj.Affix2}`}</div>
                        )}
                      </div>
                      <img src="/half_div.png" className="p-0.5" />
                    </div>
                  )}

                  <section>
                    {obj.Notes ? (
                      <div className="font-customExo text-[10px] text-[#ec783e]">
                        {obj.Notes}
                      </div>
                    ) : (
                      <div className="font-customExo text-[10px] text-gray-400">
                        N/A
                      </div>
                    )}
                  </section>
                  <img src="/full_div.png" className="p-0.5" />

                  <div className="flex items-center justify-center gap-1">
                    {obj.Bounty == 0 ? (
                      <div className="font-customExo text-[12px] text-[#fff]">
                        Get An Offer
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <div className="font-customExo text-[14px] text-[#fff]">
                            {obj.Bounty} Billion
                          </div>
                          <span>
                            <img
                              src="/gold.png"
                              alt="Gold Price"
                              className="w-5"
                            />
                          </span>
                        </div>
                        {obj.Player && (
                          <div className="font-customExo text-[12px] text-[#ff0000]">
                            Claimed by {obj.Player}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              </div>
            ))}
          </section>
          {visibleRows < displayData.length && (
            <div className=" flex justify-center pt-4">
              <button
                onClick={loadMore}
                className="btn btn-lg text-white font-customExo text-[12px]"
                style={{
                  borderImage: `url(/one.png) 32 fill`,
                  borderImageWidth: "10px",
                }}
              >
                Load More
              </button>
            </div>
          )}
        </>
        // <div className="overflow-x-auto">
        //   <table className="table">
        //     <thead>
        //       <tr className="font-customCin text-gray-300">
        //         <th>Index</th>
        //         <th></th>
        //         <th>Item Name</th>
        //         <th>Item Affix</th>
        //         <th>Player</th>
        //         <th>Bounty</th>
        //       </tr>
        //     </thead>
        //     <tbody className="text-white">
        //       {displayData.map((obj, index) => (
        //         <tr
        //           key={index}
        //           className={index % 2 ? `bg-[#0b0909cf]` : `bg-[#07070700]`}
        //         >
        //           <td className="py-2 font-[Roberto] text-[12px]">
        //             {index + 1}
        //           </td>
        //           <td className="py-2">
        //             <div className="relative">
        //               <div className="w-9 absolute top-0 left-0">
        //                 <img src={`/ubg.png`} draggable={false} />
        //               </div>
        //               <div className="w-9 scale-[90%] z-20">
        //                 <img
        //                   src={`/Uniques/${obj.Item}.png`}
        //                   draggable={false}
        //                 />
        //               </div>
        //             </div>
        //           </td>
        //           <td className="py-2 font-customCin min-w-[250px] w-[300px] text-[12px] sm:text-[14px]">
        //             <section className="flex flex-col">
        //               <div className="font-customExo">{obj.Item}</div>
        //               <div className="text-[10px] text-gray-400">
        //                 {obj.Info}
        //               </div>
        //             </section>
        //           </td>
        //           <td className="py-2 font-customCin text-[12px] sm:text-[13px]">
        //             <section>
        //               {obj.Affix1 && (
        //                 <>
        //                   <div className="flex gap-1 min-w-[120px]">
        //                     <div className="font-serif">{obj.Affix1}</div>
        //                     {obj.Affix2 && (
        //                       <div className="text-[pink]">{`|`}</div>
        //                     )}
        //                     {obj.Affix2 && (
        //                       <div className="font-serif">
        //                         {`${obj.Affix2}`}
        //                       </div>
        //                     )}
        //                   </div>
        //                   <div className="text-[10px] text-gray-400">
        //                     Affix Range
        //                   </div>
        //                 </>
        //               )}
        //             </section>
        //           </td>
        //           <td className="py-2 font-customCin">
        //             <section className="flex gap-2">
        //               {obj.Player &&
        //                 obj.Player.split(",").map((ite, index) => (
        //                   <>
        //                     {ite == `Claimed` ? (
        //                       ``
        //                     ) : (
        //                       <div
        //                         className="font-serif text-[12px] p-1 px-2 rounded-md text-white"
        //                         key={index}
        //                       >
        //                         {ite}
        //                       </div>
        //                     )}
        //                   </>
        //                 ))}
        //             </section>
        //           </td>
        //           <td className="py-2 font-customCin text-[12px] sm:text-[14px]">
        //             {obj.Player ? (
        //               <div className="font-customAnt text-[14px] text-[red] border-y-2 border-[red] inline-block -rotate-[15deg]">
        //                 Claimed
        //               </div>
        //             ) : (
        //               <div className="flex items-center gap-1">
        //                 <div>
        //                   {`${obj.Bounty}`}{" "}
        //                   <span className="font-[monospace] text-[gold]">
        //                     B
        //                   </span>
        //                 </div>
        //                 <div className="w-5">
        //                   <img src="/gold.png" />
        //                 </div>
        //               </div>
        //             )}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
    </section>
  );
}
