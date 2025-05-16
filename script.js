/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */


/*pre-defined objects */
let cardJSONArray = '{ "cardData":[' +
    '{ "title":" " , "text":" " }]}';
let DashboardJSON =""; //haven't written it yet
/*This is my JSON object that stores all my web application data*/
let BotionJSON = ""; //haven't written it yet
/*keyboard input variable*/
let keyboardChar = "";
const listenerRegistry = new WeakMap();
//card object\
/*You can change the changes of the 
card by having a very very simple update tick system 
that checks to see if anything has change.*/
const Card={
    htmlref:HTMLElement,
    isClicked:false,
    hasChanged: false,
    update() // if anything happens to the card update the contents of the card
    {

    }   
}
//botion object 
/* 
    I am going to be creating an 
    boitionObject that contains all the "working information" of my application 
    so things are alittle bit more composite. I don't want to have a bunch of 
    global variables.

    If there are some over lap with some global variables I plan to remove the global variables.
*/
const botionObj={
    BotionJSON:"",
    DashboardJSON:"",
}

let cardsArray=[Card];
/*pre-defined objects*/

let card0= cardsArray[0];


/*Casually re-writing browser Javascript functionality */
const originalAdd = EventTarget.prototype.addEventListener;
//With this piece of code I just re-wrote Browser Javascript functionality
EventTarget.prototype.addEventListener = function (type,listener, options)
{
    if(!listenerRegistry.has(this))
    {
        listenerRegistry.set(this,[]);
    }
    listenerRegistry.get(this).push({type,listener,options});
    originalAdd.call(this,type,listener,options);
};

/*
Just a note that I want to bring up. Depending on where I inject 
my javascript code in the html file, this code below will either run before 
the DOM has been fully loaded or after.

I've gone with the design choice of injecting my javascript code after the DOM file has mostly loaded.
*/
const addHabitButton = document.getElementById("btn-add");
card0.htmlref = document.getElementById("card-0");



/*functions*/
function intialize() {
    BotionJSON = JSON.parse(cardJSONArray);
}

function getListeners(el)
{
    return listenerRegistry.get(el) || [];
}

/*
    Over here you'll have your respective types of 
    UI updates, 

    if it is a card, then update the card function, and update the 
    associated json information.
*/
function UI_Update(UI_element)
{
    if(UI_element.isClicked)
    {
        switch (UI_element){

            case Card:
                {
                    console.log("tried to update a UI_card element");
                    break;
                }
        }
    }
}
/*over here botion will update itself and the clients browser logic*/
botionObj.update = function (data_) {

}
/*functions */
intialize();

/*Event Listeners*/
/*
 5-15-2025 Feature 
 
 Making it so that my cards are able to have text information. 

 The thing that I am testing, is to see if I am able to properly fill my JSON 
 cards with the right keyboard information. 

 If I can fill my JSON objects with the right information then I am able to make it so 
that my web application is able to say the information that my users write into it.

Now I am going to have to add spacing features. 

Check if input is valid then concate the string.
*/
document.addEventListener("keyup", (e) => {
    const character = e.key;
    if (character != undefined) {
        switch (e.key) {
            //This will be remove in the near future this is simply just 
            //how I am building this new feature.
            case "Enter":
                {
                    BotionJSON.cardData[0].text = keyboardChar;
                    console.log(BotionJSON);
                    console.log(BotionJSON.cardData[0].text);
                    break;
                }
            case "Tab":
                {
                    keyboardChar += '\t';
                    break;
                }
            case " ":
                {
                    keyboardChar += ' '
                    break;
                }
                //Ignore this input
            case "Control":
                {
                    break;
                }
            default:
            {
                keyboardChar+=character;
                break;
            }
        }
        if(card0.isClicked==true)
            {
                card0.htmlref.textContent+=keyboardChar;
            }
    }
    UI_Update(card0);
})


card0.htmlref.addEventListener("mouseup", ()=>{

    console.log("This card has been selected");
    card0.isClicked=true;
    UI_Update(card0);
})

//works
addHabitButton.addEventListener("mouseover", () => {
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
    addHoverInfo.style.opacity = 1.0;
})

addHabitButton.addEventListener("mouseleave", () => {

    const addDivElements = document.getElementsByClassName("Btn");

    const addHoverInfo = addDivElements[0].children[0];

    addHoverInfo.style.opacity = 0.0;
})


/*Event Listeners*/
/*UI Update 

At the end of every event listener function, 

I can simply just call the update function, and pass it, its respective UI function update.
*/


console.log(listenerRegistry);


