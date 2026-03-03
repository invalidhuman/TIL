## 2차원 배열 BFS 탐색

```python
from collections import deque

def bfs(grid, n, m):
    # 상하좌우 방향벡터
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    # 시작점 (0,0)을 큐에 넣고 방문 처리
    queue = deque([(0, 0)])`
    visited = [[False] * m for _ in range(n)]
    visited[0][0] = True

    while queue:
        x, y = queue.popleft()

        # 현재 위치에서 4방향 확인
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            # 지도 범위를 벗어나지 X & 처음 방문하는 곳 & 갈 수 있는 길인 경우(1)
            if 0 <= nx < n and 0 <= ny < m:
                if not visited[nx][ny] and grid[nx][ny] == 1:
                    visited[nx][ny] = True
                    queue.append((nx, ny))


```
