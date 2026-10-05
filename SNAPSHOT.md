# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-06
- 상태: 공개 반영 확인
- 기준 브랜치: `main`
- 기준 commit: `main` (이번 변경 전 기준)
- 현재 판단: Rehearsal MP3 Player 버전 1.1.1의 연령 확인과 광고 차단 방식을 한국어·영어 공개 개인정보처리방침에 반영했고 두 공개 URL에서 HTTP 200과 새 내용을 확인했다. 앱의 새 버전은 아직 Play에 제출되지 않았다.

## 마지막 완료 작업

- 앱 버전 1.1.1부터 생년월일 원문을 보관하지 않고 성인 여부만 기기에 저장하며 미성년·미응답자에게 광고를 요청하지 않는다는 설명을 한·영 정책에 추가했다.
- 최종 개정일과 개정 이력을 2026년 10월 6일로 갱신했다.

## 변경 파일

- `policies/rehearsal-mp3-player/privacy/index.html`, `en/policies/rehearsal-mp3-player/privacy/index.html`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 3.8 빌드 성공.
- `node _tests/site-quality.test.js`: 55개 생성 페이지 검사 통과. 한·영 렌더 결과에 2026-10-06 개정일과 새 연령 설명이 포함됐다.
- 한국어·영어 공개 URL 모두 HTTP 200이며 `1.1.1`과 새 개정일이 실제 응답에 포함됐다.
- 브라우저 화면 검사는 수행하지 않았다.

## 차단 요소

- 앱 버전 1.1.1은 아직 Play에 제출되지 않았다.

## 다음 작업 하나

- 앱 출시 후 정책과 실제 Play 설치본 동작의 일치 여부를 확인한다.

## 사용자에게 필요한 작업

- Google Play 등록 전에 공개 정책 문구와 Data safety 입력을 최종 검토한다.

## 경고

- 앱의 실기기 검증과 Play Console 제출은 Rehearsal MP3 Player 저장소의 별도 출시 작업이다.
