# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-04
- 상태: 검증됨
- 기준 브랜치: `main`
- 기준 commit: `2c5ef8e` (이번 변경 전 기준)
- 현재 판단: Rehearsal MP3 Player의 한·영 개인정보처리방침을 새 이름과 URL로 갱신하고 기존 URL의 이동 페이지를 준비했다. 로컬 Jekyll 빌드와 정책 검사를 통과했다.

## 마지막 완료 작업

- 정책 본문과 메타데이터, 정책 모음 링크를 Rehearsal MP3 Player에 맞췄다.
- 기존 정책 주소의 한·영 이동 페이지를 추가했다.

## 변경 파일

- `policies/rehearsal-mp3-player/privacy/index.html`, `en/policies/rehearsal-mp3-player/privacy/index.html` 및 옛 주소 이동 페이지.
- `_data/policies.yml`, `_data/ko.yml`, `_data/en.yml`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 3.8 빌드 성공.
- `node _tests/site-quality.test.js`: 55개 생성 페이지 검사 통과. 기존 주소의 이동 경로도 확인했다.
- 브라우저 화면 검사는 수행하지 않았다.

## 차단 요소

- GitHub Pages 반영 상태는 push 후 확인해야 한다.

## 다음 작업 하나

- 새 공개 정책 URL의 Pages 반영 상태를 확인한다.

## 사용자에게 필요한 작업

- Google Play 등록 전에 공개 정책 문구와 Data safety 입력을 최종 검토한다.

## 경고

- 실제 AdMob 운영 ID, 기기 테스트, Play Console 입력은 Rehearsal MP3 Player 저장소의 별도 출시 작업이다.
