# README 자동 갱신 워크플로

이 디렉토리는 루트 `README.md`의 목차 부분을 자동으로 갱신해주는 GitHub Actions 설정을 담고 있습니다.
이 문서는 **무엇을 / 왜 / 어떻게** 하는지 정리한 설명서입니다.

---

## 1. 한 줄 요약

> **새 `.md` 파일을 push 하면, GitHub 서버가 README의 목차를 다시 써서 자동 커밋한다.**

---

## 2. 왜 만들었나

TIL 저장소는 문서가 쌓일수록 루트 README의 목차를 직접 업데이트해야 하는 수고가 생깁니다.

- 파일을 추가할 때마다 README 열고 링크 붙여넣기 → 귀찮음
- 새 파일 올리고 README 업데이트를 깜빡함 → 목차 불일치
- 파일명을 바꾸면 링크가 깨짐 → 검출이 어려움

이 workflow는 위 세 가지를 모두 **GitHub 서버에서 자동으로 처리**합니다.

---

## 3. 전체 동작 흐름

```
[내가 .md 파일 push]
        │
        ▼
[GitHub: workflow 트리거 조건 충족?]
        │ (main 브랜치 & .md 변경 시)
        ▼
[Ubuntu 가상 머신 생성]
        │
        ▼
[1. repo 체크아웃]
        │
        ▼
[2. Node.js 20 설치]
        │
        ▼
[3. update-toc.js 실행 → README 재작성]
        │
        ▼
[4. README에 변경 있음?]
        │
   ┌────┴────┐
   ▼         ▼
[없음]     [있음]
[종료]   [봇이 커밋 & push]
              │
              ▼
   [repo의 README가 최신 상태로 유지됨]
```

---

## 4. 구성 파일

### 4-1. `.github/workflows/update-readme.yml`

**역할**: GitHub에게 "언제, 어떤 절차로 실행할지" 알려주는 설정표.

| 항목 | 내용 |
|------|------|
| **트리거** | `main` 브랜치에 `.md` 파일 push 시 (`workflow_dispatch`로 수동 실행도 가능) |
| **권한** | `contents: write` — repo 파일 수정/커밋 권한 |
| **무한 루프 방지** | `github.actor != 'github-actions[bot]'` — 봇이 커밋한 건 다시 처리하지 않음 |
| **실행 환경** | `ubuntu-latest` + Node.js 20 |

### 4-2. `.github/scripts/update-toc.js`

**역할**: README의 특정 구간만 골라 "현재 파일 구조에 맞게" 재작성하는 Node.js 스크립트.

처리 순서:
1. `SECTIONS` 배열에 지정된 최상위 폴더(Network, OS, Algorithm, Frontend)를 스캔
2. 각 `.md` 파일을 열어 **첫 줄의 H1(`# 제목`)** 을 뽑음 (없으면 파일명)
3. 하위 폴더 구조를 따라 `###`(섹션) / `####`(서브 카테고리)로 묶음
4. 모인 링크 목록을 마커 사이 구간에 덮어씀

---

## 5. 마커 시스템 (핵심)

스크립트는 README 전체를 뒤엎지 않습니다. 아래 두 마커 사이의 구간만 교체합니다.

```markdown
## 📚 학습 주제별 목차

<!-- TOC_START -->

(← 이 사이가 자동 생성 영역)

<!-- TOC_END -->

---

## 🗂️ 폴더 구조
```

즉 **마커 바깥의 모든 내용(제목, 폴더 구조, 자동화 안내 등)은 그대로 보존**됩니다. 수동으로 편집한 내용이 날아갈 위험은 마커 사이에 한정됩니다.

---

## 6. 실제 시나리오

### 예시: `Frontend/CSS/flexbox.md`를 새로 추가하는 경우

**사용자가 하는 일**
```bash
git add Frontend/CSS/flexbox.md
git commit -m "260423: flexbox"
git push
```

