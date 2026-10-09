# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-09
- 상태: 검증됨
- 기준 브랜치: main
- 기준 commit: 기존 main에서 시작한 anydocs 정책 공개 commit. 실제 hash는 `git log -1`로 확인한다.
- 현재 판단: 사용자가 승인한 anydocs 한·영 개인정보처리방침을 공개 소스에 추가했다. 문서 로컬 처리, 하단 AdMob 배너, UMP 동의 및 삭제 안내를 명시한다. 앱의 Play 공개 완료를 의미하지 않는다.

## 마지막 완료 작업

anydocs 정책 두 페이지, 언어별 SEO 메타데이터와 정책 허브 등록을 추가하고 사이트 품질 검사에 연결했다.

## 변경 파일

`policies/anydocs/privacy/index.html`, `en/policies/anydocs/privacy/index.html`, `_data/ko.yml`, `_data/en.yml`, `_data/policies.yml`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

Docker Jekyll 3.8 빌드 성공. 사이트 품질 검사 59개 페이지 통과. 기존 공용 정책 레이아웃을 사용했으며 브라우저 화면 검사와 캡처는 하지 않았다.

## 차단 요소

로컬 검증에 차단 요소 없음. 공개 반영은 push 후 GitHub Pages 및 공개 HTTP 응답으로 확인한다.

## 다음 작업 하나

한·영 공개 URL의 배포 완료를 확인한다.

## 사용자에게 필요한 작업

없음. 정책 공개는 현재 요청에서 승인받았다.

## 경고

앱 등록·광고 설정·심사 제출·공개 상태는 anydocs 저장소에서 따로 기록한다.
