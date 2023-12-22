/* 개선 사항
1. html 페이지 추가: 게임 시작 전/후 시작 화면 필요
    1-1: 게임 종료 이벤트 처리
    1-2: 미로의 종류를 다양하게 선택, 혹은 제작과 베포할 수 있도록 추가
2. 사용감 개선
    2-1: 원근감 표현이 다소 부족; 벽 한 칸의 길이를 거리에 따라 조절
    2-2: edge_index 뒤에 인덱스에도 보여야 하는 부분이 있음 
    2-3: 조작이 다소 직관적이지 못함; turn_...()의 동작이 보여지지 않아 교차로에서 방향감을 잃기 쉬움
    2-4: 지도의 모든 칸이 같은 색과 같은 모양이라 구분이 어려움 미로에 특정한 오브젝트 필요
    2-5: 그림자 표현; 모퉁잉에 그림자 표현 살짝 넣기
*/


const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  let CANVAS_SIZE;
  let player_state = [0, 0, 0];
  //방향은 미로의 2차원 배열을 기준으로 위 행을 바라보고 있으면 -1, 아래 행을 바라보고 있으면 1, 왼쪽 열을 바라보고 있으면 -2, 오른쪽 열을 바라보고 있으면 2라고 정한다
  
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 2) {
        player_state[0] = j;
        player_state[1] = i;
      }
    }
  }
  player_state[2] = 1;
  
  function setup() {
    CANVAS_SIZE = min(windowWidth, windowHeight);
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    stroke(0);
    strokeWeight(1);
    // rectMode(CENTER);
  }
  
  function keyPressed() {
    switch (keyCode) {
      case 87:
        moveForward();
        break;
      case 83:
        moveBackward();
        break;
      case 65:
        turnLeft();
        break;
      case 68:
        turnRight();
        break;
    }
    console.log(player_state);
    drawPSight();
  }
  
  function moveForward() {
    let nextX = player_state[0];
    let nextY = player_state[1];
  
    switch (player_state[2]) {
      case -1:
        nextY--;
        break;
      case 1:
        nextY++;
        break;
      case -2:
        nextX--;
        break;
      case 2:
        nextX++;
        break;
    }
  
    if (maze[nextY][nextX] !== 1) {
      player_state[0] = nextX;
      player_state[1] = nextY;
    }
  }
  function moveBackward() {
    let nextX = player_state[0];
    let nextY = player_state[1];
  
    switch (player_state[2]) {
      case -1:
        nextY++;
        break;
      case 1:
        nextY--;
        break;
      case -2:
        nextX++;
        break;
      case 2:
        nextX--;
        break;
    }
  
    if (maze[nextY][nextX] !== 1) {
      player_state[0] = nextX;
      player_state[1] = nextY;
    }
  }
  
  function turnLeft() {
    switch (player_state[2]) {
      case -1:
        player_state[2] = -2;
        break;
      case 1:
        player_state[2] = 2;
        break;
      case -2:
        player_state[2] = 1;
        break;
      case 2:
        player_state[2] = -1;
        break;
    }
  }
  function turnRight() {
    switch (player_state[2]) {
      case -1:
        player_state[2] = 2;
        break;
      case 1:
        player_state[2] = -2;
        break;
      case -2:
        player_state[2] = -1;
        break;
      case 2:
        player_state[2] = 1;
        break;
    }
  }
  
  function drawPSight() {
    background(220);
    
    let sight_maze = [];
    switch (player_state[2]) {
      case -2:
        for (let j = -1; j < 2; j++) {
          sight_maze.push([]);
          for (let i = player_state[0]; i >= 0; i--) {
            sight_maze[j + 1].push(maze[player_state[1] - j][i]);
          }
        }
        break;
      case 2:
        for (let j = -1; j < 2; j++) {
          sight_maze.push([]);
          for (let i = player_state[0]; i < maze.length; i++) {
            sight_maze[j + 1].push(maze[player_state[1] + j][i]);
          }
        }
        break;
      case -1:
        for (let j = -1; j < 2; j++) {
          sight_maze.push([]);
          for (let i = player_state[1]; i >= 0; i--) {
            sight_maze[j + 1].push(maze[i][player_state[0] + j]);
          }
        }
        break;
      case 1:
        for (let j = -1; j < 2; j++) {
          sight_maze.push([]);
          for (let i = player_state[1]; i < maze.length; i++) {
            sight_maze[j + 1].push(maze[i][player_state[0] - j]);
          }
        }
        break;
    }
  // console.log(sight_maze)
    
    let edge_index;
    for (let i = 0; i < sight_maze[1].length; i++) {
      if (sight_maze[1][i] == 1) {
        edge_index = i;
        break;      
      }
    }
    
    // console.log(edge_index)
    // console.log(BLOCK_LEN)
    
    // 벽은 index가 n일 때, (n+1) * BLOCK_LEN 부터 n * BLOCK_LEN 까지 그리고 캔버스의 끝까지 평행선을 긋는다  
    const BLOCK_LEN = int((CANVAS_SIZE / 2) / (maze.length - 1));
    for (let i = edge_index; i >= 0; i--){
        //시야 기준 왼쪽 벽 그리기
        if(sight_maze[0][i]){
            beginShape();
            vertex(0, BLOCK_LEN * i);
            vertex(BLOCK_LEN * i, BLOCK_LEN * i);
            vertex(BLOCK_LEN * (i+1), BLOCK_LEN * (i+1)); 
            vertex(BLOCK_LEN * (i+1), height - BLOCK_LEN * (i+1));
            vertex(BLOCK_LEN * i, height - BLOCK_LEN * i);
            vertex(0, height - BLOCK_LEN * i);
            endShape(CLOSE);
        }
        //시야 기준 오른쪽 벽 그리기
        if(sight_maze[2][i]){
            beginShape();
            vertex(width, BLOCK_LEN * i);
            vertex(width - BLOCK_LEN * i, BLOCK_LEN * i);
            vertex(width - BLOCK_LEN * (i+1), BLOCK_LEN * (i+1)); 
            vertex(width - BLOCK_LEN * (i+1), height - BLOCK_LEN * (i+1));
            vertex(width - BLOCK_LEN * i, height - BLOCK_LEN * i);
            vertex(width, height - BLOCK_LEN * i);
            endShape(CLOSE);
        }    

        //도착점이 보이는 경우
        if (sight_maze[1][i] == 3){
            fill(180, 255, 195);
            beginShape();
            vertex(BLOCK_LEN * (i+1), height - BLOCK_LEN * (i+1));
            vertex(BLOCK_LEN * i, height - BLOCK_LEN * i);
            vertex(width - BLOCK_LEN * i, height - BLOCK_LEN * i);
            vertex(width - BLOCK_LEN * (i+1), height - BLOCK_LEN * (i+1));
            endShape(CLOSE);
            fill(255);

            //미로 탈출에 성공했을 때
            if(i == 0)
            {
                
            }
        }
    }
    
    //시야 끝 벽 그리기
    rect(BLOCK_LEN * edge_index, BLOCK_LEN * edge_index, width - BLOCK_LEN * edge_index*2, height - BLOCK_LEN * edge_index*2);

}