import BigYellowMarker from "../../../../assets/images/counter-yellow-large.svg?react";
import SmallYellowMarker from "../../../../assets/images/counter-yellow-small.svg?react";

const YellowMarker = () => {
  return (
    <>
      <BigYellowMarker
        className="mobile:hidden mini:hidden"
        viewBox="0 0 70 75"
      />
      <SmallYellowMarker className="hidden tablet:hidden mobile:block mini:block" />
    </>
  );
};

export default YellowMarker;
