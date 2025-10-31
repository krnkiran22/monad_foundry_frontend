# Tailwind CSS v4 Troubleshooting

## Issue: Tailwind CSS not rendering styles

### Current Setup ✅

- Tailwind CSS v4.1.16 installed
- @tailwindcss/vite v4.1.16 installed
- Vite config correct with `tailwindcss()` plugin
- CSS imports correct: `@import "tailwindcss"`

### Quick Checks:

#### 1. **Browser Cache Issue**

The most common issue! Try:

- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Or open DevTools (F12) → Right-click refresh button → "Empty Cache and Hard Reload"

#### 2. **Verify Styles Loading**

Open DevTools → Network tab → Filter by CSS → Look for:

- Should see CSS file loading
- Check if it contains Tailwind utility classes

#### 3. **Check Rendered HTML**

Open DevTools → Elements tab → Inspect any element:

- Classes should be present: `bg-[#FAFAFA]`, `text-[#1A1A1A]`, etc.
- If classes are there but no styles, it's a Tailwind issue
- If classes are missing, it's a React rendering issue

### Expected Behavior:

**Landing Page:**

- Light gray background: `#FAFAFA`
- White header with border
- Colored feature cards
- Blue "Monad Testnet" badge

**Dashboard (after wallet connect):**

- Light gray background
- White sidebar on left
- White top bar
- White stat cards with data
- Table with transaction data

### If Still Not Working:

#### Solution 1: Clear Node Cache

```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

#### Solution 2: Check for CSS Conflicts

Look for any inline styles or other CSS frameworks that might be overriding Tailwind.

#### Solution 3: Verify Tailwind v4 Syntax

In Tailwind v4, some classes changed:

- ✅ `bg-white` → Works
- ✅ `bg-[#FAFAFA]` → Works (arbitrary values)
- ✅ `text-[#1A1A1A]` → Works
- ❌ `bg-gradient-to-r` → Changed to `bg-linear-to-r` in v4
- ✅ `flex`, `gap-4`, `p-6` → All work

### Debug Commands:

**Check if Tailwind is compiling:**

```bash
# Should show no errors
npm run dev
```

**Check CSS output:**
Open browser → View Page Source → Look for `<style>` tags or `.css` file link

**Verify classes:**

```bash
# Search for Tailwind classes in source
grep -r "bg-\[#" src/
```

### Current Status:

✅ Tailwind CSS v4.1.16 installed
✅ Vite plugin configured correctly
✅ CSS import syntax correct for v4
✅ No compile errors
✅ Dev server running

**Most likely issue:** Browser cache needs clearing!

### Test Page:

If you want to test if Tailwind is working at all, try adding this to any component:

```jsx
<div className="bg-red-500 text-white p-4 rounded">
  Tailwind Test - Should be red background, white text
</div>
```

If this renders correctly, Tailwind is working fine!
