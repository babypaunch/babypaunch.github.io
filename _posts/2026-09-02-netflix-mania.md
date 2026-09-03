---
layout: post
locale: ko
page_key: blog
title: 넷플릭스도 편하게 사용하고 싶었다.
description: 넷플릭스 기본 배속 메뉴에 단축키를 연결하면서 영상과 음성의 싱크 문제를 피한 과정을 정리했다.
image: /assets/images/blog/netflix-mania-popup.webp
image_alt: 넷플릭스 화면 위에 열린 Netflix Mania 팝업과 배속 단축키 안내
category: Making
date: 2026-09-02 00:00:00 +0900
last_modified_at: 2026-09-03 15:06:40 +0900
permalink: /blog/netflix-mania/
language_url: /en/blog/netflix-mania/
alternate_ko: /blog/netflix-mania/
alternate_en: /en/blog/netflix-mania/
tags:
  - chrome-extension
  - netflix-mania
---

윈도우 노트북으로 넷플릭스를 보다 보면 재생 속도를 자주 바꾸게 된다.

넷플릭스 플레이어에는 배속 메뉴가 있지만, 속도를 바꿀 때마다 마우스로 메뉴를 열고 원하는 값을 다시 선택해야 한다.

이미 Laftel Mania를 만들며 비슷한 불편을 해결해 본 적이 있어서 이번에도 단축키 두 개면 충분하다고 생각했다. (넷플릭스는 기본적으로 창을 크게 띄워주니까.)

<figure class="article-figure">
  <img src="/assets/images/blog/netflix-mania-popup.webp" alt="넷플릭스 화면 위에 열린 Netflix Mania 팝업에서 배속 단축키를 안내하는 모습" width="1280" height="800" loading="lazy">
  <figcaption>Netflix Mania는 넷플릭스 웹 플레이어에서 배속 단축키 두 개만 제공한다.</figcaption>
</figure>

## 처음에는 영상을 직접 제어했다

첫 버전은 페이지 안의 영상 요소를 찾아 `playbackRate` 값을 직접 바꾸고, 마지막 속도를 저장해 다음 영상에도 적용하는 방식이었다.

단축키와 화면 알림은 잘 동작했지만 실제로 영상을 재생해 보니 소리와 화면의 싱크가 분명하게 어긋났다.

## 결국 넷플릭스의 기본 배속 메뉴를 사용했다

직접 속도를 바꾸는 코드를 버리고 넷플릭스 플레이어가 제공하는 기본 배속 메뉴를 단축키로 조작하도록 바꿨다.

지원 속도는 넷플릭스 메뉴와 같은 `0.50x`, `0.75x`, `1.00x`, `1.25x`, `1.50x` 다섯 단계다.

`Shift + <`를 누르면 한 단계 느려지고 `Shift + >`를 누르면 한 단계 빨라지며, 양 끝에서는 더 이상 바뀌지 않는다.

이 방식은 넷플릭스가 원래 쓰는 재생 흐름을 따르기 때문에 직접 제어할 때 생겼던 싱크 문제도 피할 수 있었다.

## 메뉴를 닫는 마지막 한 번의 클릭

단축키로 속도를 선택한 뒤에도 넷플릭스의 배속 메뉴가 화면에 남는 문제가 있었다.

처음에는 배속 버튼을 다시 누르면 닫힐 거라고 생각했지만 실제 동작은 달랐고, 화면 가운데를 한 번 클릭하면 메뉴가 자연스럽게 닫힌다는 것을 확인했다.

그래서 단축키를 누르면 배속 메뉴를 열고, 다음 속도를 선택하고, 화면 가운데를 클릭해 메뉴를 닫은 뒤, 현재 속도를 2초 동안 보여주도록 순서를 정했다.

## 한글 입력 중에도 같은 단축키

한글 입력 상태에서는 브라우저가 누른 글쇠를 `Process`로 전달할 때가 있어서 문자보다 키보드의 물리 위치를 나타내는 `Comma`와 `Period` 코드를 기준으로 처리했다.

덕분에 한글을 입력하던 중에도 `Shift + <`와 `Shift + >`가 같은 배속 단축키로 동작한다.

## 필요한 기능만 남긴 팝업

팝업은 Laftel Mania의 작은 구조를 재사용하되 넷플릭스에 맞는 빨간색과 검은색, 새 NM 아이콘으로 정리했다.

실제로 제공하는 기능이 배속 조절뿐이므로 팝업에도 두 단축키 사용법만 적었다.

## 저장하거나 전송하는 데이터는 없다

Netflix Mania는 계정 정보, 시청 기록, 방문 기록과 페이지 내용을 수집하지 않고 별도 서버로 전송하지도 않는다.

마지막 재생 속도도 따로 저장하지 않으며, 자세한 내용은 [개인정보처리방침](/policies/netflix-mania/privacy/)에서 확인할 수 있다.

Netflix Mania는 Netflix가 제작·승인·보증하거나 Netflix와 제휴한 공식 제품이 아닌 비공식 확장 프로그램이다.

현재 Chrome Web Store 등록 절차를 진행하고 있어서 아직 공개 설치 링크는 없다.

<p class="article-summary"><strong>한 줄 요약:</strong> 영상 속도를 직접 바꿔 음성 싱크가 어긋난다면, 사이트가 제공하는 기본 배속 메뉴를 단축키로 조작하는 편이 더 안정적이다.</p>
