# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-21 KST
- 상태: 검증됨
- 기준 브랜치: main
- 기준 commit: 이 문서를 포함한 main 커밋
- 현재 판단: Color Jamo 공개 배포와 CSS 버전 URL 적용까지 확인했다.

## 마지막 완료 작업

- assets/fonts/color-jamo/v1.0/에 WOFF2·CSS·JS·이용 조건·Koroman MIT 고지·해시 7개 파일을 추가했다.
- 한영 정책, 정책 허브, SEO 문구, 실제 폰트 사용 예와 JS API 사용법을 연결했다.
- 한영 /design에 공용 CSS를 사용하는 고대비·검정색 예시를 추가했다.
- 기존 개인적·비상업적 이용 조건을 유지하고 최초 공개일은 2026-10-21로 설정했다.

## 변경 파일

- assets/fonts/color-jamo/v1.0/, policies/color-jamo/license/, en/policies/color-jamo/license/
- _data/policies.yml, _data/ko.yml, _data/en.yml, _layouts/design.html
- _tests/site-quality.test.js, _tests/color-jamo.test.js, THIRD_PARTY_NOTICES.md

## 검증 결과

- Docker Jekyll 3.8 빌드 통과.
- 전체 Node 검사 6종 통과: 77페이지 품질, 번역 15쌍, 공개 자산 6개 해시와 JS API, 한영 정책 구조 및 /design 예시 확인.
- 공개 묶음은 지정한 7개 파일만 포함하며 TTF·제작 원본·편집기는 포함하지 않는다.
- git diff --check 통과.
- 공개 commit ca5b557211d314aa76e582105b483c4ca9155479 Pages built. 한영 정책 및 WOFF2·JS·라이선스·해시 HTTP 200 및 내용 일치 확인. WOFF2 MIME은 font/woff2, CORS는 *다.
- CSS는 배포 직전 404가 CDN에 남아 ?v=20261021 URL로 확인했고 모든 공개 사용 예에 같은 URL을 적용했다.

- 최종 콘텐츠 commit 9d8f1e7d0c2ccd139b1015280547d6702fc2b4d6 Pages built. 한영 페이지에서 CSS 버전 URL 적용, 해당 CSS HTTP 200과 원본 바이트 일치 확인.

## 차단 요소

- 없음.

## 다음 작업 하나

- 다음 공개 자산 갱신 시 버전 URL·해시·한영 사용 예를 함께 갱신한다.

## 사용자에게 필요한 작업

- 없음. Color Jamo 검토 후 모든 수정과 배포를 승인받았다.

## 경고

- 브라우저 화면과 캡처는 수행하지 않았다. 고대비 팔레트는 브라우저 지원 여부에 따라 원래 색으로 표시될 수 있다.
- 폰트 사용 조건과 Koroman MIT 이용 조건은 별개다.
