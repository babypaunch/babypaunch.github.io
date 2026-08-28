---
layout: post
locale: ko
page_key: blog
title: 어떤 글이 사람을 데려오는지 측정하기로 했다
description: BabyPaunch에 동의 기반 GA4와 Search Console을 연결하고, 글과 유입 경로를 확인할 수 있는 기반을 마련했다.
category: Making
date: 2026-08-28 00:00:00 +0900
permalink: /blog/github-pages-analytics/
language_url: /en/blog/github-pages-analytics/
alternate_ko: /blog/github-pages-analytics/
alternate_en: /en/blog/github-pages-analytics/
tags:
  - web-analytics
  - ga4
  - search-console
  - github-pages
---

블로그 글을 하나씩 올리기 시작했지만, 정작 어떤 글을 사람들이 읽는지는 알 수 없었다.

Instagram, Threads, Facebook, X에 글을 소개하더라도 어느 곳에서 방문자가 왔는지 확인할 방법이 없었다. 검색으로 들어온 사람이 어떤 검색어를 사용했는지도 몰랐다.

글을 계속 쓰려면 단순히 조회수가 많은지만 보는 것보다, 어떤 주제와 유입 경로가 실제로 사람을 데려오는지 알고 싶었다.

그래서 이런 질문부터 정했다.

<p class="article-question">어떤 글이 좋았는지 추측하지 않고 확인할 수 있을까?</p>

## 이번 작업 한눈에 보기

| # | 작업한 곳 | 진행한 작업 | 진행한 이유 | 결과 |
| :---: | --- | --- | --- | --- |
| 1 | Google Analytics | GA4 속성과 웹 스트림 생성 | 글과 유입 경로를 측정하기 위해 | 방문 분석 기반 마련 |
| 2 | 내 사이트 | 공통 레이아웃에 측정 코드 연결 | 모든 페이지에 같은 분석 기준을 적용하기 위해 | 사이트 전체에서 측정 가능 |
| 3 | 내 사이트 | 한·영 분석 동의 UI와 설정 변경 기능 구현 | 방문자의 선택에 따라 분석을 실행하기 위해 | 동의 전 GA4 미로드 |
| 4 | 내 사이트 | 한·영 개인정보처리방침 갱신 | 분석 정보와 거부 방법을 안내하기 위해 | 분석 도구 사용 내용 공개 |
| 5 | Google Analytics | 향상된 측정 활성화 | 페이지 조회·스크롤·외부 링크 클릭을 확인하기 위해 | 주요 이용 행동 측정 가능 |
| 6 | Cloudflare | Google 인증 TXT 레코드 추가 | Search Console 도메인 소유권을 확인하기 위해 | `babypaunch.com` 소유권 확인 |
| 7 | Search Console | sitemap 제출 | Google에 공개 페이지를 전달하기 위해 | 제출 성공 및 27페이지 발견 |
| 8 | GA4·Search Console | 두 서비스 연결 | 검색 유입과 사이트 이용을 함께 보기 위해 | 통합 분석 기반 마련 |
| 9 | SNS 게시 설계 | 플랫폼별 UTM 규칙 추가 | 네 SNS의 유입을 구분하기 위해 | 출처별 링크 생성 규칙 마련 |
| 10 | 내 사이트 | Jekyll 빌드와 품질 검사 | 변경으로 사이트가 깨지지 않았는지 확인하기 위해 | 25페이지 검사 통과 |

## GA4로 글과 유입 경로 측정하기

Google Analytics 4에 `BabyPaunch Website` 속성과 `https://babypaunch.com` 웹 스트림을 만들었다. 사이트에는 공개 측정 ID를 연결했다.

향상된 측정도 켰다. 이제 페이지 조회뿐 아니라 글을 얼마나 아래까지 읽었는지 알 수 있는 스크롤과 외부 링크 클릭도 함께 집계된다.

GitHub Pages는 별도의 애플리케이션 서버가 없는 정적 사이트다. 그래도 모든 페이지가 공유하는 Jekyll 레이아웃에 분석 코드를 한 번만 넣으면 홈, 블로그, 음악, 정책 페이지에 같은 기준을 적용할 수 있다.

배포 후에는 실제 블로그 글을 열어 GA4 실시간 보고서를 확인할 수 있다.

## 동의하기 전에는 분석 코드를 불러오지 않기

분석이 필요하다고 해서 방문자의 선택보다 먼저 실행하면 안된다.

첫 방문에는 한국어 또는 영어로 분석 동의 모달이 나타난다. 사용자가 <strong>분석 허용</strong>을 누르기 전에는 Google Analytics 스크립트 자체를 불러오지 않는다. 거부해도 사이트의 모든 기능을 그대로 사용할 수 있다.

