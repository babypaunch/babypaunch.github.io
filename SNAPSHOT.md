# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-12
- 상태: Art Of Jigsaw Met 이미지 CORS 및 한·영 UI 빌드 검증 완료, 게시 전
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 기존 공개 게임의 Art import는 Met 이미지 직접 요청이 CORS에 막힌다. Access Gate 전용 경로를 사용하는 브리지와 한·영 UI·공통 버튼 스타일이 포함된 새 게임 빌드를 준비했다. 서버 경로와 사이트 수정본은 아직 운영에 반영하지 않았다.

## 마지막 완료 작업

`art-of-jigsaw/`의 게임 아카이브와 브리지를 새 웹 빌드로 교체했다.

## 변경 파일

`art-of-jigsaw/bridge.js`, `art-of-jigsaw/game.data`, `art-of-jigsaw/game.js`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 3.8 빌드, 앱 목록과 사이트 품질 검사 62개 페이지가 통과했다. 사이트 게임 데이터와 웹 빌드 파일의 해시가 일치한다. 운영 Art import와 실제 화면 조작은 미검증이다.

## 차단 요소

Access Gate 이미지 경로 배포가 먼저 필요하다.

## 다음 작업 하나

서버 이미지 경로 배포 후 사이트를 게시하고 HTTP로 Met JPEG를 확인한다.

## 사용자에게 필요한 작업

운영 배포 절차의 최종 승인이 필요하다.

## 경고

서버 이미지 경로와 사이트 브리지를 함께 배포해야 Art import가 복구된다. 새 UI의 시각 검증은 수행하지 않았다.
