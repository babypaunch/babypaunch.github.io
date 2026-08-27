---
layout: post
locale: ko
page_key: blog
title: 바이브 코딩하면서 애니를 보기 위해 만든 Laftel Mania
description: 화면 한쪽에서 바이브 코딩하고 다른 쪽에서 애니를 볼 때 필요한 배속 단축키와 OSD를 만들었다.
image: /assets/images/blog/laftel-mania-vibe-coding-workspace.webp
image_alt: 노트북 화면에서 바이브 코딩과 Laftel Mania의 재생 속도 OSD를 함께 사용하는 모습
category: Making
date: 2026-08-26 00:00:00 +0900
permalink: /blog/laftel-mania/
language_url: /en/blog/laftel-mania/
alternate_ko: /blog/laftel-mania/
alternate_en: /en/blog/laftel-mania/
tags:
  - chrome-extension
  - vibe-coding
  - laftel-mania
---

나는 노트북 한 대로 개발하는 일이 많다.

바이브 코딩을 하다 보면 AI가 작업을 마칠 때까지 여유 시간이 생긴다. 그렇다고 완전히 다른 일에 빠지면 작업이 끝난 시점을 놓치기 쉽다. 기왕이면 종료 시간에 맞춰 바로 다음 작업을 이어가는 편이 좋았다.

그래서 노트북 화면을 나눴다. 화면의 1/3에서는 AI 바이브 코딩을 진행하고, 남은 2/3에서는 애니메이션을 보거나 다른 가벼운 일을 했다.

라프텔로 애니를 많이 보는 편인데, 재생 속도를 바꾸려면 플레이어 메뉴를 열고 원하는 속도를 다시 선택해야 했다.

그때 이런 생각을 하게 되었다.

<p class="article-question">왜 라프텔에는 키보드로 재생 속도를 바꾸는 단축키가 없을까?</p>

Laftel Mania는 이 불편함을 해결하려고 만든 Chrome 확장 프로그램이다.

<figure class="article-figure">
  <img src="/assets/images/blog/laftel-mania-vibe-coding-workspace.webp" alt="노트북 화면 왼쪽에서 바이브 코딩을 하고 오른쪽 라프텔 플레이어에서 1.50배속 OSD를 확인하는 모습" width="1604" height="981" loading="lazy">
  <figcaption>바이브 코딩과 애니메이션 시청을 한 화면에서 함께하는 모습. 영상은 기능 설명을 위한 저작권 없는 샘플이다.</figcaption>
</figure>

## 마우스 대신 단축키로 배속 바꾸기

`Shift + ,`를 누르면 재생 속도가 0.25배 느려지고, `Shift + .`를 누르면 0.25배 빨라진다. 속도는 `0.25x`부터 `4.00x`까지 조절할 수 있다.

마우스로 플레이어 메뉴를 찾을 필요가 없다. 단축키로 바로 속도를 바꿀 수 있다.

마지막으로 선택한 속도도 기억한다. 다음 영상을 열면 이전에 사용하던 속도가 자동으로 적용된다. 매번 같은 속도를 다시 선택하지 않아도 된다.

## 바뀐 속도를 바로 보여주는 OSD

단축키는 빠르지만 화면에 변화가 보이지 않으면 제대로 눌렀는지 알기 어렵다. 그래서 속도를 바꿀 때마다 화면 위쪽에 현재 배속을 크게 표시하는 OSD를 넣었다.

예를 들어 속도를 높이면 `1.25x`, `1.50x`처럼 현재 값이 바로 나타난다. 약 0.8초 동안 표시된 뒤 자동으로 사라져 영상 시청을 방해하지 않는다.

OSD는 다음 세 가지를 중요하게 봤다.

- 영상을 보면서 바로 알아볼 수 있을 것
- 현재 속도를 정확하게 표시할 것
- 확인한 뒤에는 빠르게 사라질 것

## 영상만 남기는 집중 모드

화면을 나눠 쓰다 보면 라프텔의 메뉴와 주변 화면이 답답하게 느껴질 때가 있다. `Shift + M`을 누르면 주변을 검게 가리고 영상만 화면 중앙에 보여주는 집중 모드가 켜진다.

페이지나 영상을 새로 불러오지 않기 때문에 재생 중인 상태를 유지할 수 있다. 다시 `Shift + M`을 누르면 원래 화면으로 돌아온다. `/` 키를 누르면 사용할 수 있는 단축키도 바로 확인할 수 있다.

## 저장하는 정보는 재생 속도 하나

Laftel Mania가 저장하는 정보는 마지막 재생 속도 하나뿐이다. 이 값은 사용자의 Chrome 동기화 저장소에 보관되며 별도 개발자 서버로 보내지 않는다.

로그인 정보, 방문 기록, 애니메이션 시청 기록과 페이지 내용도 수집하지 않는다. 자세한 내용은 [개인정보처리방침](/policies/laftel-mania/privacy/)에서 확인할 수 있다.

Laftel Mania는 라프텔이 만들거나 승인한 공식 제품이 아닌 비공식 확장 프로그램이다. 현재 버전은 `1.3.0`이며 [Chrome Web Store에서 설치할 수 있다](https://chromewebstore.google.com/detail/laftel-mania/ffpoolknghcckcdkaomkbhginppamkcp).

시작은 단순했다. AI가 작업하는 시간을 놓치지 않으면서 애니메이션도 편하게 보고 싶었다. 그때 느낀 작은 불편을 단축키와 잘 보이는 OSD로 해결한 것이 Laftel Mania다.

<p class="article-summary"><strong>한 줄 요약:</strong> 노트북 한 대로 바이브 코딩과 애니메이션 시청을 함께한다면 Laftel Mania를 사용해 보자. 배속은 <code>1.5x</code>를 추천한다.</p>
