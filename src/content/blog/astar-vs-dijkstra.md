---
title: "A* vs Dijkstra: Performance Analysis in Grid-Based Pathfinding"
description: "Deep dive into implementing and comparing pathfinding algorithms for a GTA-inspired traffic simulator. A* reduces node exploration by 60% compared to Dijkstra in dynamic urban environments."
pubDate: 2025-12-20
tags: ["Java", "Algorithms", "Data Structures", "Performance"]
---

## Introduction

For my university project "Manejando por la Ciudad" (inspired by GTA VI), I had to implement a GPS system that calculates optimal routes in real-time through a dynamic city grid. This meant comparing three pathfinding algorithms under identical conditions: **A***, **Dijkstra**, and **Floyd-Warshall**.

## The Problem

The game simulates urban traffic with:
- **Grid-based maps** (15x30, 20x20, 30x15 cells)
- **Dynamic traffic congestion** (5x time penalty)
- **Variable vehicle speeds**
- **Random start/destination points**

The GPS must recalculate the path **every time the player moves**, making performance critical.

## Experimental Setup

I ran **20 executions per scenario**, measuring:
- ⏱️ **Time (ms)**
- 📊 **Nodes explored**
- 🔄 **Algorithmic steps**
- 📏 **Path distance**

All tests used the same seed for reproducibility.

## Results

### Small Maps (10×10)

On tiny maps, all algorithms perform similarly. A* explores ~40 nodes, Dijkstra ~60, but execution times are nearly identical (~2ms) due to low overhead.

### Medium Maps (15×30)

This is where A* shines:

| Algorithm | Nodes Explored | Time (ms) |
|-----------|---------------|-----------|
| **A***    | 200-300       | ~8        |
| **Dijkstra** | 900        | ~15       |
| **Floyd-Warshall** | All | ~12,000   |

**A* reduces exploration by 60%** compared to Dijkstra by using the Manhattan heuristic to guide the search toward the goal.

### Large Maps (30×15 with obstacles)

Floyd-Warshall becomes completely impractical. With O(n³) complexity, it executes **28 million steps** and takes over **12 seconds**, while A* still completes in under 10ms.

## Why A* Wins

The **Manhattan distance heuristic** is:
- ✅ **Admissible** (never overestimates)
- ✅ **Consistent** (satisfies triangle inequality)
- ✅ **Fast to compute** (simple arithmetic)

This allows A* to prioritize nodes that are closer to the destination, avoiding unnecessary exploration.

```java
private int manhattanDistance(Node current, Node goal) {
    return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y);
}
```

## When Dijkstra Makes Sense

Dijkstra is preferable when:
- You need paths to **all nodes** (single-source shortest path)
- The graph has **negative weights** (A* requires non-negative)
- There's **no good heuristic** available

## Dynamic Traffic Adaptation

An interesting finding: changing vehicle speed or adding congestion **doesn't affect algorithm performance**—only edge weights change, not the graph structure. This means A* remains consistently fast even in heavy traffic.

## Conclusion

For real-time GPS in grid-based games:
- **Use A*** for point-to-point pathfinding
- **Avoid Floyd-Warshall** unless you need all-pairs shortest paths
- **Heuristic quality matters more than optimization tricks**

The full experimental report (with graphs and statistical analysis) is available in the [project repository](https://github.com/facur3/tpg-2c2025-recursivos).
