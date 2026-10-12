# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-12
- 상태: Art Of Jigsaw 로더·게임 데이터 일치 수정, 재게시 준비
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 웹 게임 데이터는 영문·한글 나눔고딕과 새 버튼 배치를 포함하지만 기존 사이트의 `game.js`가 이전 데이터 크기·캐시 식별자를 유지해 브라우저가 구버전 게임을 읽을 수 있었다. `game.js`, `game.data`, `index.html`을 같은 빌드로 교체하고 URL 버전을 지정했다. Access Gate의 Met 이미지 경로는 운영에서 정상 응답한다.

## 마지막 완료 작업

웹 게임 로더와 데이터를 같은 빌드로 교체하고 재발 방지 검사를 추가했다.

## 변경 파일

`art-of-jigsaw/index.html`, `art-of-jigsaw/game.js`, `art-of-jigsaw/game.data`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 빌드와 앱 목록·사이트 품질 검사가 통과했다. 사이트 검사는 `game.js`에 기록된 데이터 크기와 실제 `game.data` 크기, HTML·로더의 URL 버전 일치를 확인한다. 실제 화면 조작은 미검증이다.

## 차단 요소

없음.

## 다음 작업 하나

새 로더 묶음을 게시하고 공개 파일의 버전을 확인한다.

## 사용자에게 필요한 작업

없음.

## 경고

새 UI와 Art 가져오기의 화면 조작 검증은 수행하지 않았다.
