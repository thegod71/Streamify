import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));
// when i use this store in my components, i can access the 
// theme and setTheme function to get and update the theme state. 
// The theme is also persisted in localStorage so that it remains 
// consistent across page reloads.
// ((set)=>{
//.  }) -> it is used to define the initial state and 
// actions for the store. The set function is used to update the state 
// when the setTheme action is called.   ans also it return an object
//  with the theme state and setTheme action.
// # Zustand + localStorage — Easy Notes

// ## 1. What is the purpose?

// We want to change the website theme and remember the selected theme even after refreshing the page. 

// ## 2. Three important things

// **1. `localStorage.setItem()` — SAVE**

// Saves the selected theme in the browser.

// ```javascript
// localStorage.setItem("streamify-theme", theme);
// ```

// Example: Save `"dark"` in the browser.

// **2. `localStorage.getItem()` — GET**

// Gets the previously saved theme from the browser.

// ```javascript
// localStorage.getItem("streamify-theme") || "coffee"
// ```

// * If `"dark"` was saved, it returns `"dark"`.
// * If nothing was saved, it uses `"coffee"` as the default theme.

// **3. `set({ theme })` — UPDATE**

// Updates the current theme in the Zustand store.

// ```javascript
// set({ theme });
// ```

// React components using this store can update when the theme changes.

// ## 3. How does the complete flow work?

// ### When I click a theme

// ```javascript
// onClick={() => setTheme(themeOption.name)}
// ```

// Suppose I click `"dark"`.

// **Step 1:** `setTheme("dark")` is called.

// **Step 2:** `localStorage.setItem()` saves `"dark"` in the browser.

// **Step 3:** `set({ theme })` updates the Zustand store.

// **Step 4:** The UI updates to reflect the selected theme.

// ### When I refresh the page

// **Step 1:** The Zustand store initializes again.

// **Step 2:** `localStorage.getItem()` reads the saved theme.

// **Step 3:** The store gets `"dark"` instead of the default `"coffee"`.

// **Result:** My selected theme is remembered after refreshing.

// ## 4. Remember this difference

// | Code             | Simple meaning                 |           |                                     |
// | ---------------- | ------------------------------ | --------- | ----------------------------------- |
// | `setItem()`      | Save the theme                 |           |                                     |
// | `getItem()`      | Read the saved theme           |           |                                     |
// | `set({ theme })` | Update Zustand's current theme |           |                                     |
// | `                |                                | "coffee"` | Use coffee if no saved theme exists |

// ## 5. Easy real-life example

// Think of `localStorage` as a notebook and Zustand as your current working desk.

// * `setItem()` writes the theme in the notebook.
// * `getItem()` reads the theme from the notebook.
// * `set({ theme })` changes the theme on your working desk.

// If you restart your work, the notebook still remembers your previous choice.

// **Final rule to remember:**

// `localStorage` remembers the theme; Zustand manages the current theme.

// They work together, but they do different jobs.
