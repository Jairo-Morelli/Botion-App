/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */

/*Functionality/Defintion Code */

const applicationUpdate = new CustomEvent("update", {
    detail: { message: 'this is my update event for my botion application' },
    bubbles: true,
    cancelable: true,
    data: []
}
);
/*Class delecrations*/
//probably not going to use this.
class DashBoardManager {
    constructor() {
        if (DashBoardManager.instance) {
            console.error("Already existing instance of dashboard Manager");
        }
        DashBoardManager.instance = this;
        this.#components = new Component("dashBoardManager");
        this.#components.updateComponent = this.update_Component;
        this.#mediator = new Mediator();
    }

    static getInstance() {
        if (!this.instance) {
            DashBoardManager.instance = new DashBoardManager();
        }
        return DashBoardManager.instance;
    }
    /* 
    I don't need this, actually for updating my Botion application. Which is funny. 
    The way I have my update functions for my application loop, is exactly extremely loosely coupled, 
    in relation to actual class/object. I can maintain this lose coupling because the way, my update functions 
    actually run is through my event system. It isn't really linked to any of my specific calls.
    */
    update_Component(message) {

    }

    /*getters*/
    get get_Component() {
        return this.#components;
    }

    /*setters*/
    set set_BotionAppEventData(data_) {
        this.#eventData = data_;
    }
    static instance;
    #components;
    #mediator;
    #eventData;
}

/*
    BotionAppEventData also controls 
    application state. 

    this class will do alot of the heavy lifting. Of my application functionality.

    The reason this works so well, is that I can have mutliple different types of state for different objects, 
    and have there functionality be change literally because of a string. 

    And funnily enough, it is still loosely coupled to the application.

    No need for a state class.
*/
class BotionAppEventData {
    constructor(eventType_, currentCard_, state_) {
        this.eventType = eventType_;
        this.currentCard = currentCard_;
        this.state = state_;
        this.text="";
    }
}

//Probably not going to use this LOL. Over kill for this assignment
//Probably still not going to use this, but I am using it as an example.
/* The Botion app object can be in one of several different states: 
Updating, Reading, Writing, etc. The Botion app object, will change its state 
depending on the request its receives, probably in most cases from the mediator.*/
class Botionapp {

    /*The Context defines the interface of interest to clients. It also maintains 
    a reference to an instance of a State subclass, which represents the current 
    state of the Context. */
    Context(state_) {

    }

    TransitionTo(state_) {

    }

    /*
    * The Context delegates part of its behaviour to the current State object. 
    */


    set state(state_) {
        this.#state = state_;
    }
    #state;
}


/*Mediator design pattern used for 
Define an objec that encapsualtes how a set of objects interact. Mediator promotes
loose coupling by keeeping objects from referring to each other explicitly, and it lets you 
vary their interaction indepedently. 
*/
class Mediator {
    constructor() {
        this.components = {};
        this.events = {};
        this.component= new Component("Mediator");
        this.component.setMediator(this);
    }
    // function to communicate with application components
    register(name, component) {
        this.components[name] = component;
        component.setMediator(this);
    }
    // function to communicate with application components
    send(message, from, to) {
        if (this.components[to]) {
            this.components[to].receive(message, from);
        }
    }
    // function to communicate with application events 
    // function to turn event on
    enable(eventName, handler) {
        /* 
            if this eventName index doesn't 
            exist, then create an empty array
            push handler at this eventName index
        */
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }
    // function to communicate with application events
    disable(eventName, handler) {
        if (!this.events[eventName]) return;
        this.events[eventName] = this.events[eventName].filter(fn => fn !== handler);
    }
    //function to communicate with application events
    dispatch(eventName, data) {
        if (!this.events[eventName]) return;
        this.events[eventName].forEach(fn => fn(data));
        console.log(eventName);
    }
    
    /*Getters*/
    get get_component()
    {
        return this.component;
    }
    component;
    components;
    events;
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

/*Cards potential states 
 - idle
 - selected 
*/

/*The Card class definition */
class Card {
    constructor() {
        this.isSelected = false;
        this.hasChanged = false;
        this.htmlref = HTMLElement;
        this.id;
        this.state = 'idle';
        this.cardText = "";
    }

    set text(text_)
    {
        this.#cardText=text_;
    }

    setState(newState_) {
        this.state = newState_;

        switch (this.state) {
            case "idle":
                {
                    this.isSelected = false;
                    break;
                }
            case "selected":
                {
                    this.isSelected = true;
                    break;
                }
            default: {
                break;
            }
        }
    }


