/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */

/*Class delecrations*/
/*Mediator design pattern used for 

Define an objec that encapsualtes how a set of objects interact. Mediator promotes
loose coupling by keeeping objects from referring to each other explicitly, and it lets you 
vary their interaction indepedently. 
*/
class BotionMediator {
    constructor() {
        this.components = {};
    }

    register(name, component) {
        this.components[name] = component;
        component.setMediator(this);
    }

    send(message, from, to) {
        if (this.components[to]) {
            this.components[to].receive(message, from);
        }
    }
}

class Component {
    constructor(name) {
        this.name = name;
        this.mediator = null;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    send(message, to) {
        this.mediator.send(message, this.name, to);
    }

    receive(message, from) {
        console.log(`${this.name} recieved: "${message}" from ${from}`);
        //Create a anymous function, that will get called 
        // but you can define it, in your concrete class
        this.updateComponent(message);
    }
    updateComponent = function (message) { };
}


/*The Card class definition */
class Card {
    constructor() {
        this.isClicked = false;
        this.hasChanged = false;
        this.htmlref = HTMLElement;
    }
    update() {

    }
    isClicked = false;
    hasChanged = false;
    htmlref = null;

}

/*Card Manager Class */
class CardManager {
    constructor() {
        if (CardManager.instance) {
            console.error("Already existing instance of CardManager Object");
        }
        CardManager.instance = this;
        this.#component = new Component("CardManager");
        this.#component.updateComponent = this.update_Component;
        this.#cardsArray = [];
    }

    static getInstance() {
        if (!CardManager.instance) {
            CardManager.instance = new CardManager();
        }
        return CardManager.instance;
    }

    updateCards() {

    }
    /*Concrete component functionality */
    update_Component(message) {

    }

    /*getters*/
    get get_Component() {
        return this.#component;
    }

    get get_cardsArray() {
        return this.#cardsArray;
    }

    createCard(card_) {
        card_ = document.createElement("div");
        card_.setAttribute("class", "Card Component");
        card_.setAttribute("id", "card-" + (cardsArray.length + 1)); //ID's will always start at 1.
        this.#cardsArray.push(card_);
        this.#component.send(card_, "StyleManager");
        return card_;
    }
    static instance;
    #component;
    #cardsArray = [];
    x

}

/*Style Manager Class */
class StyleManager {
    constructor() {
        if (StyleManager.instance) {
            console.error("Already existing instance of StyleManager Object");
        }
        StyleManager.instance = this;
        this.#component = new Component("Style");
        this.#component.updateComponent = this.update_Component;
        this.#style = document.createElement("style");
    }

    static getInstance() {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }

    /*Concrete component functionality */
    update_Component(message) {
        /* 
         Here take the current card and then update its style attributes and then append 
         to the document object model.
        */


        // // This needs to be more modular.
        // style.textContent = '#card-5.Card.Component{ width:70px; height:70p; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c' +
        //     '}' +
        //     '#card-5.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}'
        //    document.head.appendChild(style);

        const s = StyleManager.getInstance().get_Style;


        s.textContent = `#${message.getAttribute("id")}.Card.Component{width:70px; height:70p; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c`+       
        '}'+
        `#${message.getAttribute("id")}.Card.Component p {opacity:0.3' font-size:12px; text-align:center;}`;
        console.log(message.getAttribute("id"));
        document.head.append(s);
    }
    get get_Component() {
        return this.#component;
    }
    get get_Style() {
        return this.#style;
    }
    static instance;
    #component;
    #style;
}

/*The Class that will be the "working" memory of Botion 
web application */
class BotionMemory {
    constructor() {
        if (BotionMemory.instance) {
            console.error("Already existing instance of BotionMemory Object");
        }
        BotionMemory.instance = this;
        this.#component = new Component("BotionApp")
        this.#component.updateComponent = this.update_Component;
    }
    update_UI() {

    }

    /*Concrete component functionality */
    update_Component(message) {

    }

    static getInstance() {
        if (!BotionMemory.instance) {
            BotionMemory.instance = new BotionMemory();
        }
        return BotionMemory.instance;
    }
    /*setter*/
    set botion_JSON(data_) {
        this.#botionJSON.concat(data_);
    }

    set Dashboard_JSON(data_) {
        this.#dashboardJSON.concat(data_);
    }
    /*getters*/
    get get_Botion_JSON() {
        return this.#botionJSON;
    }

    get get_DashBoard_JSON() {
        return this.#dashboardJSON;
    }

    get get_Component() {
        return this.#component;
    }