**GitHub가 자동으로 하는 일**
1. push 이벤트 감지 → workflow 트리거
2. Ubuntu VM에서 최신 repo 체크아웃
3. `update-toc.js` 실행 → `flexbox.md`의 H1 읽고 README의 `#### CSS` 섹션에 줄 추가
4. README가 바뀌었으므로 `github-actions[bot]`이 `docs: README 목차 자동 갱신` 커밋 후 push

**결과**
- repo에는 사용자 커밋 1개 + 봇 커밋 1개가 쌓임
- README는 새 파일 링크가 포함된 상태로 자동 갱신

---

## 7. 제약과 트레이드오프

| 장점 | 단점 |
|------|------|
| 새 문서 추가 시 README 수동 편집 불필요 | 자동 생성 목차는 **H1 제목 + 링크**만 담음 |
| 파일명 변경 / 이동도 자동 반영 | 수동으로 붙인 설명 문구(`— CSR / SSR 비교`)는 유지되지 않음 |
| 봇이 대신 커밋해주므로 작업 흐름 단순 | 커밋 히스토리에 봇 커밋이 섞임 |

### 언제 자동화가 유리한가
- 문서가 많고 자주 추가되는 시점
- 폴더 구조가 안정적이고 H1 제목이 잘 정리된 경우

### 언제 수동이 유리한가
- 각 항목에 한 줄 설명을 붙이고 싶을 때
- 커밋 히스토리를 깔끔하게 유지하고 싶을 때
- 문서가 10여 개 수준이라 수동도 부담 없을 때

---

## 8. 활성화 / 비활성화

### 활성화
workflow 파일과 스크립트를 commit & push 하면 자동으로 활성 상태가 됩니다.

### 비활성화
GitHub repo 페이지 → **Actions 탭** → 해당 workflow 선택 → 오른쪽 **"⋯" → "Disable workflow"**

이 상태에서도 파일은 repo에 남아있으므로, 나중에 다시 켤 수 있습니다.

### 수동 실행
Actions 탭 → 해당 workflow → **"Run workflow"** 버튼으로 언제든 재실행 가능.

또는 로컬에서 미리 돌려볼 수도 있습니다:
```bash
node .github/scripts/update-toc.js
```

---

## 9. 확장 아이디어

현재는 H1 제목만 뽑지만, 스크립트를 조금 바꾸면 다음도 가능합니다.

- **frontmatter로 설명 유지**: 각 `.md` 파일 상단에 `---\ndescription: "..."\n---`를 두고, 스크립트가 읽어 ` — ` 뒤에 붙이기
- **최근 업데이트 날짜 표시**: git log에서 마지막 수정일을 읽어 항목 옆에 표기
- **작성 예정 문서 표시**: 파일 크기 0이면 `*(작성 예정)*` 태그 자동 부착
- **태그 기반 분류**: 폴더 대신 frontmatter의 `tags` 필드로 섹션 구성

필요해지는 시점에 `update-toc.js`를 수정하면 됩니다.

---

## 10. 트러블슈팅

| 증상 | 원인 후보 | 확인 방법 |
|------|-----------|-----------|
| workflow가 트리거되지 않음 | `.md` 파일이 아닌 다른 파일만 변경 | `paths` 필터 확인 |
| 커밋이 안 됨 | README에 변경이 없었음 (정상) | 로그에서 "변경 사항 없음" 메시지 확인 |
| `permission denied` 오류 | repo 설정의 Actions 권한 부족 | Settings → Actions → General → "Read and write permissions" 선택 |
| 무한 루프 발생 | 봇 커밋 필터 작동 안 함 | `if: github.actor != 'github-actions[bot]'` 조건 확인 |
| 링크가 깨짐 | 한글 파일명 인코딩 문제 | 스크립트의 `toLink()` 함수에서 `encodeURIComponent` 적용 여부 확인 |
