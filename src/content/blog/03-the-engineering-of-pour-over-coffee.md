---
title: "The Engineering of Pour-Over Coffee: Dialing In Grind Distribution, Extraction & Flow Dynamics"
description: "How a senior data engineer approaches the morning cup: particle size distribution, bypass ratios, water mineral chemistry, and mastering the V60 4:6 technique."
pubDate: 2026-07-22
category: "Coffee & Brewing"
tags: ["Coffee", "Pour Over", "V60", "Dial-In", "Extraction", "Engineering"]
readTime: "8 min read"
featured: true
---

There is a direct cognitive parallel between tuning distributed PySpark partitions and dialing in a high-elevation washed Ethiopian heirloom on a V60. Both involve fluid dynamics, surface area optimization, parameter constraints, and repeatable feedback loops.

If you know me outside of data architecture and agentic harnesses, you know I am obsessed with specialty coffee. Here is how I approach the science of brewing pour-overs at home.

---

## 1. Particle Size Distribution: Why the Grinder Is 80% of the Cup

Most people assume the brew method or the dripper matters most. In reality, **the burr set and particle distribution dictate extraction ceiling**.

```
[Cheaper Blade / Ghost Burrs] ──> High fines (<100µm) + Boulder chunks (>1200µm) ──> Bitter & Astringent / Sour Channelling
[High-Precision Conical / Flat Burrs] ──> Unimodal / Controlled Bimodal curve (600-800µm) ──> Clean, sweet, vibrant acidity
```

### The Problem of "Fines"
When coffee beans shatter between steel burrs, they produce:
1. **Target particles** (ideally 600–800 microns for pour-over).
2. **Boulders** (underextracted, sour, grassy).
3. **Fines** (microscopic particles <100 microns).

Fines migrate with water flow, clogging the paper filter pores ("filter stalling"). This causes localized pooling, extending contact time and overextracting bitter chlorogenic acid derivatives. 

In my setup, I separate workflows by purpose:
- **Espresso & Flat Whites**: A **DF54 flat burr grinder** single-dosing into a **Sage Barista Pro** at 9-bar pre-infusion, delivering rich crema, thick mouthfeel, and sweet balanced extractions for morning milk drinks.
- **Precision Pour-Overs**: The legendary **1Zpresso ZP6 Special** hand grinder. With its calibrated external dial (60 clicks per rotation) and specialized geometry, it produces an extraordinarily unimodal particle curve with virtually zero fines, unlocking pristine floral clarity and sparkling tea-like acidity on light roasts.

---

## 2. Water Chemistry: The Solvent Architecture

Coffee is 98.5% water. If your solvent is unbalanced, even an award-winning Geisha will taste flat or chalky.

The two key metrics:
- **General Hardness (GH - Calcium & Magnesium)**: Magnesium ions ($\text{Mg}^{2+}$) bind efficiently to volatile oxygen-rich flavor compounds, pulling out fruit notes and floral acidity. Calcium ($\text{Ca}^{2+}$) pulls heavier body and creamy notes.
- **Carbonate Hardness (KH / Buffer)**: Bicarbonate buffers acidity. If alkalinity is too high (>50 ppm $\text{CaCO}_3$), the bright phosphoric and malic acidity of African coffees gets muted into boring cardboard. If it is too low (<15 ppm), the cup tastes sharp and sour.

My daily target: **50 ppm GH, 20 ppm KH** using distilled water remineralized with magnesium sulfate and sodium bicarbonate.

---

## 3. Conical vs. Flat-Bottom Geometry

- **Hario V60 (Conical, 60° Angle)**: Fast flow rate, spiral ribs encourage water vortex and bypass. Demands precise kettle pouring technique. Highlights transparent florals, stone fruit, and tea-like bergamot body.
- **Kalita Wave / Orea V3 (Flat-Bottom)**: Horizontal coffee bed with minimal bypass. Higher uniform extraction yield (EY 20–22%), syrupy mouthfeel, and rounder sweetness with chocolate/caramel undertones.

---

## 4. The Daily V60 4:6 Method (Tetsu Kasuya Inspired)

When I want maximum sweetness and balanced acidity, I use a modified 4:6 method with a slightly coarser grind:

### Recipe Variables:
- **Dose**: 20g coffee
- **Total Water**: 300g (1:15 ratio)
- **Water Temp**: 93°C (for light roasts)
- **Grind**: Medium-coarse (dial setting ~4.2 – 4.5 on the 1Zpresso ZP6 Special)

```
00:00 - 00:45 | Pour 1: 60g bloom (activates degassing, sets acid balance)
00:45 - 01:30 | Pour 2: 60g (balances sweetness)
01:30 - 02:15 | Pour 3: 60g (starts strength phase)
02:15 - 03:00 | Pour 4: 60g (body & texture)
03:00 - 03:30 | Pour 5: 60g (final drawdown, flat bed)
```

The result? Crisp clarity, juicy nectarine sweetness, and a lingering floral finish.

Coffee, much like engineering, rewards patience, observation, and continuous calibration.
