# 프로젝트 스냅샷

- 최종 갱신일: 2026-10-06
- 상태: 블로그 신규 글 공개 반영 확인
- 기준 브랜치: `main`
- 기준 commit: `main` (이번 변경 전 기준)
- 현재 판단: Rehearsal MP3 Player 제작기를 한국어·영어 블로그에 게시했다. Google Play 프로덕션 출시는 대한민국 대상 심사 중이며, 글도 앱 공개 완료로 표현하지 않았다. 로컬 Jekyll 빌드와 번역·사이트 검사를 통과했고 공개 URL 두 곳에서 HTTP 200과 제목을 확인했다.

## 마지막 완료 작업

- 사용자의 듣기·반복 연습 경험, 외국어 학습에 노래를 권하는 이유, 노래 애드립으로 이어지는 연습 과정을 중심으로 한·영 블로그 글을 작성했다. Start/End와 Fade-In/Fade-Out, Google Play 등록 과정과 현재 심사 상태를 간결하게 담았다.
- 앱 버전 1.1.1부터 생년월일 원문을 보관하지 않고 성인 여부만 기기에 저장하며 미성년·미응답자에게 광고를 요청하지 않는다는 설명을 한·영 정책에 추가했다.
- 최종 개정일과 개정 이력을 2026년 10월 6일로 갱신했다.

## 변경 파일

- `_posts/2026-10-06-rehearsal-mp3-player.md`, `_posts/2026-10-06-rehearsal-mp3-player-en.md`, `SNAPSHOT.md`.

## 검증 결과

- Docker Jekyll 3.8 빌드 성공.
- `node _tests/article-translation.test.js`: 13개 한·영 게시물 쌍 통과.
- `node _tests/site-quality.test.js`: 57개 생성 페이지 검사 통과.
- `node _tests/blog-tags.test.js` 통과.
- GitHub Pages가 게시물 commit `7ed72a5`를 `built`로 표시했고 한국어·영어 공개 URL이 HTTP 200으로 응답했다.
- 브라우저 화면 검사는 수행하지 않았다.

## 차단 요소

- Google Play 프로덕션 심사가 끝나지 않아 글에 앱 공개 링크를 넣지 않았다.

## 다음 작업 하나

- Google Play 앱 공개가 확인되면 글의 심사 상태 문장과 스토어 링크를 갱신한다.

## 사용자에게 필요한 작업

- 새 글을 읽고 주관적인 문장과 개인 경험 표현을 검토한다.

## 경고

- Google Play 심사 제출은 앱 공개 완료를 뜻하지 않는다. 실제 공개가 확인되면 글의 상태 문장과 스토어 링크를 갱신해야 한다.