    static instance;
    //Private variables
    #botionJSON;
    #dashboardJSON;
    #component;
}


//Instantiate Botion Mem
//Instantiate BotionMediator 
//Instantiate CardMang
//Instantiate styleMang
//Instantiate DashBoard
const botionMem = new BotionMemory();
const meditor = new BotionMediator();
const cardMang = new CardManager();
const styleMang = new StyleManager();
const DashBoardNode = document.getElementById("dash");


/*pre-defined objects */
let cardJSONArray = '{ "cardData":[' +
    '{ "title":" " , "text":" " }]}';
let DashboardJSON = ""; //haven't written it yet
/*This is my JSON object that stores all my web application data*/
let BotionJSON = ""; //haven't written it yet
/*keyboard input variable*/
let keyboardChar = "";
// Innerhtml templates 
const innerHTMLTemplate = '<p>"Test Component" </p>';
/*Somewhere to hold all the event listeners. */
const listenerRegistry = new WeakMap();
//card object\
/*You can change the changes of the 
card by having a very very simple update tick system 
that checks to see if anything has change.*/
//const Card_deprecated = {
//   htmlref: HTMLElement,
//    isClicked: false,
//    hasChanged: false,
//    update() // if anything happens to the card update the contents of the card
//    {

//    }
//}





/* 
    Testing out how to inject css into Botion
*/

// if(styleSheet && styleSheet.cssRules){
//     for(let rule of styleSheet.cssRules)
//     {
//         console.log(rule.cssText);
//     }
// }
//botion object 
/* 
    I am going to be creating an 
    boitionObject that contains all the "working information" of my application 
    so things are alittle bit more composite. I don't want to have a bunch of 
    global variables.

    If there are some over lap with some global variables I plan to remove the global variables.
*/
const botionObj = {
    BotionJSON: "",
    DashboardJSON: "",
}

let cardsArray = [];
/*pre-defined objects*/


/*Casually re-writing browser Javascript functionality */
const originalAdd = EventTarget.prototype.addEventListener;
//With this piece of code I just re-wrote Browser Javascript functionality
EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (!listenerRegistry.has(this)) {
        listenerRegistry.set(this, []);
    }
    listenerRegistry.get(this).push({ type, listener, options });
    originalAdd.call(this, type, listener, options);
};

/*
Just a note that I want to bring up. Depending on where I inject 
my javascript code in the html file, this code below will either run before 
the DOM has been fully loaded or after.

I've gone with the design choice of injecting my javascript code after the DOM file has mostly loaded.
*/
const addHabitButton = document.getElementById("btn-add");


/*
    You can have like a group of functions that work in this order 

    application_start()'<div class="Card Component" id="card-0">'+
            '<p> Test Component<p>'+
            '</div>'+
            ''+
            '<div class="Card Component" id="card-1">'+
            '<p> Test Component </p>'+
            '</div>';

/*functions*/
function intialize() {

    meditor.register("BotionMemory", botionMem.get_Component);
    meditor.register("CardManager", cardMang.get_Component);
    meditor.register("StyleManager", styleMang.get_Component);

    document.head.appendChild(styleMang.get_Style);

    /*
    This is dash board memory
    
    I can create a function that writes dash board memory, 
    
    I can create a function that reads dash board memory.
    
    I can have working memory interaction with my JSON data notionation 
    and have my own specific read and write functions do whatever they want with it.
    */
    // botionMem='<div class="Card Component" id="card-0">'+
    //            '<p> Test Component<p>'+
    //             '</div>'+
    //             ''+
    //             '<div class="Card Component" id="card-1">'+
    //             '<p> Test Component </p>'+
    //             '</div>';

    // DashBoardNode.append(botionM)
}

intialize();



function getListeners(el) {
    return listenerRegistry.get(el) || [];
}

/*
    Over here you'll have your respective types of 
    UI updates, 

    if it is a card, then update the card function, and update the 
    associated json information.
*/
function UI_Update(UI_element) {
    if (UI_element.isClicked) {
        /*Update according to the 
        type of element you're dealing with? */
        switch (UI_element) {

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
                    keyboardChar += character;
                    break;
                }
        }
    }
})

/*
* I think that because you're planning to have n amount of cards 

what you need to do when it comes to adding the event listeners, is that 
you need to give a a signature, that doesn't do anything. The set/define the signuature 
when you actually create the card.
*/

// card0.htmlref.addEventListener("mouseup", () => {

//     console.log("This card has been selected");

//     //This needs to be more modular.
//     card0.isClicked = true;
//     UI_Update(card0);
// })

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

addHabitButton.addEventListener("mouseup", () => {
    let newCard = new Card();
    newCard.htmlref = cardMang.createCard(newCard.htmlref);


    DashBoardNode.append(newCard.htmlref);


    // // This needs to be more modular.
    // style.textContent = '#card-5.Card.Component{ width:70px; height:70p; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c' +
    //     '}' +
    //     '#card-5.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}'
    //    document.head.appendChild(style);
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