    isSelected;
    hasChanged;
    htmlref;
    id;
    #state;
    #cardText;
}

/*Card Manager Class 
    - Card Manager class should maintain collection of cards 
    - Card Manager should create classes like a factory class 
    - Card Manager should delete cards 
    - Card Manager should edit cards 

    Card manager DOES NOT CARRY STATE OF CARDS.
    Card manager can change state, BUT DOES NOT CARRY STATE OF CARDS.
*/
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

        //console.log(message);

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
        card_.setAttribute("id", "card-" + (this.#cardsArray.length + 1)); //ID's will always start at 1.
        this.#component.send(card_, "StyleManager");
        this.#cardsArray.push(card_);
        return card_;
    }

    RemoveCard(card_)
    {

    }



    static instance;
    #component;
    #cardsArray = [];
}


/*Style Manager Class 
    - Style Manager class should maintain collection of cards 
    - Style Manager should create classes like a factory class 
    - Style Manager should delete cards 
    - Style Manager should edit cards 

    Style manager DOES NOT CARRY STATE OF CARDS.
*/
class StyleManager {
    constructor() {
        if (StyleManager.instance) {
            console.error("Already existing instance of StyleManager Object");
        }
        StyleManager.instance = this;
        this.#component = new Component("Style");
        this.#component.updateComponent = this.update_Component;
        this.#style = document.createElement("style");
        this.#style.setAttribute("id", "mod-style");
    }

    static getInstance() {
        if (!StyleManager.instance) {
            StyleManager.instance = new StyleManager();
        }
        return StyleManager.instance;
    }

