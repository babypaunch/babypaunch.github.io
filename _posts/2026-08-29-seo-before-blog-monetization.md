---
layout: post
locale: ko
page_key: blog
title: 블로그로 돈 벌고 싶다고? SEO부터 제대로 설정해야지
description: 직접 광고나 홍보 없이 블로그 수익화를 고민하며 내 GitHub Pages의 SEO 설정과 빠진 부분을 점검하고 개선한 과정.
category: Making
date: 2026-08-29 07:35:00 +0900
last_modified_at: 2026-08-29 07:57:00 +0900
permalink: /blog/seo-before-blog-monetization/
language_url: /en/blog/seo-before-blog-monetization/
alternate_ko: /blog/seo-before-blog-monetization/
alternate_en: /en/blog/seo-before-blog-monetization/
tags:
  - seo
  - github-pages
  - blog-monetization
  - search-console
---

GitHub Pages에 개인 도메인을 연결하고 블로그 글을 올리면서, GA4와 Search Console로 방문자가 어디에서 오는지도 확인할 수 있게 됐다.

글이 어느 정도 쌓이면 블로그 마지막에 광고를 붙이는 것도 고민했다.

하지만 광고를 어디에 넣을지 생각하기 전에 사람들이 내 글을 발견할 수 있는 기반부터 마련해야 했다.

검색으로 들어오는 사람이 거의 없는데 광고만 붙인다고 수익이 생기는 것은 아니기 때문이다.

특히 직접 광고하거나 홍보할 계획이 없다면 SEO는 더 중요하다.

돈을 써서 방문자를 데려오지 않는 만큼, 검색엔진이 필요한 사람과 글을 연결할 수 있도록 기본 정보를 정확히 제공해야 하기 때문이다.

그러다 뭔가 하나가 빠진 듯한 생각이 들었다.

SEO 설정을 검토하고 마무리했는지 확인해 보니 아니었다.

도구를 연결했다고 SEO가 자동으로 끝나는 것은 아니다.

그래서 이번에는 내 GitHub Pages에 이미 되어 있던 설정과 빠진 부분을 하나씩 확인했다.

## 블로그로 돈을 벌고 싶다면 광고보다 SEO 설정이 먼저 아닐까?

SEO는 검색 순위를 억지로 올리는 기술이 아니다.

SEO는 `Search Engine Optimization`, 한국어로 검색엔진 최적화라는 뜻이다.

Search Console이 Google 검색에서 내 사이트의 상태를 보여 주는 도구라면, SEO는 검색엔진이 사이트를 발견하고 내용을 이해해 알맞은 검색 결과에 보여 줄 수 있도록 정리하는 작업이다.

이름만 보면 검색 순위를 끌어올리는 특별한 기술처럼 들리지만 기본은 훨씬 단순하다.

검색엔진이 사이트 주소를 찾고 페이지를 읽어도 되는지 판단한 뒤, 원본 주소와 글의 제목·설명·언어·발행일을 이해할 수 있어야 한다.

검색한 사람도 결과에 표시된 정보를 보고 이 글이 자신에게 필요한지 판단할 수 있어야 한다.

검색엔진은 대체로 페이지를 발견하고, 내용을 가져가고, 이해한 정보를 색인에 저장한 뒤 검색어와 관련 있는 결과를 보여 준다.

SEO는 이 과정의 오해와 누락을 줄이는 일이며, 좋지 않은 글을 메타 태그 몇 개로 좋은 글처럼 만드는 기술은 아니다.

반대로 읽을 만한 글을 써도 제목이 모호하거나 검색 로봇이 페이지를 찾지 못하면 독자에게 도착하기 어렵다.

## 내 사이트에 SEO가 필요했던 이유

내 사이트에는 한국어와 영어 페이지가 함께 있고, 홈·블로그·음악·정책·문의 페이지도 서로 다른 역할을 한다.

앞으로 블로그 글이 계속 늘어나면 검색엔진이 다음 내용을 스스로 추측하게 두기 어려워진다.

