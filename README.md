# RC Tic Tac Toe

The tried-and-true, classic, and fun task of building a tic-tac-toe game.

## How to run

Clone the repo, run `yarn install`, and run `yarn dev`.

The app runs at [localhost:5173](http://localhost:5173/) or the next available port incrementing upwards (e.g. 5174)

## Notes
- I used the `yarn create vite` command for the react boilerplate and chose the Typescript + React Compiler option.
- After building a working app and noticing an abundance of prop-drilling, I refactored the state management to use React Context as an exercise in code readability and maintainability.
- The only AI generated code in this repo is the custom eslint rule [eslint-rules/use-game-state-management-in-provider.js](eslint-rules/use-game-state-management-in-provider.js), because I was having fun solving some workflow friction that I always run into when I use React Context. I wanted to define the state management logic `useGameStateManagement` in the same file as the hook that components use to access the context, `useGame`. I did this so that the "Go to Definition" `Command + Click` shortcut for `useGame` would take me to the same file where the state management functionality is written. In other repos I've worked in, the `Command + Click` shortcut on the equivalent `useHook` function would take me to a file that doesn't have the context state management logic, and then I'd have to search for the state management logic in another way. I was really happy with my solution, but if another developer were to look at the exported `useGameStateManagement` definition, they might think that they should import it into a component and use it, which would be bad. The correct path would be to import and call the `useGame` hook into a component. To make it clear that the `useGameStateManagement` hook is only to be used by the `GameProvider`, I had AI write a custom lint rule that triggers when `useGameStateManagement` is invoked in any function other than `GameProvider`.