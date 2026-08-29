---
layout: post
locale: ko
page_key: blog
title: 검색에 안 보이면 안전할까? 공개 GitHub Pages 보안 점검기
description: SEO 점검에서 시작해 공개 GitHub Pages 저장소의 내부 파일과 Git 이력, 외부 요청, Cloudflare HSTS와 GitHub 계정 보안을 확인한 과정.
category: Making
date: 2026-08-29 14:30:00 +0900
last_modified_at: 2026-08-29 14:30:00 +0900
permalink: /blog/github-pages-public-repository-security/
language_url: /en/blog/github-pages-public-repository-security/
alternate_ko: /blog/github-pages-public-repository-security/
alternate_en: /en/blog/github-pages-public-repository-security/
tags:
  - github-pages
  - seo
  - custom-domain
  - project-policies
---

SEO를 정리하면서 검색 결과에 어떤 페이지가 나타나는지 확인하다가 한 가지가 마음에 걸렸다.

내 사이트에 보이지 않는 파일이라도 공개 GitHub 저장소에서는 누구나 읽을 수 있다는 점이었다.

개발 지침, 작업 상태, 조사 메모처럼 사이트 방문자에게 보여 줄 필요가 없는 파일도 저장소 안에 들어가 있었다.

처음에는 `.gitignore`에 넣으면 해결될 걸로 착각하고 있었다.

하지만 공개 범위를 제대로 나누려면 `.gitignore`, Git 추적 상태와 과거 커밋을 각각 따로 봐야 했다.

내부 파일을 정리한 뒤에는 페이지가 연결하는 외부 서비스와 HTTPS 설정도 다시 확인했다.

검색 노출을 점검하다 시작한 일이 결국 저장소, 개인정보처리방침, 전송 보안과 GitHub 계정 보안까지 이어졌다.

## 먼저 두 가지 공개 경로를 구분해야 했다

GitHub Pages 프로젝트에는 서로 다른 두 개의 공개 경로가 있다.

첫 번째는 방문자가 보는 GitHub Pages 웹사이트다.

두 번째는 웹사이트의 원본이 들어 있는 공개 GitHub 저장소다.

Jekyll 빌드 결과에서 빠진 파일은 사이트 주소로 열리지 않을 수 있다.

그렇더라도 해당 파일이 Git에 커밋되어 있다면 GitHub 저장소 화면이나 `raw.githubusercontent.com` 주소에서는 읽을 수 있다.

검색 엔진에 노출되지 않는 것과 외부에서 접근할 수 없는 것도 서로 다른 이야기다.

`robots.txt`, sitemap 제외와 `noindex`는 검색 엔진에 대한 요청일 뿐 파일을 비공개로 만드는 보안 장치가 아니다.

주소를 아는 사람이 파일을 열 수 있다면 검색 결과에 나오지 않더라도 공개된 파일로 봐야 한다.

## `.gitignore`가 해결하는 범위

`.gitignore`는 아직 Git이 추적하지 않는 파일이 새로 커밋되는 것을 막는다.

이미 한 번 커밋한 파일은 나중에 `.gitignore`에 이름을 추가해도 계속 추적된다.

따라서 다음 설정만 추가하고 끝내면 기존 공개 파일은 사라지지 않는다.

```gitignore
# Local AI and internal working files
.local-ai/
.agents/
.codex/
AGENTS.private.md
_research/
```

이미 추적 중인 파일을 현재 브랜치에서 제외하려면 `git rm --cached`가 필요하다.

```powershell
git rm --cached -- AGENTS.private.md
git rm -r --cached -- _research
```

`--cached`를 사용하면 로컬 파일은 남겨 두고 Git의 추적 대상에서만 제거할 수 있다.

이후 `.gitignore`에 같은 경로가 들어 있어야 다음 커밋에서 다시 추가되는 실수를 막을 수 있다.

## Jekyll의 `exclude`도 함께 필요했다

`.gitignore`는 Git을 위한 설정이다.

Jekyll이 로컬 작업 폴더를 빌드할 때 어떤 파일을 결과물에서 제외할지는 `_config.yml`의 `exclude`로 관리하는 편이 명확하다.

```yaml
exclude:
  - AGENTS.private.md
  - _research
  - .agents
  - .codex
```

GitHub Pages 서버에는 커밋되지 않은 파일이 전달되지 않는다.

그러나 로컬 빌드와 다른 배포 환경까지 생각하면 Git 제외와 Jekyll 제외를 둘 다 두는 것이 안전하다.

