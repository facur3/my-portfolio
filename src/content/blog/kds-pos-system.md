---
title: "Building a Real-Time Kitchen Display System with WebSockets"
description: "How I built a modern restaurant management system with real-time order synchronization, station-based routing, and third-party integration with DoorDash and Uber Eats APIs."
pubDate: 2026-01-05
tags: ["React", "Node.js", "WebSockets", "Full-Stack"]
---

## The Challenge

When I started building Angel's Kitchen, the goal was clear: create a modern Point of Sale (POS) and Kitchen Display System (KDS) that could handle real-time order management for a busy empanada restaurant. The system needed to support both local orders and integrate seamlessly with delivery platforms like DoorDash and Uber Eats.

## Architecture Overview

The system is built with a clear separation of concerns:

- **Frontend**: React with real-time WebSocket connections
- **Backend**: Node.js with Express handling REST API and WebSocket events
- **Database**: PostgreSQL for order persistence and inventory management
- **Third-Party Integrations**: DoorDash Drive API and Uber Eats Marketplace API

## Key Features

### 1. Real-Time Order Sync

Using **Socket.IO**, orders are instantly pushed to the KDS as soon as they're created. Kitchen staff see new orders appear without refreshing, with audio notifications to ensure nothing gets missed.

```javascript
// Server-side WebSocket emission
io.emit('newOrder', {
  orderId: order.id,
  items: order.items,
  station: 'fritura',
  priority: 'normal'
});
```

### 2. Station-Based Routing

Orders are automatically routed to the correct station (Fritura, Horno, Mostrador) based on the items. Each station only sees relevant orders, reducing cognitive load for kitchen staff.

### 3. Ingredient Modifiers

The POS allows customers to add or remove ingredients with clear visual distinction:
- **Removed items**: Red text with "-" prefix
- **Added items**: Blue text with "+" prefix

### 4. Third-Party Integration

The system listens for webhooks from DoorDash and Uber Eats, automatically creating orders in the database and pushing them to the KDS with proper source identification.

## Performance Optimizations

- **Debounced state updates** to prevent excessive re-renders
- **Optimistic UI updates** for instant feedback
- **Connection resilience** with automatic WebSocket reconnection

## Lessons Learned

1. **Real-time systems require careful state management** - WebSocket events can arrive out of order
2. **Error handling is critical** - Network failures should never break the user experience
3. **Visual feedback matters** - Kitchen staff need instant, obvious notifications for new orders

## What's Next?

Future improvements include:
- Item-level "bump" functionality for better order tracking
- Analytics dashboard for sales and performance metrics
- Integration with more delivery platforms

---

Check out the [live demo](https://angels-kitchen-frontend.onrender.com/) or explore the [source code](https://github.com/facur3/angels-kitchen-system).
