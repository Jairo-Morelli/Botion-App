/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */



let cardJSONArray; 
let DashboardJson;


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
    //Access div container through .html .css attribute
    const addDivElements = document.getElementsByClassName("Btn");

    /*This is some pretty hard coded code right here. I am 
    taking the approach that if I already know the div structure, 
    therefore I will always be able to accessing my add div structure
    and then access my addHoverInfo text.

    This doesn't feel right, but this is the design choice I am making.
    */
    const addHoverInfo = addDivElements[0].children[0];

    //First way I decided to do it
    //addHoverInfo.style.visibility="visible";
    //I perfer working with numbers.
    addHoverInfo.style.opacity=1.0;
})

addHabitButton.addEventListener("mouseleave", ()=>{

    const addDivElements= document.getElementsByClassName("Btn");

    const addHoverInfo = addDivElements[0].children[0];

    addHoverInfo.style.opacity=0.0;
})