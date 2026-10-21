# Todo List

A simple, animated to-do list built with plain HTML, CSS, and JavaScript, with no frameworks or libraries.

Add a task, tick it off, and watch it get crossed out, fade away, and disappear.

## Features

- Add tasks with the **Add Task** button (empty or whitespace-only input is ignored)
- Custom checkbox: an SVG square that animates into a checkmark
- Animated strikethrough line on the text of completed tasks
- A completed task fades out and is removed after 1 second
- Changed your mind? Untick the task within 1 second and it stays
- Safe against XSS: user input is inserted as plain text, never as HTML

## Technologies

- **HTML5**: semantic structure, `label` and `input` linked by `for` and `id`
- **CSS3**: CSS variables, Flexbox, transitions, pseudo-elements (`::before`), and the `:has()` selector
- **JavaScript (ES6)**: DOM manipulation, event listeners, template literals, `setTimeout` / `clearTimeout`

## Project Structure

```
To-do-List/
├── index.html   # page structure
├── style.css    # styling and animations
└── script.js    # app logic
```

## Getting Started

No installation or build step needed.

1. Download or clone the project
2. Open `index.html` in your browser

> The app uses the CSS `:has()` selector, so a modern, up-to-date browser is required (Chrome, Edge, Safari, or Firefox).

## How It Works

1. Clicking **Add Task** reads the input value and trims it.
2. A new `<li>` is created with a hidden checkbox, an SVG, and a separate label for the text.
3. The text is set with `textContent`, so anything the user types is displayed as plain text.
4. Each task gets a unique `id` (`task1`, `task2`, ...) from a counter, so clicking a label ticks the correct checkbox.
5. When a checkbox is ticked, CSS draws the strikethrough line. After 1 second, JavaScript adds a `fade-out` class, and once the 0.5s animation ends, the task is removed from the DOM.
6. Unticking before the 1 second is up cancels the timer with `clearTimeout`.

## What I Learned

- Selecting and creating elements with the DOM
- Handling events (`click` and `change`)
- Why `innerHTML` with user input is dangerous, and how `textContent` avoids XSS
- Scheduling and cancelling timers
- Keeping JavaScript and CSS animations in sync
- Using `:has()` to style one element based on the state of another

## Known Limitations and Future Ideas

- [ ] Tasks are lost when the page is refreshed (save them with `localStorage`)
- [ ] Add a task by pressing `Enter`
- [ ] Delete button for tasks
- [ ] Smoother collapse of the remaining tasks when one is removed
- [ ] Persian (RTL) support: use the Vazirmatn font and a right-to-left strikethrough
