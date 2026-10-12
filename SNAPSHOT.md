# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-13
- 상태: Art Of Jigsaw 모바일 입력·가로 화면 게시 및 에뮬레이터 실행 확인, anydocs 공개 방침 갱신
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ 모바일 가로 화면은 원래 게임 비율을 너비에 맞춰 유지하고, 터치 조작 및 넘치는 세로 영역 이동을 지원한다. anydocs 공개 방침에는 1.5.0의 편집본 저장과 광고 개인정보 설정 버튼 위치를 반영했다.

## 마지막 완료 작업

anydocs 개인정보처리방침의 한국어·영어 페이지를 앱 1.5.0 기능에 맞게 갱신했다.
AOJ 모바일 조각 이동 터치 처리를 보완하고 웹 빌드를 갱신했다.

## 변경 파일

`policies/anydocs/privacy/index.html`, `en/policies/anydocs/privacy/index.html`, `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `art-of-jigsaw/index.html`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 빌드와 사이트 품질 검사 62페이지 통과. anydocs 공개 URL 반영은 push 후 확인한다.
- AOJ Android 35 에뮬레이터에서 가로 방향·주소창 없는 전체 화면·게임 로딩·로그인 버튼 터치를 확인했다. 퍼즐 조각 이동은 로그인 전이라 미검증이다.

## 차단 요소

없음.

## 다음 작업 하나

테스트 계정으로 로그인한 AOJ Android 에뮬레이터에서 조각 이동을 확인한다.

## 사용자에게 필요한 작업

없음.

## 경고

Digital Asset Links에는 현재 개인 테스트용 디버그 인증서만 등록했다. Play 배포 때는 해당 서명 지문을 추가해야 한다.
