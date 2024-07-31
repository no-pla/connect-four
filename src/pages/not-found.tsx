import Container from "components/Container";
import Button from "components/Custom/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-darkPurple h-screen flex items-center justify-center">
      <Container primary={false}>
        <div className="flex justify-center items-center flex-col gap-[80px] px-4 py-10">
          <h1 className="text-[1.5rem] font-bold text-center">
            이 페이지에는
            <br />
            아무것도 없어요. 🥺
          </h1>
          <Button
            primary={false}
            secondary
            text="메인 화면으로 가기"
            style="text-center"
            onClick={() => goBackHome()}
          />
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
