# BabyPaunch

`https://babypaunch.github.io`에서 제공되는 BabyPaunch 공식 사이트입니다.

## 로컬 확인

저장소 루트에서 Jekyll 결과물을 생성합니다. 로컬 Ruby 환경에 의존하지 않도록 Docker를 사용합니다.

```powershell
docker run --rm -v "${PWD}:/srv/jekyll" -w /srv/jekyll jekyll/jekyll:3.8 jekyll build
python -m http.server 8000 --directory _site
```

`http://localhost:8000`에서 확인할 수 있습니다. GitHub Pages는 `main` 브랜치의 Jekyll 소스를 자동으로 빌드하고 배포합니다.

## 검색 및 정책

- `/robots.txt`: 검색 로봇 접근 규칙과 sitemap 위치
- `/sitemap.xml`: 공개 페이지와 블로그 글의 검색 색인 목록
- `/privacy/`, `/en/privacy/`: BabyPaunch 웹사이트 한영 개인정보처리방침

공통 SEO 메타데이터는 `_includes/seo.html`에서 관리합니다. Google AdSense 또는 분석 도구를 도입할 때는 광고 코드를 적용하기 전에 한영 개인정보처리방침을 함께 갱신합니다.

## 언어 구조

- `/`: 한국어
- `/en/`: English

페이지 구조는 `_layouts`, 공통 헤더와 푸터는 `_includes`, 언어별 문구는 `_data/ko.yml`과 `_data/en.yml`에서 관리합니다. 두 언어 페이지는 루트의 `styles.css`를 공통으로 사용합니다.

## 음악 추가

새 음악은 `_data/music.yml`에 항목을 추가합니다. `slug`, `title`, `youtube_id`, `spotify_id`를 입력하면 `/music/`과 `/en/music/`에 함께 표시됩니다.
