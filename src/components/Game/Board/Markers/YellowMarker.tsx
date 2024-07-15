import BigYellowMarker from "assets/counter-yellow-large.svg?react";
import SmallYellowMarker from "assets/counter-yellow-small.svg?react";

const YellowMarker = ({ win }: { win: boolean }) => {
  return (
    <div className="relative">
      {win && (
        <div className="w-[34px] h-[34px] absolute bg-transparent top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full border-white border-[6px]"></div>
      )}
      <BigYellowMarker
        className="mobile:hidden mini:hidden"
        viewBox="0 0 70 75"
      />
      <SmallYellowMarker className="hidden tablet:hidden mobile:block mini:block" />
    </div>
  );
};

export default YellowMarker;
