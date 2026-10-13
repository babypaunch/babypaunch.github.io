# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-14 KST
- 상태: 검증됨
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ의 화면 해상도 전달 오류를 수정한 웹 빌드를 반영했다. 캔버스와 나눔고딕 글꼴의 내부 해상도를 갱신하며 기존 CSS 확대·이동 방식을 유지한다.

## 마지막 완료 작업

- AOJ의 main.lua를 포함한 game.data와 이에 대응하는 game.js·index.html을 같은 빌드에서 교체했다.

## 변경 파일

- `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `art-of-jigsaw/index.html`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 빌드 후 사이트 품질 검사 62페이지와 앱 그룹 검사가 통과했다.
- AOJ 원본 저장소에서 Lua 화면 메시지 처리·폰트 DPI·화면 맞춤 회귀 검사, 터치·확대 제스처 검사와 Android 빌드가 통과했다.
- 브라우저 화면 검사와 시각 검증은 수행하지 않았다. Pages는 main push 후 자동 게시한다.

## 차단 요소

- 없음.

## 다음 작업 하나

- 게시된 버전에서 사용자의 기본 글자 및 확대 후 선명도 확인 결과를 받는다.

## 사용자에게 필요한 작업

- AOJ 앱을 다시 열어 선명도를 확인한다.

## 경고

- Digital Asset Links에는 개인 테스트용 디버그 인증서가 등록되어 있다. Play 배포 시 해당 서명 지문을 추가해야 한다.