- 한국어 글과 영어 글이 서로 번역 관계인지
- 같은 주소의 여러 형태 중 어느 주소가 기준인지
- 어떤 페이지는 검색에 공개하고 어떤 문서는 제외해야 하는지
- 블로그 글이 언제 처음 발행됐고 언제 실제로 수정됐는지
- 검색 결과와 SNS 미리보기에 어떤 제목과 설명, 이미지를 보여 줄지

SEO는 방문자 수만 늘리는 작업이 아니라, 공개하려는 글만 정확히 공개하고 한국어를 찾는 사람에게 한국어 페이지를 보여 주며 검색 결과에서 내용을 오해하지 않게 만드는 작업이다.

수익화를 생각한다면 어떤 검색어로 어떤 글을 발견하고 실제로 읽었는지 알아야 광고보다 먼저 개선할 콘텐츠를 찾을 수 있다.

직접 광고나 홍보를 하지 않는 블로그의 검색 유입은 우연히 기다리는 방문이 아니라, 검색엔진이 이해할 수 있는 글을 꾸준히 쌓아서 얻는 방문이다.

## 처음부터 되어 있던 기본 설정

점검 전에도 내 사이트의 기술 SEO가 비어 있던 것은 아니며, 기본 토대는 이미 대부분 갖춰져 있었다.

<div class="data-cards">
  <section class="data-card">
    <h3>HTTPS와 대표 주소</h3>
    <p>사이트는 <code>https://babypaunch.com</code>으로 접속하며, <code>www.babypaunch.com</code>으로 들어오면 기준 주소인 <code>babypaunch.com</code>으로 영구 이동한다.</p>
    <p>모든 페이지에는 검색 매개변수나 같은 내용을 가리키는 주소가 생겨도 대표 주소를 알려 주는 <code>canonical</code> 링크가 있다.</p>
  </section>
  <section class="data-card">
    <h3>robots.txt와 sitemap.xml</h3>
    <p><code>robots.txt</code>에는 검색 로봇의 공개 페이지 접근 규칙과 sitemap 주소가 있고, <code>sitemap.xml</code>에는 검색엔진이 확인해야 할 페이지와 블로그 글 주소가 있다.</p>
    <p>Search Console에도 이 sitemap을 제출해 둔 상태였다.</p>
  </section>
  <section class="data-card">
    <h3>페이지 설명과 검색 허용</h3>
    <p>모든 페이지에는 제목과 <code>meta description</code>이 있으며, 일반 페이지는 <code>index,follow</code>, 존재하지 않는 주소를 안내하는 404 페이지는 <code>noindex,follow</code>를 사용한다.</p>
  </section>
  <section class="data-card">
    <h3>한국어와 영어의 연결</h3>
    <p>한국어와 영어 페이지는 <code>hreflang</code>으로 서로 연결하고 <code>ko</code>, <code>en</code>, 기본 언어를 뜻하는 <code>x-default</code>를 함께 제공해 같은 내용의 언어별 페이지임을 알려 준다.</p>
  </section>
  <section class="data-card">
    <h3>구조화 데이터</h3>
    <p>홈에는 <code>WebSite</code>, 일반 페이지에는 <code>WebPage</code>, 블로그 글에는 <code>BlogPosting</code> 구조화 데이터가 있으며 글 제목·설명·언어·발행일·작성자·대표 주소를 함께 제공한다.</p>
    <p>구조화 데이터는 검색엔진이 화면의 모양만 보고 의미를 추측하지 않도록 페이지의 역할을 명시하는 방법이다.</p>
  </section>
  <section class="data-card">
    <h3>읽을 수 있는 HTML 구조</h3>
    <p>모든 페이지에는 문서 언어가 지정되어 있고 <code>h1</code>은 하나만 있으며, 본문 제목은 순서에 맞는 heading을 사용한다.</p>
    <p>이미지에는 대체 텍스트와 크기가 있고, 내부 링크는 실제 존재하는 주소로 연결된다.</p>
    <p>이런 접근성 기본기는 검색엔진이 문서 구조를 이해하는 데에도 도움이 된다.</p>
  </section>
</div>

처음에는 robots.txt와 sitemap, canonical과 구조화 데이터가 있으니 큰 문제는 없을 것이라고 생각했지만, 실제 공개 사이트를 확인하자 놓친 부분이 보였다.

