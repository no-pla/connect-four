import Check from "assets/icon-check.svg?react";

const RuleModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <div
        className="pt-[30px] pb-[54px] px-[34px]"
        data-testid="modal"
        id="modal"
      >
        <h3 className="pb-7 text-headingL font-bold text-center">규칙</h3>
        <div className="pb-8">
          <div className="text-headingS text-purple font-bold pb-4">설명</div>
          <div className="text-body">
            한 줄에 마커 네 개를 먼저 이어 붙이는 사람이 승리합니다.
            <br />
            (가로, 세로 혹은 대각선으로)
          </div>
        </div>
        <div className="text-headingS text-purple font-bold pb-4">
          플레이하는 법
        </div>
        <ol
          type="i"
          className="list-decimal list-inside text-body marker:text-headingXS marker:font-bold flex flex-col gap-[10px]"
        >
          <li className="marker:ml-4">빨간 마커가 먼저 두기 시작합니다.</li>
          <li className="marker:ml-4">
            플레이어는 번걸아 가며, 턴마다 하나의 마커를 둘 수 있습니다.
          </li>
          <li className="marker:ml-4">
            한 줄에 마커를 4개 두거나, 더 이상 마커를 둘 수 없으면 게임은
            종료됩니다.
          </li>
          <li className="marker:ml-4">
            이전 게임에서 먼저 시작한 플레이어는 다음 게임에서 두번째로
            시작합니다.
          </li>
        </ol>
      </div>
      <button
        data-testid="modal-close-button"
        className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => onClick()}
      >
        <Check />
      </button>
    </div>
  );
};

export default RuleModal;
