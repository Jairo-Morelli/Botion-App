/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */



/*
Just a note that I want to bring up. Depending on where I inject 
my javascript code in the html file, this code below will either run before 
the DOM has been fully loaded or after.

I've gone with the design choice of injecting my javascript code after the DOM file has mostly loaded.
*/
const addHabitButton = document.getElementById("btn-add");

//works
addHabitButton.addEventListener("mouseover", ()=>
{
    console.log("Mouse over");
    console.log(addHabitButton.style);
})