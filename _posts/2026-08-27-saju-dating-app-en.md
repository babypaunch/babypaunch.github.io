---
layout: post
locale: en
page_key: blog
title: I studied Saju to turn an idea into an app
description: I studied the Heavenly Stems and Earthly Branches before building a Saju dating app that treats compatibility as a conversation starter, not a verdict.
category: Making
date: 2026-08-27 14:30:00 +0900
last_modified_at: 2026-09-02 11:06:06 +0900
permalink: /en/blog/saju-dating-app/
language_url: /blog/saju-dating-app/
alternate_ko: /blog/saju-dating-app/
alternate_en: /en/blog/saju-dating-app/
tags:
  - saju
  - dating-app
  - product-design
---

I had always wanted to make something related to Saju someday.

Then an acquaintance casually said something that stayed with me.

“Wouldn't a dating app based on Saju compatibility be fun?”

The idea felt fresh immediately.

It also brought a small moment of regret.

`Why didn't I think that far?`

Still, I felt some resistance. The word `Saju` itself was probably the reason. I was familiar with zodiac animals, unlucky years, and compatibility readings, but I could not properly explain what Saju calculated or how its interpretations were made.

So I studied Saju before building the app.

I was not trying to make myself believe it.

I wanted to understand how I should handle this old system responsibly.

<p class="article-question">Could Saju become a reason to start a conversation instead of a scorecard for rejecting people?</p>

That question eventually shaped the Saju dating app.

## What are the Four Pillars (四柱) and Eight Characters (八字)?

Saju (四柱) literally means four pillars. A person's birth year, month, day, and hour each become one pillar.

<div class="data-cards">
  <section class="data-card"><h3>Year pillar</h3><p><strong>Chinese:</strong> 年柱</p><p><strong>Meaning:</strong> The pillar for the birth year</p></section>
  <section class="data-card"><h3>Month pillar</h3><p><strong>Chinese:</strong> 月柱</p><p><strong>Meaning:</strong> The pillar for the birth month</p></section>
  <section class="data-card"><h3>Day pillar</h3><p><strong>Chinese:</strong> 日柱</p><p><strong>Meaning:</strong> The pillar for the birth day</p></section>
  <section class="data-card"><h3>Hour pillar</h3><p><strong>Chinese:</strong> 時柱</p><p><strong>Meaning:</strong> The pillar for the birth hour</p></section>
</div>

Each pillar contains one Heavenly Stem (天干) above and one Earthly Branch (地支) below. Two characters across four pillars make eight characters, or Bazi (八字). Together, the system is called the Four Pillars and Eight Characters (四柱八字).

<div class="data-cards">
  <section class="data-card"><h3>Heavenly Stem (天干)</h3><p><strong>Year:</strong> 甲</p><p><strong>Month:</strong> 戊</p><p><strong>Day:</strong> 戊</p><p><strong>Hour:</strong> 丙</p></section>
  <section class="data-card"><h3>Earthly Branch (地支)</h3><p><strong>Year:</strong> 戌</p><p><strong>Month:</strong> 辰</p><p><strong>Day:</strong> 辰</p><p><strong>Hour:</strong> 辰</p></section>
</div>

This is an example of the app's calculation structure. It shows the eight characters, but the characters themselves do not prove anything about a real person's personality or future.

## The ten Heavenly Stems (天干)

There are ten Heavenly Stems, also called the Ten Stems (十干).

`甲 乙 丙 丁 戊 己 庚 辛 壬 癸`

In Korean, they are read as `gap (甲), eul (乙), byeong (丙), jeong (丁), mu (戊), gi (己), gyeong (庚), sin (辛), im (壬), and gye (癸)`.

The traditional system connects them to Yin (陰) and Yang (陽), and to the Five Elements (五行): Wood (木), Fire (火), Earth (土), Metal (金), and Water (水).

