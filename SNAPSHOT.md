# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-13
- 상태: Art Of Jigsaw 두 손가락 화면 이동 재수정
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 확대된 화면의 제스처를 전체 창에서 수신하고 이동량을 배율 변화와 분리해 반영한다.

## 마지막 완료 작업

AOJ의 두 손가락 화면 이동 제스처 수신 위치와 이동 계산을 수정했다.

## 변경 파일

`art-of-jigsaw/bridge.js`, `art-of-jigsaw/index.html`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

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
