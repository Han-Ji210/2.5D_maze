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