중요한 것은 설정 파일의 존재가 아니라 공개 결과가 의도대로 만들어졌는지였다.

## 공개할 필요가 없는 문서가 sitemap에 들어 있었다

가장 먼저 고쳐야 했던 부분은 sitemap이었다.

공개 sitemap에는 정상 페이지 외에도 다음 주소가 포함되어 있었다.

- 작업 규칙을 적은 `AGENTS.html`
- 프로젝트 상태를 적은 `SNAPSHOT.html`
- 외부 구성 요소 고지 문서인 `THIRD_PARTY_NOTICES.html`
- 사용자용 페이지가 아닌 CSS 주소

앞의 문서 세 개는 실제로 HTTP `200`을 반환했고, 검색 허용 지시와 자기 자신을 가리키는 canonical까지 붙어 있었다.

사이트 제작에 필요한 문서와 방문자가 검색해서 읽어야 할 페이지가 섞인 상태였다.

Jekyll은 Markdown 파일을 페이지로 처리하며 GitHub Pages의 빌드 환경은 로컬과 조금 다를 수 있어서, 로컬에서 보이지 않던 파일도 공개 결과에 포함될 수 있다.

그래서 `_config.yml`의 제외 목록에 내부 관리 문서를 명시하고 sitemap에서도 CSS 같은 비페이지 주소를 걸러 냈다.

배포 뒤 sitemap은 30개 주소에서 사용자용 26개 주소로 정리됐고, 내부 관리 문서 세 개가 실제 공개 주소에서 `404`를 반환하는지도 확인했다.

## 한국어 페이지의 제목을 한국어로 바꿨다

한국어 페이지의 설명은 한국어였지만 일부 문서 제목은 `Blog — BabyPaunch`, `Music — BabyPaunch`, `Policies — BabyPaunch`처럼 영어판과 같았다.

언어별 페이지가 `hreflang`으로 연결되어 있어도 검색 결과에서 보이는 제목은 해당 독자가 바로 이해할 수 있어야 한다.

그래서 한국어 페이지는 `블로그`, `음악`, `정책`, `문의`처럼 역할이 바로 드러나는 제목으로 바꾸고 홈의 큰 제목도 `작지만, 꼼꼼하게 만듭니다`로 정리했다.

영어 페이지의 기존 문구는 그대로 유지했다.

## 공유했을 때 보이는 대표 이미지를 준비했다

검색 SEO와 SNS 미리보기는 같은 개념이 아니지만, 검색해서 발견한 글이 다시 SNS와 메신저로 공유될 수 있으므로 실제 유입 과정에서는 이어진다.

기존에는 27개 페이지 중 대표 이미지가 있는 4개 페이지만 `og:image`와 Twitter 이미지가 출력됐다.

그래서 기존 BabyPaunch 로고와 크림색·주황색·짙은 초록색을 사용한 1200×630 공통 공유 이미지를 만들었다.

글에 고유한 대표 이미지가 있으면 그 이미지를 사용하고, 없으면 공통 이미지를 사용한다.

이제 모든 페이지가 제목과 설명, 공유 이미지를 함께 제공한다.

대표 이미지가 있을 때 `twitter:card`가 두 번 출력되던 템플릿 실수도 함께 제거했다.

## 발행일과 수정일을 구분했다

기존 블로그 구조화 데이터에는 `datePublished`만 있었지만, 이미 발행한 글 뒤에 날짜가 표시된 추가 업데이트를 붙이는 경우가 생겼다.

최초 발행일을 수정일로 바꾸면 글의 이력을 정확히 설명할 수 없다.

그래서 최초 발행일인 `date`는 그대로 두고 실제 내용이 바뀐 글에 `last_modified_at`을 추가했다.

구조화 데이터에는 `dateModified`와 `article:modified_time`이 출력되고, sitemap의 `lastmod`도 실제 수정일을 우선 사용한다.

수정일은 새 글처럼 보이게 하려고 임의로 바꾸는 값이 아니므로 본문에 의미 있는 변경이 있을 때만 실제 날짜를 기록해야 한다.

## 눈으로 확인하던 항목을 자동 검사로 바꿨다

