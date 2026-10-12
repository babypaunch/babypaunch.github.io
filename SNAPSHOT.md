# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-12
- 상태: Art Of Jigsaw 운영 웹 인증·API 연결 반영, 사이트 게시 준비
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 사이트의 `/art-of-jigsaw/` 정적 게임과 한·영 홈 진입 링크를 준비했다. Google 웹 OAuth 클라이언트를 발급하고 외부 사용자에게 게시했으며, 운영 PocketBase와 Access Gate에 웹 출처를 설정했다. 실제 브라우저 로그인과 퍼즐 조작은 아직 확인하지 않았다.

## 마지막 완료 작업

게임 웹 빌드를 사이트에 복사하고 한·영 앱 목록에 게임 진입 링크를 추가했다. 운영 인증 API에서 `google`과 `google_web` 공급자 및 사이트 CORS 응답, 퍼즐 API의 허용 출처 OPTIONS 204를 확인했다.

## 변경 파일

`art-of-jigsaw/`, `_data/ko.yml`, `_data/en.yml`, `_includes/app-groups.html`, `_tests/app-groups.test.js`, `_tests/site-quality.test.js`, `README.md`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 3.8 빌드 성공. 앱 목록, 사이트 품질 검사 62개 페이지, 블로그 태그 검사가 통과했다. Jekyll 산출물의 게임 파일 해시가 복사한 원본과 일치했다. 공개 주소의 로그인·게임 플레이 및 브라우저 화면은 검증하지 않았다.

## 차단 요소

사이트 게시 후 실제 Google 로그인부터 퍼즐 생성까지의 사용자 흐름 검증이 필요하다.

## 다음 작업 하나

사이트를 게시하고 공개 정적 자산을 확인한다.

## 사용자에게 필요한 작업

브라우저 로그인·게임 동작 검증을 별도로 요청하면 사용자 화면 흐름까지 확인할 수 있다.

## 경고

공개 API의 CORS·인증 공급자 검증은 실제 Google 로그인·퍼즐 생성 검증과 다르다.
