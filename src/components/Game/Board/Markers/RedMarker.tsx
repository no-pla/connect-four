import BigRedMarker from "../../../../assets/images/counter-red-large.svg?react";
import SmallRedMarker from "../../../../assets/images/counter-red-small.svg?react";

const RedMarker = () => {
  return (
    <>
      <BigRedMarker className="mobile:hidden mini:hidden" viewBox="0 0 70 75" />
      <SmallRedMarker className="hidden tablet:hidden mobile:block mini:block" />
    </>
  );
};

export default RedMarker;
