# BabyPaunch

`https://babypaunch.com`에서 제공되는 BabyPaunch 공식 사이트입니다.

## 로컬 확인

저장소 루트에서 Jekyll 결과물을 생성합니다. 로컬 Ruby 환경에 의존하지 않도록 Docker를 사용합니다.

```powershell
docker run --rm -v "${PWD}:/srv/jekyll" -w /srv/jekyll jekyll/jekyll:3.8 jekyll build
node _tests/blog-tags.test.js
node _tests/site-quality.test.js
python -m http.server 8000 --directory _site
```

`http://localhost:8000`에서 확인할 수 있습니다. GitHub Pages는 `main` 브랜치의 Jekyll 소스를 자동으로 빌드하고 배포합니다.

## 검색 및 정책

- `/robots.txt`: 검색 로봇 접근 규칙과 sitemap 위치
- `/sitemap.xml`: 공개 페이지와 블로그 글의 검색 색인 목록
- `/policies/`, `/en/policies/`: 프로젝트별 정책 허브
- `/policies/<project>/<document>/`: 프로젝트별 한국어 정책 문서
- `/en/policies/<project>/<document>/`: 프로젝트별 영문 정책 문서

정책 허브의 프로젝트와 문서 목록은 `_data/policies.yml`에서 관리합니다. 정책 본문은 해당 프로젝트 폴더에 둡니다. 공통 SEO 메타데이터는 `_includes/seo.html`에서 관리합니다. Google AdSense 또는 분석 도구를 도입할 때는 광고 코드를 적용하기 전에 한영 개인정보처리방침을 함께 갱신합니다.

## 새 글 접근성·SEO 체크리스트

- 한영 글에 서로를 가리키는 `alternate_ko`, `alternate_en`, `language_url`을 작성합니다.
- 모든 글에 고유한 `title`, `description`, `permalink`를 작성합니다.
- 대표 이미지가 있으면 `image`와 같은 언어의 `image_alt`를 함께 작성합니다.
- 본문 이미지는 의미를 설명하는 `alt`, 실제 `width`와 `height`, `loading="lazy"`를 사용합니다.
- iframe에는 내용을 구분하는 `title`과 `loading="lazy"`를 사용합니다.
- 제목은 `h1` 다음 `h2` 순서로 건너뛰지 않고 작성합니다.
- 링크 문구만 읽어도 목적지를 알 수 있게 작성하고, 새 창 링크에는 `rel="noopener noreferrer"`를 사용합니다.
- 새 태그는 `_data/ko.yml`과 `_data/en.yml`에 함께 등록합니다.
- 발행 전 Jekyll 빌드 후 `_tests`의 두 Node 검사를 실행합니다.

접근성 목표와 알려진 제한 사항은 `/policies/babypaunch/accessibility/`와 `/en/policies/babypaunch/accessibility/`에서 공개합니다.

## 언어 구조

- `/`: 한국어
- `/en/`: English

페이지 구조는 `_layouts`, 공통 헤더와 푸터는 `_includes`, 언어별 문구는 `_data/ko.yml`과 `_data/en.yml`에서 관리합니다. 두 언어 페이지는 루트의 `styles.css`를 공통으로 사용합니다.

## 음악 추가

새 음악은 `_data/music.yml`에 항목을 추가합니다. `slug`, `title`, `youtube_id`, `spotify_id`를 입력하면 `/music/`과 `/en/music/`에 함께 표시됩니다.
