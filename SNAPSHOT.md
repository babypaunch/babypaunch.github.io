# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-13
- 상태: Art Of Jigsaw 플레이 화면의 기본 1:1 크기 적용
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 로그인·설정은 화면에 맞추고 플레이는 기본 1:1 크기에서 시작해야 폰 화면에서 조각이 선명하고 읽기 쉽다.

## 마지막 완료 작업

AOJ 플레이 화면의 기본 크기를 1:1 수준으로 높이고 확대 배율에 맞는 렌더링 해상도를 적용했다.

## 변경 파일

`art-of-jigsaw/bridge.js`, `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `art-of-jigsaw/index.html`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 빌드, 앱 그룹 검사, 사이트 품질 검사 62페이지와 JavaScript 구문 검사가 통과했다. 실제 폰 화면의 시각적 확인은 사용자 확인 대상이다.

## 차단 요소

없음.

## 다음 작업 하나

테스트 계정으로 로그인한 AOJ Android 에뮬레이터에서 조각 이동을 확인한다.

## 사용자에게 필요한 작업

없음.

## 경고

Digital Asset Links에는 현재 개인 테스트용 디버그 인증서만 등록했다. Play 배포 때는 해당 서명 지문을 추가해야 한다.