<div class="data-cards data-cards-compact">
  <section class="data-card"><h3>甲</h3><p><strong>Polarity:</strong> Yang (陽)</p><p><strong>Element:</strong> Wood (木)</p></section>
  <section class="data-card"><h3>乙</h3><p><strong>Polarity:</strong> Yin (陰)</p><p><strong>Element:</strong> Wood (木)</p></section>
  <section class="data-card"><h3>丙</h3><p><strong>Polarity:</strong> Yang (陽)</p><p><strong>Element:</strong> Fire (火)</p></section>
  <section class="data-card"><h3>丁</h3><p><strong>Polarity:</strong> Yin (陰)</p><p><strong>Element:</strong> Fire (火)</p></section>
  <section class="data-card"><h3>戊</h3><p><strong>Polarity:</strong> Yang (陽)</p><p><strong>Element:</strong> Earth (土)</p></section>
  <section class="data-card"><h3>己</h3><p><strong>Polarity:</strong> Yin (陰)</p><p><strong>Element:</strong> Earth (土)</p></section>
  <section class="data-card"><h3>庚</h3><p><strong>Polarity:</strong> Yang (陽)</p><p><strong>Element:</strong> Metal (金)</p></section>
  <section class="data-card"><h3>辛</h3><p><strong>Polarity:</strong> Yin (陰)</p><p><strong>Element:</strong> Metal (金)</p></section>
  <section class="data-card"><h3>壬</h3><p><strong>Polarity:</strong> Yang (陽)</p><p><strong>Element:</strong> Water (水)</p></section>
  <section class="data-card"><h3>癸</h3><p><strong>Polarity:</strong> Yin (陰)</p><p><strong>Element:</strong> Water (水)</p></section>
</div>

Traditional readings use the Day Stem (日干), the Heavenly Stem in the Day Pillar, as their central reference. It represents the self, and the other characters are classified by how they relate to it.

## The twelve Earthly Branches (地支)

There are twelve Earthly Branches.

`子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥`

In Korean, they are read as `ja (子), chuk (丑), in (寅), myo (卯), jin (辰), sa (巳), o (午), mi (未), sin (申), yu (酉), sul (戌), and hae (亥)`.

I had known the branches mostly through zodiac animals.

In the traditional calendar, however, they are also associated with months, two-hour time periods, seasons, and directions.

The Zi hour (子時), for example, covers `23:00–00:59`, followed by the Chou hour (丑時) at `01:00–02:59`.

My app uses the same twelve periods to calculate the Hour Branch (時支). If someone does not know their birth time, the app leaves out the entire Hour Pillar. Showing uncertainty honestly seemed better than inventing a precise answer.

## The Sexagenary Cycle (六十甲子)

The ten Heavenly Stems and twelve Earthly Branches are paired in sequence to form the Stem-Branch system (干支). The cycle begins with Jiazi (甲子), followed by Yichou (乙丑).

This does not produce all `10 × 12 = 120` theoretical pairs.

Stems and branches of matching Yin or Yang parity meet in sequence, producing sixty distinct pairs.

After Guihai (癸亥), the cycle returns to Jiazi (甲子).

This is the Sexagenary Cycle (六十甲子).

Saju places a birth moment within that cycle as a Year, Month, Day, and Hour Pillar.

The conversion is more than replacing calendar numbers with Chinese characters. The Year and Month Pillars use solar-term boundaries (節氣). Even after January 1, a Saju year can remain in the previous year until the Beginning of Spring, Ipchun (立春). Month Pillars also change at boundaries such as Ipchun (立春), Gyeongchip (驚蟄), and Cheongmyeong (淸明), not simply on the first day of each calendar month.

The app uses the actual solar-term time in the selected birthplace time zone.

Its current calculation range is `1900–2100`.

It does not accept lunar dates (陰曆) or leap lunar months (閏月) because I do not yet have a sufficiently verified conversion dataset.

Refusing to pretend is also part of accuracy.

