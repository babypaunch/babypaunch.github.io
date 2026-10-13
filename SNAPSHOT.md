# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-14 KST
- 상태: 검증됨
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ의 확대·화면 이동·탭 배치를 분리한 웹 빌드를 반영했다. 이동 모드만 드래그 이동을 허용하며 후보 반환은 이동 횟수를 늘리지 않는다.

## 마지막 완료 작업

- AOJ 빌드의 game.data·game.js·index.html·bridge.js·view-controls.css를 동기화했다. 고정 이동 버튼은 확대 화면 밖으로 사라지지 않는다.
- 기존 한·영 /design 카탈로그에 운영 버튼의 동일 CSS를 사용하는 이동 모드 켜짐·꺼짐 미리보기를 추가했다.

## 변경 파일

- `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `art-of-jigsaw/index.html`, `art-of-jigsaw/bridge.js`, `art-of-jigsaw/view-controls.css`, `_layouts/design.html`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 빌드 후 사이트 품질 검사 62페이지, 한·영 버튼 카탈로그와 CSS 파일 검사, 앱 그룹 검사가 통과했다.
- AOJ 원본 저장소에서 퍼즐 횟수·터치·Windows 이동 모드·웹 제스처·뷰포트·기록 검사와 웹·Android 빌드가 통과했다.
- 브라우저 화면 검사와 시각 검증은 수행하지 않았다. Pages는 main push 후 자동 게시한다.

## 차단 요소

- 없음.

## 다음 작업 하나

- 사용자의 폰에서 새 이동 모드와 탭 배치 조작감 확인 결과를 받는다.

## 사용자에게 필요한 작업

- 0.3.5 앱을 다시 열어 조작을 확인한다.

## 경고

- Digital Asset Links에는 개인 테스트용 디버그 인증서가 등록되어 있다. Play 배포 시 해당 서명 지문을 추가해야 한다.
