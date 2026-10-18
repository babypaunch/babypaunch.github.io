# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-19 KST
- 상태: 소스·빌드 검증됨, Pages 빌드 완료
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: 공통 Jekyll 페이지에 정적 CSP 메타 정책을 추가해 객체 삽입과 base URL 변조를 제한했다. Google AdSense 때문에 스크립트 정책은 인라인과 HTTPS 외부 스크립트를 허용한다.

## 마지막 완료 작업

- 공통 레이아웃에 CSP 메타 정책을 추가했다.
- 생성된 일반 페이지에 정책이 포함되는지 사이트 품질 검사에 추가했다.

## 변경 파일

- `_layouts/default.html`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 3.8 빌드와 `node _tests/site-quality.test.js` 65페이지 통과.
- GitHub Pages가 이 변경의 commit을 `built`로 보고했다. 브라우저 렌더링과 실제 공개 응답 헤더는 확인하지 않았다.
- CSP는 공통 Jekyll 레이아웃에 적용되며 독립 Art Of Jigsaw 게임 HTML에는 적용되지 않는다.
- 공개 응답 헤더, 실제 광고·분석 동작, 브라우저 렌더링은 이번 작업에서 확인하지 않았다.

## 차단 요소

- GitHub Pages 정적 배포에서는 요청마다 다른 nonce를 생성할 수 없다. Google의 AdSense 엄격 CSP 안내는 동적 nonce와 응답 헤더를 전제로 한다.

## 다음 작업 하나

- 호스팅·프록시에서 요청별 nonce를 제공할 수 있게 되면 AdSense와 함께 엄격 CSP를 시험 적용한다.

## 사용자에게 필요한 작업

- 없음.

## 경고

- 현재 메타 정책은 `frame-ancestors`를 지원하지 않으며 인라인 스크립트 실행을 허용한다. 완전한 XSS 차단 정책이라고 간주하지 않는다.