## Using the Five Elements (五行) only as symbolic language

The Five Elements are Wood (木), Fire (火), Earth (土), Metal (金), and Water (水). Traditional Saju assigns each stem and branch to one element and examines generating (生) and controlling (剋) relationships.

- Wood generates Fire, 木生火.
- Fire generates Earth, 火生土.
- Earth generates Metal, 土生金.
- Metal generates Water, 金生水.
- Water generates Wood, 水生木.

There is also a controlling cycle (相剋).

- Wood controls Earth, 木剋土.
- Earth controls Water, 土剋水.
- Water controls Fire, 水剋火.
- Fire controls Metal, 火剋金.
- Metal controls Wood, 金剋木.

Traditional interpretations value the relationships and balance among these elements. To translate them into modern wording, the app uses Wood as an image of growth and beginnings, Fire as expression and response, Earth as accumulation and mediation, Metal as organization and judgment, and Water as movement and exploration.

These are not scientifically measured personality traits. There is no basis for declaring that someone must be driven because they have more Wood, or inflexible because they lack Water. The app's element scores are internal comparison values based on the distribution of characters, not measurements of ability or probabilities of future events.

That is why the app does not say, `You are a problem because you have no Water (水).` It presents the traditional interpretation and its limits, then turns it into a question someone can use for reflection.

## The Ten Stars (十星) describe relationships to the Day Stem

The names of the Ten Stars (十星) looked difficult at first.

`比肩 劫財 食神 傷官 偏財 正財 偏官 正官 偏印 正印`

They classify another stem according to its elemental and Yin-Yang relationship with the Day Stem (日干).

<div class="data-cards">
  <section class="data-card"><h3>Same element</h3><p><strong>Same polarity:</strong> Bi-gyeon (比肩)</p><p><strong>Different polarity:</strong> Geop-jae (劫財)</p></section>
  <section class="data-card"><h3>Generated by the self</h3><p><strong>Same polarity:</strong> Sik-sin (食神)</p><p><strong>Different polarity:</strong> Sang-gwan (傷官)</p></section>
  <section class="data-card"><h3>Controlled by the self</h3><p><strong>Same polarity:</strong> Pyeon-jae (偏財)</p><p><strong>Different polarity:</strong> Jeong-jae (正財)</p></section>
  <section class="data-card"><h3>Controlling the self</h3><p><strong>Same polarity:</strong> Pyeon-gwan (偏官)</p><p><strong>Different polarity:</strong> Jeong-gwan (正官)</p></section>
  <section class="data-card"><h3>Generating the self</h3><p><strong>Same polarity:</strong> Pyeon-in (偏印)</p><p><strong>Different polarity:</strong> Jeong-in (正印)</p></section>
</div>

Once I understood this, I could at least see how the difficult names were produced. The Ten Stars still do not objectively determine a person's occupation, wealth, or partner. The app explains the traditional categories but does not use them to recommend major life decisions.

## I did not want compatibility (宮合) to end with one score

The original idea was a Saju compatibility dating app, so it needed to compare two people.

`Your compatibility score is 92.`

That is simple and easy to notice.

But a relationship loses important detail when it becomes one verdict.

Initial attraction can differ from long-term stability.

Two people may communicate well but disagree about daily habits or money.

The app therefore separates attraction, stability, communication, growth, stress, and the current context. These are not scientifically validated predictors of relationship success. They are reference values created by the app from the Five Elements (五行), Ten Stars (十星), combinations (合), clashes (沖), and the relationship goals selected by the user.

The overall score is not the probability of a successful relationship.

A low score does not automatically remove another person.

The app also avoids statements such as `the worst match`, `marriage will make you unhappy`, or `you should break up`.

I did not want an app that decided whether someone was worth meeting.

- Where might two people feel comfortable together?
- What should they check about their pace and style of communication?
- Do their real habits and values work together?
- Can either person step away safely when behavior becomes uncomfortable or dangerous?