SEO 설정은 한 번 적용해도 다음 글이나 템플릿 변경에서 다시 깨질 수 있다.

그래서 다음 항목을 사이트 품질 검사에 추가했다.

- 모든 페이지의 title이 고유한지
- `og:image`와 Twitter 이미지가 절대 주소로 한 번씩 출력되는지
- 공유 이미지 대체 설명이 있는지
- `twitter:card`가 중복되지 않는지
- 블로그 구조화 데이터에 발행일, 수정일과 이미지가 있는지
- sitemap에 내부 관리 문서와 CSS가 들어 있지 않은지
- 공통 공유 이미지가 실제 PNG이며 1200×630인지

로컬 Jekyll 빌드에서 통과하는 것만으로 끝내지 않고, GitHub Pages 배포 뒤 공개 홈·블로그 글·sitemap·제외한 문서 주소를 다시 확인했다.

## 사람들이 SEO 작업에서 놓치기 쉬운 부분

<div class="data-cards">
<section class="data-card" markdown="1">
### sitemap은 있다고 끝나는 파일이 아니다

sitemap이 HTTP `200`을 반환해도 그 안에 잘못된 주소가 들어 있을 수 있다.

삭제한 페이지, 내부 문서, 중복 주소와 검색할 필요가 없는 파일이 포함되지 않았는지 실제 URL 목록을 확인해야 한다.

</section>
<section class="data-card" markdown="1">
### robots.txt와 noindex는 역할이 다르다

robots.txt는 검색 로봇이 특정 경로를 가져가는 동작을 제어한다.

`noindex`는 해당 페이지를 검색 결과에 넣지 말라는 지시다.

페이지를 robots.txt로 막아 놓고 그 페이지의 `noindex`를 읽어 주길 기대하면 의도대로 처리되지 않을 수 있다.

</section>
<section class="data-card" markdown="1">
### canonical은 무조건 홈을 가리키는 태그가 아니다

각 글이 모두 홈을 canonical로 가리키면 검색엔진에게 모든 글이 홈의 복제본이라고 말하는 셈이 된다.

일반적인 독립 페이지는 자기 자신의 정규 주소를 canonical로 사용한다.

실제 중복 페이지가 있을 때만 대표 주소를 신중하게 선택한다.

</section>
<section class="data-card" markdown="1">
### hreflang은 언어 버튼만 만든다고 생기지 않는다

화면에 한국어·영어 전환 버튼이 있어도 검색엔진이 두 페이지의 관계를 자동으로 정확히 이해한다고 보장할 수 없다.

두 언어 페이지가 서로를 가리키고, 각 주소가 실제 존재하며, canonical과 언어 코드가 맞는지 확인해야 한다.

</section>
<section class="data-card" markdown="1">
### 제목과 설명은 언어별로 작성해야 한다

본문만 번역하고 title과 description을 그대로 두면 검색 결과가 어색해질 수 있다.

제목은 페이지마다 고유해야 하고 실제 내용을 간단히 설명해야 한다.

설명은 검색 순위를 올리는 문구를 반복하기보다 독자가 클릭 전에 무엇을 읽게 될지 알려 주는 편이 낫다.

Google은 검색어와 페이지 내용에 따라 작성한 title이나 description 대신 다른 문구를 보여 줄 수도 있다.

</section>
<section class="data-card" markdown="1">
### 구조화 데이터가 검색 노출을 보장하지 않는다

유효한 `BlogPosting`을 넣었다고 특별한 검색 결과가 반드시 나타나는 것은 아니다.

구조화 데이터는 실제 화면에 있는 내용과 일치해야 하며, 보이지 않는 내용을 과장해서 추가하면 안 된다.

</section>
<section class="data-card" markdown="1">
### 수정일은 배포일과 다르다

스타일 파일이나 공통 템플릿만 바꿨다고 모든 글의 수정일을 오늘로 바꾸면 실제 콘텐츠 이력과 맞지 않는다.

검색 결과를 새 글처럼 보이게 하려고 날짜만 갱신하는 방식도 피해야 한다.

</section>
<section class="data-card" markdown="1">
### 공유 이미지는 검색 순위와 별개지만 무시하기 어렵다

