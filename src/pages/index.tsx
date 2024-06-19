import Board from "../components/Game/Board";
import MarkerContainer from "../components/Game/MarkerContainer";

const Index = () => {
  return (
    <main className="bg-darkPurple h-screen flex justify-center items-center mobile:bg-purple">
      <Board>
        <MarkerContainer />
      </Board>
    </main>
  );
};

export default Index;
