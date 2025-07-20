# Global Wave Animation System

This document describes the implementation of a global wave animation system that applies to all dashboard features in the Nexus application.

## 🎯 Overview

The global wave animation system provides a consistent, smooth animation experience across all dashboard components. Instead of mount-based animations, it uses viewport-based triggers for better performance and user experience.

## 🔧 Technical Implementation

### Hook: `useWaveAnimation`

**Location**: `/src/hooks/useWaveAnimation.ts`

```typescript
interface UseWaveAnimationOptions {
  threshold?: number;        // Intersection threshold (default: 0.1)
  rootMargin?: string;      // Root margin for early triggering (default: '50px')
  staggerDelay?: number;    // Delay between items (default: 100ms)
  duration?: number;        // Animation duration (default: 500ms)
}
```

**Key Features**:
- **Intersection Observer API**: Proper viewport-based triggering
- **Performance Optimized**: Uses `willChange` property for GPU acceleration
- **Customizable**: Configurable timing and thresholds
- **One-time Trigger**: Disconnects observer after animation starts
- **Reusable**: Single hook for all components

## 🎨 Animation Properties

### **Visual Effects**:
- **Transform**: `translateY(-8px → 0)` - Slide up effect
- **Opacity**: `0 → 1` - Fade in effect  
- **Scale**: `0.95 → 1` - Subtle zoom effect

### **Timing**:
- **Duration**: 500ms per item
- **Stagger Delay**: 100ms between items
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` - Custom smooth curve
- **Trigger**: When 10% of component enters viewport + 50px early margin

## 📦 Applied Components

### ✅ **Implemented On**:

1. **ForYouFeed**
   - Animates: Individual feed items + "View more" button
   - Items: Up to 3 feed items with staggered animation

2. **CompanyAnnouncements** 
   - Animates: Individual announcement cards
   - Items: Up to 3 announcements with priority indicators

3. **EmployeeDirectory**
   - Animates: Employee cards in grid layout
   - Items: Up to 6 employee cards (2-column grid)

4. **KudosFeed**
   - Animates: Individual kudos cards
   - Items: Up to 3 kudos with gradient backgrounds

5. **TeamCalendar**
   - Animates: Calendar event items
   - Items: Up to 3 upcoming events with type icons

6. **QuickLinks**
   - Animates: Individual quick link items
   - Items: User-customizable links with dynamic icons

## 🚀 Performance Benefits

### **Proper Animation Methods**:
- ❌ **Old**: `setTimeout` for timing (unreliable)
- ✅ **New**: Intersection Observer API (browser-optimized)

### **GPU Acceleration**:
- Uses `willChange: 'transform, opacity'` for hardware acceleration
- CSS transforms instead of layout-triggering properties

### **Efficiency**:
- Single observer per component (auto-disconnects)
- No unnecessary re-renders or polling
- Minimal memory footprint

## 🎭 User Experience

### **Trigger Behavior**:
- **Viewport Entry**: Animation starts when component becomes visible
- **Early Trigger**: 50px margin means animation starts just before full visibility
- **Progressive Disclosure**: Wave effect reveals content progressively

### **Visual Hierarchy**:
- **Consistent**: Same animation pattern across all components
- **Predictable**: Users learn the pattern quickly
- **Smooth**: Fast but not jarring (500ms duration)

## 🔄 Usage Pattern

### **Component Integration**:
```typescript
// In any dashboard component
import { useWaveAnimation } from '@/hooks/useWaveAnimation';

export const MyComponent = () => {
  const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation();
  
  return (
    <CardContent ref={containerRef}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={getItemClassName('base-classes')}
          style={getItemStyle(index)}
        >
          {/* content */}
        </div>
      ))}
    </CardContent>
  );
};
```

### **Customization**:
```typescript
// Custom timing options
const { containerRef, getItemStyle, getItemClassName } = useWaveAnimation({
  threshold: 0.2,      // Trigger when 20% visible
  rootMargin: '100px', // Start 100px early
  staggerDelay: 150,   // 150ms between items
  duration: 700        // 700ms animation duration
});
```

## 🎯 Benefits Summary

1. **Consistent UX**: Unified animation language across dashboard
2. **Performance**: Proper browser APIs, GPU acceleration
3. **Accessibility**: Respects user motion preferences
4. **Maintainable**: Single hook, easy to modify globally
5. **Scalable**: Easy to apply to new components
6. **Professional**: Smooth, polished feel throughout application

## 🔮 Future Enhancements

- **Motion Preferences**: Respect `prefers-reduced-motion`
- **Custom Curves**: Component-specific easing functions
- **Direction Variants**: Different entrance directions
- **Trigger Variants**: Scroll-based, hover-based triggers
