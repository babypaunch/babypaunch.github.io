# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-19 KST
- 상태: 소스·빌드 검증됨, Pages 빌드 완료
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: Battle Gate 개인정보 안내 팝업용 임베드 표시를 중앙 정책 페이지에 추가했다. 일반 정책 URL의 본문과 메타데이터는 유지하고, 임베드에서만 사이트 헤더·푸터·분석 동의창을 숨긴다. 공개 반영과 실제 화면 확인은 아직 미검증이다.

## 마지막 완료 작업

- Battle Gate 한국어·영어 정책 페이지를 iframe에서 열 때만 본문 중심의 임베드 표시를 활성화했다.
- 임베드 표시에서 분석 동의창이 내부 스크롤을 막지 않도록 초기화를 건너뛰고, 정책 본문 폭·여백·글자 크기를 조정했다.

## 변경 파일

- `_layouts/default.html`, `styles.css`, `analytics-consent.js`, `_tests/site-quality.test.js`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 3.8 빌드와 `node _tests/site-quality.test.js` 65페이지 통과.
- 렌더된 한·영 정책에 임베드 감지 코드가 포함되고 공통 CSS 및 분석 초기화 분기가 있는지 확인했다. 브라우저 렌더링은 이번 요청 범위에서 확인하지 않았다.

## 차단 요소

- GitHub Pages 정적 배포에서는 요청마다 다른 nonce를 생성할 수 없다. Google의 AdSense 엄격 CSP 안내는 동적 nonce와 응답 헤더를 전제로 한다.

## 다음 작업 하나

- 호스팅·프록시에서 요청별 nonce를 제공할 수 있게 되면 AdSense와 함께 엄격 CSP를 시험 적용한다.

## 사용자에게 필요한 작업

- 없음.

## 경고

- 현재 메타 정책은 `frame-ancestors`를 지원하지 않으며 인라인 스크립트 실행을 허용한다. 완전한 XSS 차단 정책이라고 간주하지 않는다.
