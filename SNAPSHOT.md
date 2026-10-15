# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-15 KST
- 상태: 검증됨
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ 손가락 이동 시 확대 배율 파일 읽기의 다중 반환값 때문에 발생하는 tonumber 오류를 수정한 웹 빌드를 동기화했다.

## 마지막 완료 작업

- 실제 파일 API의 반환 형태로 오류를 재현한 후 수정한 game.data·game.js·index.html을 같은 빌드로 교체했다.
- AOJ 원본에서 생성한 game.data·game.js와 HTML·브리지·탐색 모듈·CSS를 반영했다.
- 한국어·영어 디자인 카탈로그에 미니맵 미리보기를 반영했다.

## 변경 파일

- `art-of-jigsaw/{game.data,game.js,index.html,bridge.js,navigation.mjs,view-controls.css}`, `_layouts/design.html`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

- 이번 수정은 AOJ touch_input·web_viewport 회귀 검사와 웹 빌드가 통과했다. 브라우저 실행 검증은 아직 수행하지 않았다.
- Docker Jekyll 빌드 후 사이트 품질 검사 62페이지 통과. 앱 그룹 검사 통과.
- AOJ 원본에서 입력·좌표·카운팅 자동 검사와 웹·Android 0.4.0 빌드 통과.
- 브라우저 화면 검사와 실기기 조작감 검증은 수행하지 않았다. Pages는 main push 후 자동 게시한다.

## 차단 요소

- 사용자 폰이 USB 목록에 없어 0.4.0 설치는 대기 중이다.

## 다음 작업 하나

- 사용자 폰에서 새 조작 방식의 실제 사용 결과를 받는다.

## 사용자에게 필요한 작업

- 웹을 새로고침하거나 0.4.0 APK를 설치한 뒤 조작감을 확인한다.

## 경고

- Digital Asset Links에는 개인 테스트용 디버그 인증서가 등록되어 있다. Play 배포 시 해당 서명 지문을 추가해야 한다.
