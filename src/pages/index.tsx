import Board from "../components/Game/Board";
import BoardFooter from "../components/Game/BoardFooter";
import BoardHeader from "../components/Game/BoardHeader";
import MarkerContainer from "../components/Game/MarkerContainer";

const Index = () => {
  return (
    <main className="bg-purple h-screen flex flex-col items-center mobile:bg-purple">
      <div>
        <BoardHeader />
        <Board>
          <MarkerContainer />
        </Board>
      </div>
      <BoardFooter />
    </main>
  );
};

export default Index;