Open Graph 이미지를 넣는다고 Google 순위가 바로 오르는 것은 아니다.

하지만 링크가 공유될 때 제목만 보이는 것보다 일관된 이미지가 함께 보이는 편이 글을 구분하고 클릭 여부를 판단하는 데 도움이 된다.

</section>
<section class="data-card" markdown="1">
### Search Console의 숫자는 바로 바뀌지 않는다

배포 직후 sitemap이 정상이어도 Google이 다시 가져가고 색인을 갱신하는 데 시간이 걸릴 수 있다.

변경 직후의 숫자가 그대로라고 설정이 실패했다고 단정하지 않는다.

반대로 Search Console에 등록했다는 이유만으로 모든 페이지가 반드시 색인되는 것도 아니다.

</section>
<section class="data-card" markdown="1">
### GA4 동의와 검색 색인은 별개다

내 사이트는 방문자가 동의하기 전에는 GA4를 불러오지 않는다.

이 선택은 방문 분석 수집에 관한 것이다.

검색 로봇이 공개 HTML을 읽고 색인하는 과정과는 별개이므로 분석 동의율이 낮아도 검색 노출 자체가 막히는 것은 아니다.

</section>
<section class="data-card" markdown="1">
### 키워드를 반복하는 것보다 질문에 답해야 한다

제목과 본문에 같은 검색어를 억지로 반복하는 것은 독자에게도 불편하다.

글이 어떤 질문에 답하는지 분명히 하고, 실제 경험과 확인한 사실을 이해하기 쉬운 구조로 쓰는 편이 오래 유지된다.

</section>
</div>

## 앞으로 SEO를 운영하는 방법

기본 기술 SEO를 정리한 뒤에는 설정을 더 많이 넣기보다 실제 글을 개선하는 일이 중요하다.

<div class="data-cards">
<section class="data-card" markdown="1">
### 글마다 고유한 대표 이미지를 천천히 추가하기

공통 공유 이미지는 빈 미리보기를 막아 준다.

하지만 글의 주제가 서로 다르므로 중요한 글부터 내용을 보여 주는 고유 이미지를 만드는 편이 더 좋다.

모든 글에 급하게 이미지를 채우기보다 SNS에 실제 소개할 글부터 추가할 생각이다.

</section>
<section class="data-card" markdown="1">
### 서로 관련 있는 글을 자연스럽게 연결하기

새 글에서 이전 글의 배경이 필요하면 설명 문장 안에서 해당 글로 연결한다.

`여기를 클릭` 같은 문구보다 링크만 읽어도 목적지를 알 수 있는 표현을 사용한다.

내부 링크는 독자가 다음 내용을 찾는 데 도움을 주고 검색엔진에도 글 사이의 관계를 알려 준다.

</section>
<section class="data-card" markdown="1">
### Search Console에서 노출과 클릭을 함께 보기

검색에 한 번도 보이지 않는 글과 노출은 되지만 클릭되지 않는 글은 개선 방법이 다르다.

노출 자체가 적다면 주제와 검색어의 관계, 색인 상태와 내부 링크를 확인한다.

노출은 많지만 CTR이 낮다면 제목과 설명이 검색 의도를 제대로 보여 주는지 살펴본다.

순위 하나만 보기보다 검색어, 페이지, 노출수, 클릭수와 CTR을 함께 본다.

</section>
<section class="data-card" markdown="1">
### 실제 속도와 사용 경험 확인하기

검색엔진만을 위한 빠른 사이트가 아니라 사람이 기다리지 않아도 되는 사이트를 유지해야 한다.

이미지 용량, 레이아웃 이동, 모바일에서의 글 읽기와 클릭 반응을 실제 화면에서 확인한다.

새 라이브러리를 추가하기 전에 지금처럼 정적 HTML과 작은 자산으로 해결할 수 있는지 먼저 보는 편이 내 사이트에도 맞다.

</section>
<section class="data-card" markdown="1">
### 글이 충분히 쌓인 뒤에만 구조를 늘리기

현재 글 수에서는 블로그 목록과 태그, 관련 글 링크만으로도 충분하다.

