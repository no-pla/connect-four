# Connect Four
Connect Four는 두 명이 번갈아 가면서 마커를 두고, 먼저 마커 네 개를 연결하는 사람이 승리하는 전략 게임입니다.

## Tech Stack
- Vite
- React
- Typescript: 타입을 지정하여 휴먼 에러를 사전에 방지하고 작업 생산성을 높이기 위한 자바스크립트 슈퍼셋.
- Vitest: 테스트 코드를 작성하여 코드 품질을 보장하기 위함.

## Features
- 유저 대전 모드: 두 명의 플레이어가 대결할 수 있는 모드
- 마우스 및 키보드 지원: 마우스 클릭과 키보드를 이용한 조작이 가능

## Color Reference
| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Main Color | ![#5c2dd5](https://via.placeholder.com/10/5c2dd5?text=+) #5c2dd5 |
| Sub Color | ![#7945ff](https://via.placeholder.com/10/7945ff?text=+) #7945ff |
| Point Color 1 | ![#fd6687](https://via.placeholder.com/10/fd6687?text=+) #fd6687 |
| Point Color 2 | ![#ffce67](https://via.placeholder.com/10/ffce67?text=+) #ffce67 |


## Optimizations
게임의 승리 조건을 검사하는 로직을 최적화했습니다. 초기 로직은 모든 방향으로 빈 칸이나 다른 색상의 마커가 나타날 때까지 `for`문을 사용하는 비효율적인 방식이었습니다. 이를 `방향 벡터` 기법을 적용하여 불필요한 중복을 줄이고, 성능 개선과 코드 가독성을 높였습니다.

## Lessons Learned
- **테스트 코드 작성:** 이번 프로젝트에서 처음으로 테스트 코드를 작성했습니다. 이를 통해 리팩토링 과정에서의 버그를 빠르게 발견하고 수정할 수 있었습니다
- **알고리즘 패턴 적용:** 게임 결과 로직을 개선하기 위하여 완전 탐색 알고리즘 중에서 `방향 벡터` 기법을 활용하여 코드의 효율성과 유지보수성을 향상시킬 수 있었습니다.

## Screenshots
### 랜딩 페이지
<table>
  <tr>
    <td valign="top"><img src="https://github.com/user-attachments/assets/cd9f1526-7cf5-4309-9ddf-75bd7cdc95df"/></td>
    <td valign="top"><img src="https://github.com/user-attachments/assets/8d1f677b-ade9-4aa1-9388-206dbbd19623"/></td>
  </tr>
</table>

### 게임 페이지
<table>
  <tr>
    <td valign="top"><img src="https://github.com/user-attachments/assets/1a53fda9-0c36-448a-a6d7-825b90d43d0b"/></td>
    <td valign="top"><img src="https://github.com/user-attachments/assets/a9e4da9a-e066-4b99-9490-d3a5fb884777"/></td>
  </tr>
</table>

### 결과창
<table>
  <tr>
    <td valign="top"><img src="https://github.com/user-attachments/assets/836ca976-3f76-4bcc-919e-2db07bd1a831"/></td>
    <td valign="top"><img src="https://github.com/user-attachments/assets/b12349fb-6d33-4fce-ae9b-2d0363a2984f"/></td>
  </tr>
</table>

## 배포
[배포 링크](https://connect-four-two.vercel.app/)