선택은 브라우저의 로컬 저장소에 보관한다. 나중에 마음이 바뀌면 페이지 아래의 <button class="footer-button" type="button" data-analytics-settings>분석 설정</button>을 눌러 다시 선택할 수 있다. 허용하거나 거부했을 때 나타나는 짧은 안내는 2초 뒤 자동으로 사라진다.

모달은 화면 중앙에 두고 배경을 어둡게 처리했다. 키보드 포커스가 모달 밖으로 빠져나가지 않게 했고, 중요한 선택이므로 배경 클릭이나 `Esc`만으로 닫히지 않게 했다.

분석 도구를 실제로 사용하게 됐으므로 한국어와 영어 개인정보처리방침도 함께 고쳤다. 어떤 정보가 측정되는지, 거부해도 기능에 영향이 없는지, 선택을 어디서 바꿀 수 있는지를 두 언어에 같은 내용으로 적었다. Google AdSense 광고는 아직 사용하지 않는다는 점도 그대로 남겼다.

## Search Console로 검색 유입 연결하기

GA4가 사이트 안에서 일어나는 일을 보여준다면 Search Console은 Google 검색에서 사이트가 어떻게 발견되는지 보여준다.

`babypaunch.com` 전체를 관리하기 위해 URL 하나가 아니라 도메인 속성으로 등록했다. Google이 Cloudflare 계정에 접근하도록 권한을 주는 자동 인증은 사용하지 않았다. 대신 Cloudflare DNS에 Google 인증용 TXT 레코드 하나를 직접 추가했다.

소유권 확인이 끝난 뒤 `https://babypaunch.com/sitemap.xml`을 제출했다. 처음에는 잠시 가져올 수 없다는 상태가 보였지만, 공개 주소가 HTTP `200`을 반환하고 XML에 문제가 없는지 확인한 뒤 다시 확인하니 <strong>성공</strong>으로 바뀌었다. Search Console이 발견한 페이지는 27개였다.

마지막으로 Search Console 도메인 속성과 GA4의 BabyPaunch 웹 스트림을 연결했다. 앞으로 데이터가 쌓이면 검색어, 검색 결과의 노출과 클릭, 방문자가 처음 도착한 글, 사이트 안에서의 참여를 함께 비교할 수 있다.

## SNS 링크도 출처를 구분할 수 있게 준비하기

Instagram, Threads, Facebook, X에 같은 문구를 게시하는 원칙은 바꾸지 않았다. 같은 글을 소개하면서 플랫폼마다 문구를 억지로 다르게 만들 이유는 없었다.

대신 링크에는 플랫폼별 UTM 값을 붙이기로 했다.

```text
utm_source=instagram | threads | facebook | x
utm_medium=social
utm_campaign=<글의 slug>
utm_content=<게시 실행 ID>
```

보이는 문구와 이동하는 글은 같지만 `utm_source`가 다르기 때문에 어느 SNS에서 방문자가 왔는지 구분할 수 있다. 같은 글을 여러 번 소개할 때는 `utm_content`로 게시 회차도 나눈다.

이 규칙은 현재 SNS 자동 게시 Chrome 확장 프로그램의 설계 문서에 반영했다. 확장 프로그램 자체는 아직 구현 전이므로, UTM 자동 생성이 이미 배포됐다고 표현하지는 않는다.

## 무료 도구만으로 만든 측정 기반

이번 구성에는 유료 분석 서비스가 없다. GitHub Pages, GA4, Search Console과 Cloudflare DNS의 무료 범위만 사용했다.

코드를 배포하기 전에는 Jekyll `3.8`로 사이트를 빌드하고 25페이지 품질 테스트를 통과했다. 동의 전 미로드, 허용 후 로드, 거부, 설정 다시 열기와 네 개의 반응형 경계값도 실제 브라우저에서 확인했다.

이제 막 연결했기 때문에 어떤 글이 가장 좋았다고 말할 데이터는 아직 없다. 하지만 앞으로는 감으로만 판단하지 않아도 된다. 검색과 SNS 유입이 쌓이면 사람들이 실제로 읽은 글을 기준으로 다음 주제를 정할 수 있다.

나중에 Google AdSense를 붙이더라도 지금 만든 동의 흐름을 확장할 수 있다. 광고를 추가할 때는 광고 저장소와 맞춤 광고 동의를 별도로 반영하고 개인정보처리방침도 다시 갱신할 생각이다.

<p class="article-summary"><strong>한 줄 요약:</strong> 글을 많이 쓰는 것에서 멈추지 않고, 방문자의 선택을 지켜보면서 어떤 글과 유입 경로가 도움이 되는지 확인할 기반을 만들었다.</p>
