# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-11
- 상태: 로컬 검증 완료, 공개 응답 확인 대기
- 기준 브랜치: main
- 기준 commit: 이번 BabyPaunch Account 정책 commit
- 현재 판단: Google OAuth 브랜딩에 연결할 BabyPaunch Account 한·영 개인정보처리방침을 준비했다. Art Of Jigsaw 온라인 로그인·퍼즐 요청에서 실제 처리하는 정보와 로컬 이미지·기록의 범위를 설명한다.

## 마지막 완료 작업

BabyPaunch Account 정책 두 페이지, 언어별 메타데이터, 정책 허브 등록과 사이트 품질 검사를 추가했다.

## 변경 파일

`policies/babypaunch-account/privacy/index.html`, `en/policies/babypaunch-account/privacy/index.html`, `_data/ko.yml`, `_data/en.yml`, `_data/policies.yml`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 3.8 빌드 성공. 사이트 품질 검사 61개 페이지 통과. 브라우저 화면 검사와 캡처는 하지 않았다.

## 차단 요소

Google OAuth 테스트 사용자 추가는 사용자 확인을 기다리고 있다. 사이트의 공개 HTTP 응답은 push 후 확인해야 한다.

## 다음 작업 하나

정책 공개 URL을 확인하고 Google OAuth 브랜딩에 연결한다.

## 사용자에게 필요한 작업

Google Cloud `shared-pocketbase-2026` OAuth 테스트 사용자에 `babypaunch@gmail.com`을 추가하는 작업의 승인이 필요하다.

## 경고

정책 공개와 OAuth 브랜딩 준비는 실제 Google 로그인·퍼즐 생성 검증 완료를 의미하지 않는다.
