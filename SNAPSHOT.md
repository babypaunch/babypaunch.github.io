# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-11
- 상태: Art Of Jigsaw 사이트 연동 준비 및 운영 웹 인증 설정 확인 중
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 사이트의 `/art-of-jigsaw/` 정적 게임과 한·영 홈 진입 링크를 준비했다. 공개 주소에서 로그인과 퍼즐을 사용하려면 운영 OAuth 리디렉션 및 PocketBase·Access Gate의 웹 출처 설정이 필요하다.

## 마지막 완료 작업

게임 웹 빌드를 사이트에 복사하고, 한·영 앱 목록에 게임 진입 링크를 추가했다.

## 변경 파일

`art-of-jigsaw/`, `_data/ko.yml`, `_data/en.yml`, `_includes/app-groups.html`, `_tests/app-groups.test.js`, `_tests/site-quality.test.js`, `README.md`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 3.8 빌드 성공. 앱 목록, 사이트 품질 검사 62개 페이지, 블로그 태그 검사가 통과했다. Jekyll 산출물의 게임 파일 해시가 복사한 원본과 일치했다. 공개 주소의 로그인·게임 플레이 및 브라우저 화면은 검증하지 않았다.

## 차단 요소

현재 공개 인증 API에는 `https://babypaunch.com` CORS 허용 헤더가 없고 Access Gate의 해당 출처 OPTIONS 요청은 405다. Google OAuth 웹 리디렉션 설정도 확인·반영해야 한다.

## 다음 작업 하나

운영 웹 인증·API 출처 설정을 반영한 뒤 공개 게임 주소에서 로그인과 퍼즐 생성 경로를 검증한다.

## 사용자에게 필요한 작업

운영 변경 대상 서버와 OAuth 클라이언트 구성 확인이 필요하다.

## 경고

정적 파일의 사이트 빌드 성공은 실제 Google 로그인·퍼즐 생성 검증 완료를 의미하지 않는다.
