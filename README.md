# TIL (Today I Learned)

매일 공부한 내용을 Obsidian vault로 정리한 저장소입니다.
주제별로 폴더를 나누어 관리하고, 아래 목차에서 각 문서로 바로 이동할 수 있습니다.

---

## 📚 학습 주제별 목차

<!-- TOC_START -->

### 🌐 Network

네트워크 계층, HTTP 프로토콜, 통신 단위 등 웹 통신의 기초.

- [OSI 7계층 / TCP-IP 4계층](./Network/OSI,TCPIP.md) — 계층 모델 비교와 역할
- [Body와 Header의 차이](./Network/Body와%20Header의%20차이.md) — 메타 정보 vs 실제 데이터
- [HTTP와 HTML](./Network/HTTP와%20HTML.md) *(작성 예정)*

### 🖥️ OS (운영체제)

운영체제의 실행 단위와 자원 관리.

- [프로세스와 스레드](./OS/멀티프로세스와멀티스레드.md) — 메모리 구조, 멀티프로세스 vs 멀티스레드

### 🧩 Algorithm

자료구조와 알고리즘 풀이 정리.

- [BFS (너비 우선 탐색)](./Algorithm/BFS.md) — 2차원 배열 BFS 템플릿

### 🎨 Frontend

#### 인증 / 보안

- [OAuth 2.0 Authorization Code Flow](./Frontend/OAuth.md) — 권한 위임 프로토콜의 표준 흐름

#### 브라우저 내부 동작

- [웹 워커 (Web Worker)](./Frontend/웹%20워커.md) — 메인 스레드 분리와 백그라운드 연산
- [서비스 워커 (Service Worker)](./Frontend/서비스%20워커.md) — fetch 가로채기, 캐싱, 오프라인 지원

#### 렌더링

- [웹 렌더링 패턴](./Frontend/Rendering/웹%20렌더링%20패턴.md) — CSR / SSR / SSG / ISR 비교
- [URI, URL, URN](./Frontend/Rendering/URI,%20URL,%20URN.md) — 자원 식별자 개념 정리

#### React / Framework

- [가상 DOM과 리액트 파이버](./Frontend/모던리액트DeepDive/가상DOM과%20리액트%20파이버.md) — DOM, CSSOM, 렌더링 파이프라인
- [Next.js를 사용하는 이유](./Frontend/Framework/whynext.md) — CoC, 라우팅, 렌더링 방식

#### CSS

- [px, em, rem 단위 비교](./Frontend/CSS/px,em,rem.md) — 상대/절대 단위의 차이

<!-- TOC_END -->

---

## 🗂️ 폴더 구조

```
TIL/
├── Algorithm/      # 알고리즘 풀이 정리
├── Frontend/       # 프론트엔드 전반
│   ├── CSS/
│   ├── Framework/
│   ├── Rendering/
│   └── 모던리액트DeepDive/
├── Network/        # 네트워크 기초
└── OS/             # 운영체제
```

---

## 🤖 자동 업데이트 (GitHub Actions)

`.github/workflows/update-readme.yml` 워크플로가 설정되어 있어, `.md` 파일이 push 되면
`.github/scripts/update-toc.js`가 `<!-- TOC_START -->` ~ `<!-- TOC_END -->` 사이의 목차를
자동으로 재생성합니다. 단, 자동 생성은 **파일 H1 제목 기반 링크 목록**이라 수동 설명 문구(`— ...`)는 유지되지 않습니다.

- **수동 관리 유지**: 목차를 손으로 다듬고 싶으면 워크플로를 disable 하세요.
- **완전 자동화**: 지금처럼 그대로 두면 새 `.md` 파일을 올릴 때마다 자동으로 목차에 추가됩니다.

수동으로 실행하려면:

```bash
node .github/scripts/update-toc.js
```
