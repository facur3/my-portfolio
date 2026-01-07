---
title: "From Data Scraping to Interactive Tools: Building the Prospecting Calculator"
description: "How I transformed thousands of wiki records into a production-ready probability calculator for a Roblox game, featuring real-time stat calculation and equipment optimization."
pubDate: 2025-11-15
tags: ["JavaScript", "Data Visualization", "Web Development", "ETL"]
---

## The Origin Story

The Roblox game "Prospecting" has complex probability mechanics for ore drops that depend on player stats (Luck, Capacity, Speed). Players were manually calculating these probabilities using spreadsheets—I wanted to build something better.

## Phase 1: Data Extraction

The first challenge was getting the data. The Prospecting Wiki contained hundreds of ore entries, but there was no API.

### Web Scraping Strategy

I used Python with **BeautifulSoup** to scrape:
- Ore names, rarities, and locations
- Base drop rates and multipliers
- Crafting recipes and costs

```python
from bs4 import BeautifulSoup
import pandas as pd

# Parse wiki tables
soup = BeautifulSoup(html, 'html.parser')
tables = soup.find_all('table', class_='wiki-table')

# Extract and normalize data
ores = []
for row in tables[0].find_all('tr')[1:]:
    cells = row.find_all('td')
    ores.append({
        'name': cells[0].text.strip(),
        'rarity': cells[1].text.strip(),
        'base_rate': float(cells[2].text.strip('%')) / 100
    })

# Export to JSON for frontend consumption
df = pd.DataFrame(ores)
df.to_json('ores.json', orient='records')
```

## Phase 2: The Calculator Interface

The frontend is built with **Vanilla JavaScript** (no framework overhead) and features:

### 1. Real-Time Probability Calculator
Users input their stats, and the calculator instantly shows exact drop rates for every ore, filtered by location or rarity.

### 2. Museum Planner
The Museum system grants bonuses based on which ores you display. My tool:
- Calculates total bonuses automatically
- Supports custom modifiers (Ore Weight, active multipliers)
- Includes preset builds (Max Luck, Max Capacity, Max Speed)

### 3. Equipment Manager
Players can create and save up to **3 loadouts**:
- Standard mode (6 ring slots)
- Premium mode (8 ring slots)
- Shows aggregated stats, recipes, and crafting costs

## Technical Highlights

### Efficient Filtering
With 200+ ores, filtering had to be instant. I used:
- **Debounced input** to reduce re-renders
- **Case-insensitive partial matching**
- **Multiple filter dimensions** (name, location, rarity)

```javascript
function filterOres(searchTerm, location, rarity) {
  return ores.filter(ore => {
    const matchesName = ore.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || ore.location === location;
    const matchesRarity = !rarity || ore.rarity === rarity;
    return matchesName && matchesLocation && matchesRarity;
  });
}
```

### Responsive Layout
The interface adapts to screen size:
- **Mobile**: Stacked inputs, vertical layout
- **Desktop**: Row-based inputs, multi-column display

## Lessons Learned

1. **ETL is 80% of the work** - Cleaning and normalizing scraped data took longer than building the UI
2. **TypeScript would have helped** - With complex nested objects, type safety would prevent bugs
3. **User feedback is invaluable** - The community suggested features I hadn't considered (like batch efficiency estimation)

## Impact

The calculator is now used by **thousands of players** daily. It's hosted on [Vercel](https://prospecting-calculator.vercel.app/) with instant global CDN delivery.

Players have reported it saves them hours of manual calculation, and the museum planner has become essential for min-maxing builds.

---

Try it yourself: [Prospecting Calculator](https://prospecting-calculator.vercel.app/)  
Source code: [GitHub](https://github.com/facur3/prospecting-calculator)