    /*Concrete component functionality */
    // Just a note here, you can add switch cases, in order to have different functionality inside your update_component function
    update_Component(message) {
        /*
            Just a reminder when you're calling this function 

            "this" does not refer to, the styleManager instance, "this" refers to actually 
            whatever manager or component is calling it.
        */

        /*be careful when usings strings to build stuff. */
        const styleTemplate = `#${message.getAttribute("id")}.Card.Component { width:140px; height:140px; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c; opacity:0.5;` +
            '}' +
            `#${message.getAttribute("id")}.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}`;

        const s = StyleManager.getInstance().get_Style;


        const sNode = document.getElementById("mod-style");
        sNode.append(styleTemplate);



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

/*
The Class that will be the "working" memory of Botion web application

this is almost exactly like the managers, but it will probably carry state of the application. Which 
makes sense in this case.
*/
class BotionMemory {
    constructor() {
        if (BotionMemory.instance) {
            console.error("Already existing instance of BotionMemory Object");
        }
        BotionMemory.instance = this;
        this.#component = new Component("BotionApp")
        this.#component.updateComponent = this.update_Component;
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


/*Event Listeners*/

/*This is probably a little bit confusing 
 I am using javascripts built-in functionality for a an event 
 system here, where in all other event handlers it is 100% my custom 
 code.
*/
let updateHandler = function (data_) {
    applicationUpdate.data = data_;
    document.dispatchEvent(applicationUpdate);

}

/*Over here check to see if any of the cards have changed, 
or have been selected etc. */
/*
 Every simple thing I have here, since I already have the card manager, I have a piece of logic, that 
 will stay consistent when my event system. I'll use the managers to decouple event logic, set the cards to 
 isSelected, then allow the keyboard to input characters into the selected card.

 The way this works, is that, the update will constantly loop over itself updating. The data temporary variable will 
 be constantly changing in updating itself, but will actually in the individual steps of the update, from time to time
 will read and write information during a singular step that will create certain functionality. 

 so this dashBoardUpdathandler function will update the state of a card from time to time, and will also 
 input the text into the card listening from the keyboard handler, but it will never do both at the same time.
*/
let dashBoardUpdateHandler = function (data_) {
    const card = data_.data.card_;
    const event = data_.data.event;
    const string = data_.data.text;
    //check to see if all the data is valid up to the card itself.
    if (data_ != undefined) {
        if (card != undefined) {
            if (event != undefined) {
                card.setState("selected");
            }
        }
        //check to see if the data objects has any text from 
        //the keyboard listener
        if(string!=undefined)
        {
            console.log("Keyboard input:"+data_.data.text);
            mediator.send(data_.data.text,"Mediator","CardManager");
        }

    }

}
/*Application update */
document.addEventListener("update", function (data_) {

    console.log("update");
    // In here you can section of multiple different updates for mutliple different update features.
    dashBoardUpdateHandler(data_);
});

/*functions */

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


/* 
    This is what you can do, if you have a card that has been selected, 
    and the there is input from the keyboard, then you can instantly put 
    characters into that selected, card.

*/

let keyboardHandler = function (data_) {
    const character = data_.key;
    let keyboardChar;
    const data = new BotionAppEventData(data_,null,"");
    data.text=character;
    if (character != undefined) {
        switch (data_.key) {
            //This will be remove in the near future this is simply just 
            //how I am building this new feature.
            //Since I am only sending the the keycodes and not changing the data, of the card here 
            // I might have to make it so that the cards, update themselves.
            case "Enter":
                {

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
                    break;
                }
        }
    }
    update_Application(data);
}
document.addEventListener("keyup", (event) => {
    keyboardpress_up(event);
})

const addHabitButton = document.getElementById("btn-add");

let habitButtonH_over = function (event) {
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
    update_Application(null);
}
addHabitButton.addEventListener("mouseover", (event) => {
    habitButtonH_over(null);
})

let cardHasBeenSelectedHandler_click = function (data_) {
    console.log(data_.currentCard);
    update_Application(data_);
}
/*
    Handlers can do alot, don't try to containerize everything there is 
    literally no need.
    this is a handler, that uses another handler. 

    You have it setup so the handlers are loosely coupled with the 
    Botion application.
 */

let addCardButtonHandler_up = function (event) {
    let newCard = new Card();
    newCard.htmlref = cardMang.createCard(newCard.htmlref);

    DashBoardNode.append(newCard.htmlref);

    //I have to pass the card into this handler
    newCard.htmlref.addEventListener("click", (event) => {
        const data = new BotionAppEventData(event, newCard.htmlref, "selected");
        newCard.eventData = data;
        cardHasBeenSelected(data);
    }
    )

    update_Application(null);
}
addHabitButton.addEventListener("mouseup", (event) => {
    addNewCard(event);
});

let addButtonHoverInfoHandler_leave = function (data_) {

    const botionAppData = createBotionData(false, false, false, event);

    const addDivElements = document.getElementsByClassName("Btn");

    const addHoverInfo = addDivElements[0].children[0];

    addHoverInfo.style.opacity = 0.0;

    update_Application(null);
}
/*
    Where I place my BotionApplication data structure. Sure 
    it is more tightly coupled now but, you can always pass a null 
    BotionApplication data structure and the event system will still 
    work.

    if the BotionApplication data gets to big you're going to have to use a 
    different design pattern. For now this is fine.
 */
addHabitButton.addEventListener("mouseleave", (event) => {
    const botionAppData = createBotionData(false, false, false, event);

    addButtonHoverInfo(botionAppData);
})

/*Functionality/Defintion Code*/

/*Global variables */

//Instantiate Botion Mem
//Instantiate BotionMediator 
//Instantiate CardMang
//Instantiate styleMang
//Instantiate DashBoard
const botionMem = new BotionMemory();
const mediator = new Mediator();
const cardMang = new CardManager();
const styleMang = new StyleManager();
const dashBoardMang = new DashBoardManager();
const DashBoardNode = document.getElementById("dash");


/*Global variables */


/* Custom Event defintions */
/* 
 Naming conventions for the events should be 
 there events, what they do.
*/
function update_Application(data_) {
    mediator.dispatch("applicationUpdate", data_);
}

function keyboardpress_up(data_) {
    mediator.dispatch("keyboardup", data_);
}

function addNewCard(data_) {
    mediator.dispatch("addnewcard", data_);
}

function cardHasBeenSelected(data_) {
    mediator.dispatch("cardhasbeenselected", data_);
}

function addButtonHoverInfo(data_) {
    mediator.dispatch("addbuttonhoverinfo_leave", data_);
}

function dashBoard_Update(data_) {
    mediator.dispatch("dashboardupdate".data_);
}


/* Custom Event enabling */
mediator.enable("applicationUpdate", updateHandler);
mediator.enable("keyboardup", keyboardHandler);

mediator.enable("addnewcard", addCardButtonHandler_up);
mediator.enable("cardhasbeenselected", cardHasBeenSelectedHandler_click);

mediator.enable("addbuttonhoverinfo_leave", addButtonHoverInfoHandler_leave);
mediator.enable("dashboardupdate", dashBoardUpdateHandler);



/*Application Code  */
/* 
 The way it works now is that I intialize my application 
 and my application is jumping all over the place, because of the event system.

This will probably be the shortest part of my code base.
*/

function intialize() {

    mediator.register("BotionMemory", botionMem.get_Component);
    mediator.register("CardManager", cardMang.get_Component);
    mediator.register("StyleManager", styleMang.get_Component);
    mediator.register("dashboardManager", dashBoardMang.get_Component);
    mediator.register("Mediator", mediator.get_component);

    document.head.appendChild(styleMang.get_Style);

}


/*Application Code  */



intialize();
update_Application();



