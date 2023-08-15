# react-circles

This is a frontend React interview assignment (junior level). Written in TypeScript and React, built with [Vite](https://vitejs.dev/).

Problem statement:

* Make a basic single page app where the user can click anywhere on the page to place a circle on that location
* Add two buttons—undo and redo—to undo and redo these placements
* Add a reset button to clear the entire page of these circles

My solution:

* Use two state variables—`clicks` and `undoBuffer`—to store clicks (x and y positions) and to store the clicks that 
have been undone
* When the undo button is pressed, remove the last click from the `clicks` state and store it in the undo buffer
* When the redo button is pressed, add the last click from the undo buffer to `clicks` and remove it from `undoBuffer`
* When the reset button is pressed, set both `clicks` and `undoBuffer` to `null`
* Paint the circles on the entire viewport by drawing SVGs based on the x and y values from `clicks`

Note: You can send me web development questions or problems to add to this repository by emailing me at syed@nextdev.in