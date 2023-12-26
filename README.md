# 2.5D_maze

### 개선 사항
1. html 페이지 추가: 게임 시작 전/후 시작 화면 필요
    + 게임 종료 이벤트 처리
    + 미로의 종류를 다양하게 선택, 혹은 제작과 베포할 수 있도록 추가


2. 사용감 개선
    + 원근감 표현이 다소 부족; 벽 한 칸의 길이를 거리에 따라 조절
    + edge_index 뒤에 인덱스에도 보여야 하는 부분이 있음 
    + 조작이 다소 직관적이지 못함; turn_...()의 동작이 보여지지 않아 교차로에서 방향감을 잃기 쉬움
    + 지도의 모든 칸이 같은 색과 같은 모양이라 구분이 어려움 미로에 특정한 오브젝트 필요
    + 그림자 표현; 모퉁잉에 그림자 표현 살짝 넣기
