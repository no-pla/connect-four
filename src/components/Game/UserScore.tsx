// import React from "react";
// import { useSelector } from "react-redux";
// import RedIcon from "../../assets/images/player-one.svg?react";
// import YellowIcon from "../../assets/images/player-two.svg?react";

// interface GameData {
//   game: {
//     board: ("RED" | "YELLOW" | null)[][];
//     currentPlayer: "RED" | "YELLOW";
//     markerCounter: number;
//     winner: "RED" | "YELLOW" | null;
//     timer: number;
//     stop: boolean;
//     redWin: number;
//     yellowWin: number;
//   };
// }

// const UserScore = ({ user }: { user: "RED" | "YELLOW" }) => {
//   const redScore = useSelector((state: GameData) => state.game.redWin);
//   const yellowScore = useSelector((state: GameData) => state.game.yellowWin);
//   return (
//     <div className="relative w-[140px] font-bold text-center bg-white border-black border-[3px] pb-4 pt-[46px] tablet:my-8 rounded-[20px] tablet:flex-1  mobile:flex-1 shadow-container mobile:py-[14px]">
//       <div className="tablet:flex tablet:justify-center tablet:gap-5 tablet:items-center mobile:flex mini:flex mobile:flex-col mini:flex-col mobile:justify-center mobile:items-center">
//         <div
//           className={`text-headingS ${
//             user === "RED"
//               ? "tablet:block mobile:block mini:block"
//               : "tablet:hidden"
//           }`}
//         >
//           유저 {user === "RED" ? 1 : 2}
//         </div>
//         <div className="text-headingL">
//           {user === "RED" ? redScore : yellowScore}
//         </div>
//         <div
//           className={`text-headingS hidden ${
//             user === "YELLOW" && "tablet:block mobile:block mini:hidden"
//           }`}
//         >
//           유저 {user === "RED" ? 1 : 2}
//         </div>
//       </div>
//       <div>
//         {user === "RED" ? (
//           <RedIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mobile:left-0 mobile:-translate-y-1/2 mobile:top-1/2" />
//         ) : (
//           <YellowIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 tablet:left-0 tablet:translate-y-1/2 tablet:translate-x-0 mobile:left-0 mobile:-translate-y-1/2 mobile:top-1/2" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserScore;

import React from "react";
import { useSelector } from "react-redux";
import RedIcon from "../../assets/images/player-one.svg?react";
import YellowIcon from "../../assets/images/player-two.svg?react";

interface GameData {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    markerCounter: number;
    winner: "RED" | "YELLOW" | null;
    timer: number;
    stop: boolean;
    redWin: number;
    yellowWin: number;
  };
}

const UserScore = ({ user }: { user: "RED" | "YELLOW" }) => {
  const redScore = useSelector((state: GameData) => state.game.redWin);
  const yellowScore = useSelector((state: GameData) => state.game.yellowWin);

  return (
    <div className="bg-white relative flex flex-col justify-center items-center font-bold text-center border-black border-[3px] rounded-[20px] max-w-[140px] pb-4 pt-[46px] shadow-container flex-1 laptop:max-w-full laptop:flex-row laptop:gap-10 laptop:py-[15px] tablet:flex-row tablet:max-w-full tablet:gap-10 tablet:py-[15px] mobile:max-w-full mobile:py-[10px] mini:max-w-full mini:py-[10px]  mini:scale-90">
      <div
        className={`text-headingS ${
          user === "RED"
            ? "tablet:block mobile:block mini:block"
            : "laptop:hidden tablet:hidden mobile:block"
        } mobile:text-headingXS mini:text-headingXS`}
      >
        유저 {user === "RED" ? 1 : 2}
      </div>
      <div className="text-headingL align-baseline mobile:text-[32px] mobile:leading-none mini:text-[32px] mini:leading-none">
        {user === "RED" ? redScore : yellowScore}
      </div>
      <div
        className={`text-headingS hidden ${
          user === "YELLOW" &&
          "laptop:block tablet:block mobile:hidden mini:hidden"
        }`}
      >
        유저 {user === "RED" ? 1 : 2}
      </div>
      <div>
        {user === "RED" ? (
          <RedIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 laptop:top-1/2 laptop:-translate-y-1/2 laptop:-translate-x-1/2 laptop:left-0 tablet:top-1/2 tablet:-translate-y-1/2 tablet:-translate-x-1/2 tablet:left-0 mobile:top-1/2 mobile:-translate-y-1/2 mobile:-translate-x-1/2 mobile:left-0 mini:top-1/2 mini:-translate-y-1/2 mini:-translate-x-1/2 mini:left-0" />
        ) : (
          <YellowIcon className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 laptop:top-1/2 laptop:-translate-y-1/2 laptop:right-0 laptop:translate-x-1/2 tablet:top-1/2 tablet:-translate-y-1/2 tablet:right-0 tablet:translate-x-1/2 mobile:top-1/2 mobile:-translate-y-1/2 mobile:right-0 mobile:translate-x-1/2  mini:top-1/2 mini:-translate-y-1/2 mini:translate-x-1/2 mini:right-0" />
        )}
      </div>
    </div>
  );
};

export default UserScore;