이번 작업에서도 내부 파일은 로컬에서 계속 사용할 수 있게 남겨 두고 Git과 Jekyll 양쪽에서 제외했다.

## 무엇을 비공개로 돌릴지 먼저 분류했다

파일 이름에 `AI`가 들어간 것만 찾으면 내부 자료를 놓칠 수 있다.

그래서 현재 추적 파일과 과거 커밋에 등장한 경로를 모두 확인했다.

```powershell
git ls-files
git log --all --name-only --pretty=format:
```

현재 작업 트리에서는 숨김 폴더와 루트 문서도 함께 확인했다.

```powershell
Get-ChildItem -Force
git status --short --branch
```

분류 기준은 파일이 웹서비스의 실행, 배포, 품질 검증 또는 라이선스 준수에 필요한지였다.

개발 지침, 디자인 도구 설정과 글을 준비하면서 만든 조사 메모는 내부 작업 자료로 분류했다.

반면 저장소 사용법을 설명하는 문서, 자동 테스트와 제3자 라이선스 고지는 웹서비스를 유지하는 데 필요한 자료로 판단해 남겼다.

무조건 많이 숨기는 것보다 각 파일의 역할을 먼저 판단하는 과정이 중요했다.

오픈소스 자산의 라이선스 고지처럼 공개 상태를 유지해야 하는 문서까지 내부 파일로 오해하면 다른 문제가 생길 수 있기 때문이다.

## 민감정보가 들어 있는지도 별도로 검사했다

내부 문서와 비밀정보는 같은 말이 아니다.

공개할 필요가 없는 작업 메모에는 비밀번호가 없을 수도 있다.

반대로 평범한 설정 파일 안에 API 키나 토큰이 들어 있을 수도 있다.

그래서 추적 파일 전체에서 다음과 같은 형태를 별도로 찾았다.

```powershell
rg -n -i --hidden --glob '!.git/**' `
  '(api[_-]?key|client[_-]?secret|private[_-]?key|access[_-]?token|password\s*[:=]|bearer\s+[a-z0-9._-]+|-----BEGIN [A-Z ]*PRIVATE KEY-----)' `
  $(git ls-files)
```

이번 대상에서는 키나 토큰 형태의 민감정보가 발견되지 않았다.

만약 실제 비밀번호, API 키, 토큰이나 개인키가 발견됐다면 Git 이력에서 지우는 것만으로 끝내면 안 된다.

이미 외부에서 복사됐을 가능성을 전제로 기존 값을 폐기하고 새 값으로 교체해야 한다.

## 현재 브랜치에서 먼저 제거했다

비공개 대상으로 정한 경로를 `.gitignore`에 추가했다.

그다음 `git rm --cached`로 현재 `main`의 추적 대상에서 제거했다.

```powershell
git rm --cached -- [내부 문서 경로]
git rm -r --cached -- [내부 폴더 경로]
```

제거 직후에는 로컬 파일이 실제로 남아 있는지 확인했다.

```powershell
Test-Path -LiteralPath [내부 문서 경로]
git check-ignore -v [내부 문서 경로]
```

`Test-Path`는 로컬 파일이 보존됐는지 확인하는 데 사용했다.

`git check-ignore`는 어떤 `.gitignore` 규칙이 해당 파일에 적용됐는지 확인하는 데 사용했다.

변경 내용을 일반 커밋으로 push한 뒤 현재 `main`의 GitHub 원문 주소가 `404`인지도 확인했다.

이 단계까지 끝나면 저장소를 평범하게 둘러보는 사람에게 내부 파일이 보이지 않는다.

하지만 과거 커밋의 고정 SHA를 알고 있다면 이전 파일을 여전히 열 수 있었다.

## 과거 커밋에서는 왜 계속 열렸을까

Git은 파일의 현재 상태만 저장하는 시스템이 아니다.

파일을 삭제하는 새 커밋을 만들어도 이전 커밋에는 삭제 전 파일이 그대로 남아 있다.

`.gitignore`와 `git rm --cached`는 앞으로의 추적 상태를 바꿀 뿐 이미 만들어진 커밋을 고치지 않는다.

따라서 과거 이력까지 제거하려면 해당 경로가 한 번도 존재하지 않았던 것처럼 모든 관련 커밋을 다시 만들어야 한다.

이 작업을 Git 이력 재작성이라고 한다.

## 이력 재작성 전에 복구본을 만들었다

이력 재작성은 모든 커밋 ID를 바꾸는 파괴적인 작업이다.