I wanted compatibility to start those conversations instead of filtering people out.

## Saju is not a scientific personality test or prediction model

The question cannot be avoided.

Is Saju science?

There has been some research comparing Four Pillars theory with personality measures. One exploratory study published in 2015 reported associations for some combined variables, while relationships were weak when major variables were examined independently and significant correlations were concentrated in only a few measures. Those limited findings do not establish that Saju can reliably predict an individual's personality, occupation, relationships, or future events.

Science builds testable explanations, compares them continuously with evidence, and revises them when they do not fit. The app therefore does not present Saju as a validated personality test or a probability of relationship success.

I also had to consider the Barnum effect: the tendency to accept a vague, general description as if it had been written specifically for oneself.

`You look strong on the outside, but you also have a sensitive side.`

That sentence can fit many people. Feeling that it is uniquely accurate does not prove the calculation or interpretation.

The app therefore shows which pillars, elements, stars, combinations, and clashes contributed to an explanation. This is not meant to make anyone believe more strongly. It lets people see where a result came from and what it does not mean.

## Not selling anxiety came first

Saju touches relationships, money, health, and the future—the subjects that easily make people anxious. Combining it with a dating service requires even more care.

I set several rules while building the app.

- Do not speak as if predicting an unavoidable event.
- Do not create fear.
- Do not replace major health, legal, financial, or relationship decisions.
- Do not insult or automatically exclude people because of a low score.
- Remind users that communication, respect, values, and safety matter more in a real relationship.

The service follows the same principles. Only people who explicitly join recommendations can appear to others. A one-sided expression of interest does not open a conversation; matching and chat begin only after mutual interest. Blocking someone or leaving recommendations closes any active match and conversation.

Birth information also requires care. A birth date, birth time, and birthplace time zone can help identify a person or support personal inferences. New profiles begin as private, and users choose what to disclose when joining recommendations. Other members do not see the original birth date, birth time, or full calculation assumptions.

## The idea became a real app

The original suggestion was simple.

“Wouldn't a dating app based on Saju compatibility be fun?”

That idea has become an Android app with a Saju chart, personal readings, compatibility reports, recommendations, mutual interest, chat, reporting, and blocking. It has not completed a public release yet; Google Play internal testing and production preparation are still in progress.

At first, I thought mostly about how to calculate compatibility. Building the app changed the important questions.

Not how to make Saju look convincing, but how to translate an old symbolic system into modern language safely.

Not how to display the highest possible score, but how to make it clear that a score is neither a person's value nor a relationship's destiny.

Not how to match people faster, but how to help them understand each other a little less hastily without giving up safety or personal choice.

A person is much more complicated than eight characters. A relationship is built from more than two charts. Communication, values, habits, attitudes toward money, respect, safety, and lived experience matter more.

Still, I think Saju can prompt useful questions about oneself and a relationship. Not as an answer sheet for predicting the future, but as an old symbolic language that helps a conversation begin more slowly.

<p class="article-summary"><strong>In one line:</strong> I built a Saju dating app that treats compatibility not as a verdict on fate, but as a starting point for understanding ourselves and each other a little less hastily.</p>

## Sources

- [Encyclopedia of Korean Culture, “Saju”](https://encykorea.aks.ac.kr/Article/E0025957)
- [UC Berkeley Understanding Science, criteria for evaluating science](https://newsarchive.berkeley.edu/news/media/releases/2009/01/08_understandingscience.shtml)
- [Yonsei Medical Journal, an exploratory study of Four Pillars theory and personality measures](https://pmc.ncbi.nlm.nih.gov/articles/PMC4397439/)
- [APA Dictionary of Psychology, “Barnum effect”](https://dictionary.apa.org/barnum-effect)
- [Bertram R. Forer, “The fallacy of personal validation”](https://pubmed.ncbi.nlm.nih.gov/18110193/)
