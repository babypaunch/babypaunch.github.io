# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-13
- 상태: Art Of Jigsaw 모바일 입력·가로 화면 웹 빌드 반영
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ 모바일 가로 화면은 원래 게임 비율을 너비에 맞춰 유지하고, 터치 조작 및 넘치는 세로 영역 이동을 지원한다.

## 마지막 완료 작업

AOJ 웹 빌드의 터치 입력 및 가로 화면 크기 변경을 반영했다.

## 변경 파일

`art-of-jigsaw/bridge.js`, `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `art-of-jigsaw/index.html`, `SNAPSHOT.md`.

## 검증 결과

- AOJ 웹 빌드와 Docker Jekyll 빌드 통과. 사이트 품질 검사 62페이지 및 앱 그룹 검사 통과. 공개판과 에뮬레이터 검증은 게시 후 진행한다.

## 차단 요소

없음.

## 다음 작업 하나

AOJ Android 에뮬레이터에서 가로 방향과 터치 입력을 확인한다.

## 사용자에게 필요한 작업

없음.

## 경고

Digital Asset Links에는 현재 개인 테스트용 디버그 인증서만 등록했다. Play 배포 때는 해당 서명 지문을 추가해야 한다.