글이 많아져 탐색이 어려워질 때 카테고리 허브, breadcrumb 구조화 데이터나 작성자 소개 페이지를 검토하면 된다.

아직 필요하지 않은 SEO 기능을 미리 늘리면 관리할 설정과 오류 지점만 많아질 수 있다.

</section>
</div>

## SEO 작업 뒤에 남은 것은 결국 글이다

이번 작업으로 공개하면 안 되는 관리 문서는 빠졌고, 한국어와 영어 페이지의 역할도 더 분명해졌다.

글을 공유할 때는 이미지가 함께 나타나고, 기존 글을 고치면 최초 발행일과 실제 수정일을 구분할 수 있다.

하지만 이 설정들이 방문자를 자동으로 데려오는 것은 아니다.

검색하는 사람이 궁금해하는 내용을 실제 경험과 확인한 사실로 꾸준히 쓰는 일이 먼저이며, SEO는 그 글이 검색엔진의 오해 없이 독자에게 도착하도록 길을 정리하는 작업이다.

블로그로 돈을 벌고 싶다는 생각은 광고 코드를 붙이는 데서 시작할 수 있지만, 실제 준비는 사람들이 찾을 만한 글을 쓰고 그 글이 검색엔진에 정확히 전달되는지 확인하는 데서 시작해야 한다.

<section class="article-ai-prompt" data-no-translation markdown="1">
## #AI프롬프트제공

아래 프롬프트를 AI에게 전달하면 자신의 GitHub Pages 사이트에서 기술 SEO의 누락과 잘못된 설정을 실제 결과를 기준으로 점검할 수 있다.

비밀번호, API 키, 토큰과 개인정보는 프롬프트에 입력하지 않는다.

```text
당신은 GitHub Pages와 Jekyll을 이해하는 기술 SEO 점검자입니다.

내 사이트의 저장소 파일과 공개 페이지를 함께 확인하고 다음 항목을 점검해 주세요.

- HTTPS 리디렉션과 하나의 대표 도메인
- 페이지별 canonical 주소
- robots.txt의 크롤링 규칙
- sitemap.xml의 공개 URL과 제외 대상
- 페이지별 고유 title과 meta description
- 한국어·영어 페이지의 canonical, hreflang, x-default 연결
- WebSite, WebPage, BlogPosting 구조화 데이터
- 블로그 글의 발행일과 실제 수정일 구분
- Open Graph와 X 공유 메타데이터
- heading 순서, 내부 링크, 이미지 대체 텍스트

각 항목을 `정상`, `개선 필요`, `확인 불가`로 판정해 주세요.

문제가 있다면 원인, 수정할 파일 또는 설정, 최소 수정안과 검증 방법을 제시해 주세요.

검색 순위를 보장하거나 확인하지 않은 내용을 추측하지 마세요.

수정 후에는 로컬 빌드만 보지 말고 공개 HTML, HTTP 상태, canonical, robots.txt와 sitemap.xml을 다시 확인해 주세요.

사이트 주소: [사이트 주소]
저장소 경로 또는 주소: [GitHub 저장소]
사용 환경: GitHub Pages와 Jekyll [버전]
지원 언어: [예: 한국어, 영어]
```
</section>

<p class="article-summary"><strong>한 줄 요약:</strong> SEO는 검색 순위를 억지로 올리는 기술이 아니라, 공개할 글의 주소·언어·제목·설명과 이력을 검색엔진이 정확히 이해하도록 정리하는 일이다.</p>

## 확인한 자료

- [Google 검색엔진 최적화 기본 가이드](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko)
- [Google의 중복 URL 통합 및 canonical 안내](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=ko)
- [Google의 다국어 사이트와 hreflang 안내](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ko)
- [Google의 sitemap 생성 및 제출 안내](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ko)
- [Google의 Article 구조화 데이터 안내](https://developers.google.com/search/docs/appearance/structured-data/article?hl=ko)
- [Google의 title link 작성 안내](https://developers.google.com/search/docs/appearance/title-link?hl=ko)
- [Google의 검색 결과 snippet 및 meta description 안내](https://developers.google.com/search/docs/appearance/snippet?hl=ko)