잘못된 경로를 제거하거나 필요한 파일까지 사라지면 원래 상태로 돌아갈 수 있어야 했다.

그래서 저장소 밖의 로컬 백업 폴더에 전체 Git bundle을 만들었다.

```powershell
git bundle create [저장소 밖 백업 파일] --all
git bundle verify [저장소 밖 백업 파일]
```

백업 파일은 공개 저장소 안에 두지 않았다.

`git bundle verify` 결과로 브랜치와 전체 이력이 정상적으로 포함됐는지도 확인했다.

## 모든 커밋에서 내부 경로를 제거했다

현재 환경에는 `git filter-repo`가 설치되어 있지 않았다.

새 도구를 추가하지 않고 Git에 포함된 `filter-branch`를 사용해 대상 경로를 모든 커밋에서 제거했다.

```powershell
$env:FILTER_BRANCH_SQUELCH_WARNING = '1'

git filter-branch --force `
  --index-filter "git rm -r --cached --ignore-unmatch [내부 경로들]" `
  --prune-empty `
  -- main
```

`--index-filter`는 각 커밋을 하나씩 작업 폴더에 체크아웃하지 않고 Git 인덱스에서 대상 경로를 제거한다.

`--ignore-unmatch`는 특정 커밋에 대상 파일이 없더라도 작업을 중단하지 않게 한다.

`--prune-empty`는 내부 파일 제거 결과 아무 변경도 남지 않은 커밋을 정리한다.

처리가 끝난 뒤 새 `main` 이력에서 내부 경로가 한 번도 나타나지 않는지 다시 검사했다.

```powershell
git log main --format='%H' -- [내부 경로들]
git rev-list main --objects
```

첫 번째 명령은 대상 경로와 관련된 커밋이 남았는지 확인한다.

두 번째 명령은 새 `main`에서 접근 가능한 전체 Git 객체와 경로를 확인한다.

두 검사에서 내부 경로가 발견되지 않았다.

## 강제 push는 안전장치를 포함했다

이력을 재작성하면 일반 `git push`로는 원격 브랜치를 갱신할 수 없다.

기존 원격 이력을 새 이력으로 교체해야 하므로 강제 push가 필요하다.

무조건 덮어쓰는 `--force` 대신 원격 `main`이 작업 시작 당시 확인한 커밋과 같을 때만 진행하는 `--force-with-lease`를 사용했다.

```powershell
git push --force-with-lease=main:[확인한 기존 원격 커밋] origin main
```

이 방식은 작업 중 다른 사람이 원격 `main`을 갱신했다면 push를 거부한다.

이력 재작성 뒤에는 기존 커밋 ID가 모두 달라지므로 다른 작업자의 clone도 그대로 push할 수 없다.

협업 저장소라면 작업 전에 재작성 시간을 공유하고, 완료 뒤 새 이력을 다시 받거나 clone하도록 안내해야 한다.

강제 push가 성공한 뒤 원격 `main`의 새 커밋과 로컬 `main`이 일치하는지 확인했다.

```powershell
git ls-remote origin refs/heads/main
git status --short --branch
```

로컬에서 이력 재작성 과정에 만들어진 원본 참조와 reflog도 정리했다.

복구가 필요할 때는 저장소 밖에 보관한 Git bundle을 사용할 수 있다.

## 사이트가 깨지지 않았는지도 확인했다

파일을 숨기는 데 성공해도 GitHub Pages 사이트가 깨지면 작업이 끝난 것이 아니다.

Jekyll `3.8` 환경에서 사이트를 다시 빌드했다.

```powershell
docker run --rm `
  -v "${PWD}:/srv/jekyll" `
  -w /srv/jekyll `
  jekyll/jekyll:3.8 `
  jekyll build
