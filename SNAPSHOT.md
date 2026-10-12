# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-13
- 상태: Art Of Jigsaw Android 전체 화면 연결 선언 게시 완료
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: AOJ Android 디버그 APK의 서명 지문을 Digital Asset Links에 선언해 Chrome이 게임 사이트를 Trusted Web Activity로 검증할 수 있게 했다.

## 마지막 완료 작업

AOJ Android 앱과 사이트의 연결을 위한 `/.well-known/assetlinks.json`을 추가했다.

## 변경 파일

`_config.yml`, `.well-known/assetlinks.json`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 빌드에서 `_site/.well-known/assetlinks.json` 생성 확인. 사이트 품질 검사 62페이지 통과. GitHub Pages 빌드 완료, 공개 URL HTTP 200 및 Google Digital Asset Links API의 앱 서명 연결 결과 확인. 기기 화면은 확인하지 않았다.

## 차단 요소

없음.

## 다음 작업 하나

AOJ Android 기기 화면에서 주소창 없는 전체 화면 전환을 확인한다.

## 사용자에게 필요한 작업

없음.

## 경고

Digital Asset Links에는 현재 개인 테스트용 디버그 인증서만 등록했다. Play 배포 때는 해당 서명 지문을 추가해야 한다.
