# TIL (Today I Learned)

매일 공부한 내용을 Obsidian vault로 정리한 저장소입니다.
주제별로 폴더를 나누어 관리하고, 아래 목차에서 각 문서로 바로 이동할 수 있습니다.

---

## 📚 학습 주제별 목차

<!-- TOC_START -->

### 🌐 Network

- [Body와 Header의 차이](./Network/Body%EC%99%80%20Header%EC%9D%98%20%EC%B0%A8%EC%9D%B4.md)
- [HTTP와 HTML](./Network/HTTP%EC%99%80%20HTML.md)
- [OSI,TCPIP](./Network/OSI%2CTCPIP.md)
- [다중 서버 환경에서 세션 기반 인증 방식을 사용할 경우 발생할 수 있는 문제는 무엇인가요?](./Network/%EB%8B%A4%EC%A4%91%20%EC%84%9C%EB%B2%84%20%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C%20%EC%84%B8%EC%85%98%20%EA%B8%B0%EB%B0%98%20%EC%9D%B8%EC%A6%9D%20%EB%B0%A9%EC%8B%9D%EC%9D%84%20%EC%82%AC%EC%9A%A9%ED%95%A0%20%EA%B2%BD%EC%9A%B0%20%EB%B0%9C%EC%83%9D%ED%95%A0%20%EC%88%98%20%EC%9E%88%EB%8A%94%20%EB%AC%B8%EC%A0%9C%EB%8A%94%20%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94%3F.md)

### 🖥️ OS (운영체제)

- [프로세스(Process)와 스레드(Thread)의 정의 및 차이](./OS/%EB%A9%80%ED%8B%B0%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C.md)

### 🧩 Algorithm

- [BFS](./Algorithm/BFS.md)

### 🎨 Frontend

- [OAuth 2.0 Authorization Code Flow](./Frontend/OAuth.md)
- [Service Worker](./Frontend/%EC%84%9C%EB%B9%84%EC%8A%A4%20%EC%9B%8C%EC%BB%A4.md)
- [Web Worker](./Frontend/%EC%9B%B9%20%EC%9B%8C%EC%BB%A4.md)

#### CSS

- [px,em,rem](./Frontend/CSS/px%2Cem%2Crem.md)

#### Framework

- [Next.js 도입 배경과 장단점 정리](./Frontend/Framework/whynext.md)

#### Rendering

- [URI, URL, URN](./Frontend/Rendering/URI%2C%20URL%2C%20URN.md)
- [웹 렌더링 패턴](./Frontend/Rendering/%EC%9B%B9%20%EB%A0%8C%EB%8D%94%EB%A7%81%20%ED%8C%A8%ED%84%B4.md)

#### 모던리액트DeepDive

- [가상DOM과 리액트 파이버](./Frontend/%EB%AA%A8%EB%8D%98%EB%A6%AC%EC%95%A1%ED%8A%B8DeepDive/%EA%B0%80%EC%83%81DOM%EA%B3%BC%20%EB%A6%AC%EC%95%A1%ED%8A%B8%20%ED%8C%8C%EC%9D%B4%EB%B2%84.md)

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