```

블로그 태그, 한·영 문장 대응과 사이트 전체 품질 검사도 다시 실행했다.

```powershell
node _tests/blog-tags.test.js
node _tests/article-translation.test.js
node _tests/site-quality.test.js
```

전체 검사가 통과했고 공개 홈페이지와 블로그는 정상 응답했다.

내부 파일의 사이트 주소와 현재 GitHub `main` 원문 주소는 모두 `404`로 확인됐다.

## 이력 재작성 뒤에도 남는 한계가 있었다

원격 `main`에서 과거 커밋으로 이어지는 연결을 끊어도 GitHub가 이전 객체를 즉시 물리적으로 삭제하는 것은 아니다.

기존 커밋 SHA를 정확히 알고 있는 주소는 일정 기간 계속 응답할 수 있다.

다른 사람이 이미 저장소를 clone하거나 파일을 내려받았다면 그 사본도 회수할 수 없다.

GitHub의 캐시와 연결이 끊긴 객체까지 조기에 제거해야 하는 민감정보 사고라면 GitHub Support의 공식 제거 절차도 필요하다.

이 때문에 공개 Git에 비밀정보를 올리지 않는 것이 가장 확실한 해결책이다.

사후 이력 정리는 피해 범위를 줄이는 작업이지 이미 공개된 정보를 다시 비밀로 되돌리는 마법은 아니다.

## 내부 파일을 숨긴 뒤에는 외부 연결도 보였다

내부 파일을 숨겼다고 해서 웹사이트의 보안과 개인정보 점검까지 모두 끝나는 것은 아니었다.

저장소 공개 범위를 정리한 뒤에는 페이지를 열 때 어떤 외부 서비스로 연결되는지도 확인했다.

내 사이트는 Google Fonts의 웹폰트를 외부에서 불러오고 있었다.

이 방식은 글꼴 파일을 저장소에 직접 넣지 않아도 되고 브라우저 캐시를 활용할 수 있지만, 페이지를 여는 과정에서 Google이 IP 주소, 기기·브라우저 정보와 요청 기록을 처리할 수 있다.

YouTube와 Spotify 임베드도 사용자가 재생 버튼을 누르기 전에 페이지에서 로드될 수 있었다.

그래서 한·영 개인정보처리방침에 Google Fonts 웹폰트와 YouTube·Spotify 임베드가 로드될 때 발생할 수 있는 외부 정보 처리를 명시했다.

외부 서비스를 제거한 것은 아니다.

사이트에 필요한 기능은 유지하되 방문자가 페이지를 열었을 때 어떤 정보 처리가 일어날 수 있는지 실제 동작에 맞게 알리는 쪽을 선택했다.

## HSTS는 Cloudflare에서 순서대로 적용했다

HTTPS가 적용되어 있다는 사실과 HSTS가 설정되어 있다는 사실도 구분해야 했다.

HTTPS는 암호화된 접속을 제공하지만, HSTS는 브라우저가 처음부터 HTTP를 거치지 않고 HTTPS로만 접속하도록 기억시키는 별도의 응답 헤더다.

GitHub Pages의 Jekyll 파일만으로는 이 응답 헤더를 직접 설정할 수 없었다.

도메인을 관리하는 Cloudflare에서 다음 순서로 적용했다.

### 1. 웹 트래픽이 Cloudflare를 지나도록 바꿨다

처음에는 루트 도메인의 A 레코드 4개와 `www` CNAME이 모두 `DNS 전용`이었다.

이 상태에서는 방문자가 Cloudflare를 거치지 않으므로 Cloudflare에서 HSTS를 켜도 공개 사이트의 응답 헤더에 적용되지 않는다.

루트 도메인의 A 레코드 4개와 `www` CNAME만 `프록싱됨`으로 전환했다.

Search Console 소유권 확인에 사용하는 Google 인증 TXT 레코드는 웹 트래픽 레코드가 아니므로 `DNS 전용`으로 유지했다.

### 2. 인증서와 원본 연결 상태를 먼저 확인했다

프록시 전환 뒤 Cloudflare의 SSL/TLS 암호화 모드가 `전체`인지 확인했다.

`*.babypaunch.com`과 `babypaunch.com`을 포함하는 범용 SSL 인증서도 `활성` 상태였다.

HSTS는 HTTPS가 중단되면 브라우저 접속까지 막을 수 있으므로 인증서 확인보다 먼저 켜면 안 된다.

### 3. HTTP 요청을 HTTPS로 보내도록 설정했다

Cloudflare의 `항상 HTTPS 사용`을 활성화했다.

이 설정은 `http://`로 들어온 요청을 `https://` 주소로 이동시킨다.

HSTS는 브라우저가 정책을 이미 기억하고 있을 때 강제력을 발휘하므로 최초 방문의 HTTP 요청도 HTTPS로 넘기는 설정이 함께 필요했다.

### 4. HSTS는 권장 초기값으로 시작했다

HSTS를 활성화하고 최대 기간은 Cloudflare가 권장하는 6개월로 설정했다.

실제 응답 값으로는 `max-age=15552000`이다.

`includeSubDomains`는 끔으로 유지했다.

이 옵션을 켜면 모든 하위 도메인도 HTTPS만 허용되므로 사용하지 않는 하위 도메인까지 준비됐는지 확인한 뒤 적용해야 한다.

