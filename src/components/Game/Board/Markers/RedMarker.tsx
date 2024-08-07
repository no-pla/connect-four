import BigRedMarker from "assets/counter-red-large.svg?react";
import SmallRedMarker from "assets/counter-red-small.svg?react";

const RedMarker = ({ win }: { win: boolean }) => {
  return (
    <div className="relative">
      {win && (
        <div
          data-testid="emphasizeMarker"
          className="w-[34px] h-[34px] absolute bg-transparent top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full border-white border-[6px] mobile:w-5 mobile:h-5 mini:w-5 mini:h-5"
        ></div>
      )}
      <BigRedMarker className="mobile:hidden mini:hidden" viewBox="0 0 70 75" />
      <SmallRedMarker className="hidden tablet:hidden mobile:block mini:block" />
    </div>
  );
};

export default RedMarker;