브라우저 제조사의 HSTS 목록에 도메인을 미리 등록하는 preload도 끔으로 유지했다.

preload는 되돌리는 데 시간이 오래 걸릴 수 있어 처음부터 켤 필요가 없다고 판단했다.

### 5. 대시보드가 아니라 공개 응답으로 검증했다

설정 화면에 `상태: 켬`이 표시되는 것만으로 끝내지 않았다.

루트 도메인과 `www` 주소의 HTTP·HTTPS 응답을 각각 확인했다.

```powershell
curl.exe -I http://babypaunch.com/
curl.exe -I https://babypaunch.com/
curl.exe -I http://www.babypaunch.com/
curl.exe -I https://www.babypaunch.com/
```

HTTP 주소는 HTTPS 주소로 `301 Moved Permanently` 응답을 보냈다.

루트 HTTPS 주소는 `200 OK`로 열렸다.

`www` HTTPS 주소는 대표 주소인 루트 도메인으로 이동했다.

두 HTTPS 응답 모두 다음 HSTS 헤더를 포함했다.

```http
Strict-Transport-Security: max-age=15552000
```

응답 서버가 Cloudflare로 표시되고 DNS 조회 결과도 Cloudflare 주소로 바뀐 것을 확인했다.

이 과정을 거쳐야 DNS 프록시, HTTPS 이동과 HSTS 헤더가 실제 방문자에게 함께 적용됐다고 볼 수 있었다.

## GitHub 계정 보안은 사이트 보안과 구분했다

GitHub 2FA도 방문자에게 제공하는 사이트 기능이 아니라 저장소를 관리하는 GitHub 계정을 보호하는 장치였다.

브라우저에서 GitHub에 새로 로그인하거나 보안 설정을 확인할 때 주로 사용하며, 현재 PC에 저장된 Git 인증이 유지되는 동안 일반적인 `git push`마다 인증번호를 요구하지는 않는다.

PAT를 정리하거나 권한이 좁은 fine-grained PAT로 교체할 때는 기존 자동화가 그 토큰을 사용 중인지 먼저 확인해야 한다.

저장소 파일 공개 범위, 웹페이지의 외부 요청, 전송 보안과 GitHub 계정 보안은 서로 다른 층이므로 각각 확인해야 했다.

## 앞으로는 처음부터 공개 경계를 나눈다

새 내부 문서는 만들기 전에 저장 위치부터 결정한다.

사이트 실행과 공개 문서에 필요하지 않은 AI 지침, 조사 자료와 작업 기록은 처음부터 무시되는 경로나 저장소 밖의 로컬 작업 폴더에 둔다.

저장소 루트에 있어야 도구가 읽을 수 있는 내부 파일은 파일명을 `.gitignore`와 Jekyll `exclude`에 동시에 등록한다.

커밋 전에는 `git status`와 `git diff --cached`를 확인한다.

```powershell
git status --short
git diff --cached --name-only
```

정기적으로 `git ls-files`를 확인하면 의도하지 않은 내부 파일이 추적되기 시작한 시점을 빨리 발견할 수 있다.

민감정보는 `.gitignore`에만 의존하지 않고 애초에 저장소 밖의 전용 보관 위치와 환경 변수로 관리한다.

## 결국 공개 범위를 여러 겹으로 나눠 봐야 했다

SEO는 검색 제목과 설명만 다듬는 작업이 아니었다.

검색 엔진과 방문자가 실제로 접근할 수 있는 범위를 확인하면서 공개 저장소의 경계도 다시 보게 됐다.

`.gitignore`는 시작점일 뿐 이미 공개된 파일과 과거 이력을 자동으로 숨겨 주지 않는다.

내부 파일을 안전하게 관리하려면 Git 추적, Jekyll 빌드, 현재 브랜치, 과거 커밋과 외부 캐시를 각각 확인해야 한다.

여기에 페이지를 열 때 발생하는 외부 요청, HTTPS 응답 헤더와 저장소 관리 계정 보안은 별도의 점검 항목으로 남는다.

HSTS의 `includeSubDomains`와 preload를 나중에 켠다면 모든 하위 도메인이 HTTPS를 지원하는지 먼저 다시 확인해야 한다.

<p class="article-summary"><strong>한 줄 요약:</strong> 공개 GitHub Pages 저장소는 `.gitignore`만 믿지 말고 빌드 결과, Git 이력, 외부 요청, HTTPS와 관리 계정까지 서로 다른 공개 경계로 나눠 확인해야 한다.</p>
