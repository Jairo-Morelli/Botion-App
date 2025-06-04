/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */

/*Custom Botionapplication JSON string code 
    - I can parse my botionapplication data directly into 
    BASEBOTIONJSON.botionData value directly.
*/
const BASEBOTIONJSON =
    '{' +
    '"BotionData": [' +
    '{' +

    '}' +
    ']' +
    '}'

/*Custom Javascript event code*/

const applicationUpdate = new CustomEvent("update", {
    detail: { message: 'this is my update event for my botion application' },
    bubbles: true,
    cancelable: true,
    data: []
}
);

const applicationSave = new CustomEvent("save", {
    detail: { message: "save event" },
    bubbles: true,
    cancelable: true,
    data: []
})

/*Custom Javascript events code*/


class BotionAppEventData {
    constructor(eventType_, currentCard_, state_) {
        this.eventType = eventType_;
        this.currentCard = currentCard_;
        this.state = state_;
        this.text = "";
    }
}

/* Serializer */
class BotionSerializer {
   constructor()
   {
    this.#botionJSON= JSON.parse(BASEBOTIONJSON);
   }

   get botionJSON()
   {
    return this.#botionJSON;
   }
   #botionJSON;
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
        this.component = new Component("Mediator");
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
    get get_component() {
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
        this.type="Card";
        this.isSelected = false;
        this.hasChanged = false;
        this.htmlref = HTMLElement;
        this.id;
        this.state = 'idle';
        this.cardText = "";
    }

    /* 
    Because each card is different I am going to create a function 
    that sets the component of each card according to the card's id.  
     */

    set text(text_) {
        this.#cardText = text_;
    }

    setState(newState_) {
        this.state = newState_;

        switch (this.state) {
            case "idle":
                {
                    this.isSelected = false;
                    break;
                }
            /* Telling the card to have a state of selected is easy, 
            but what about de-selecting a card? Pretty simply, just do, in your 
            event system. If card has been previously selected, de-select it. 
            
            How can I deselect something I don't have a reference to?
            
            You can check state in your managers, updates. 
            
            This particular scenario is like*/
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
    #component;
}

/*Card Manager Class 
    - Card Manager class should maintain collection of cards 
    - Card Manager should create classes like a factory class 
    - Card Manager should delete cards 
    - Card Manager should edit cards 
    - Card Manager can shuffle cards 
    - Card can track correct and incorrect answers 

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

    update_Component(message) {

        switch (state) {

        }
        console.log(message);

    }

    get get_Component() {
        return this.#component;
    }

    get get_cardsArray() {
        return this.#cardsArray;
    }


    createCard(card_) {

        const newCard = new Card()
        card_ = document.createElement("div");
        card_.setAttribute("class", "Card Component");
        card_.setAttribute("id", "card-" + (this.#cardsArray.length + 1)); //ID's will always start at 1.
        this.#component.send(card_, "StyleManager");

        newCard.htmlref = card_;

        this.#cardsArray.push(newCard);
        return newCard;
    }

    RemoveCard(card_) {

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
        this.#component = new Component("botionMemory");
        this.#component.updateComponent = this.update_Component;
        this.#botionJSON = JSON.parse(BASEBOTIONJSON);
    }


    /*Concrete component functionality */
    update_Component(message) {
        const botionInstanceRef = BotionMemory.getInstance();
        /* Okay so this is what I've been planning to do with my application and how 
        it works mainly with the updates. 
        
        Okay so I have my standard updates right? 
        basically whenever they are running through my event system, you could in a way 
        consider them global, the way that they update things will be completely  
        update entire parts of my application without any conditional and switch case 
        functionality, mainly because that would actually confuse me and make the code a 
        mess. 


        So the great thing about my update_Component functions, is that I am able to 
        write specific update code, for certain objects that is loosely coupled to the program. 
        
        my more universal updates are, loosely coupled as well. But they are connect to the 
        browsers event system. My update_component functions aren't. 

        The most important thing about my update_component functions, is that I am able 
        to give them particular states or straight up condtional branching within them. 

        allowing me to give each object, VERY, VERY SPECIFIC UPDATE code, for my very 
        specific object/class. 

        loose when called, but specific when executed. 
        */
        switch (message.state) {
            case "WRITE":
                {
                    const jsonRef = botionInstanceRef.get_BotionJSON;
                    let stringtoparse = JSON.parse( JSON.stringify(CardManager.getInstance().get_cardsArray));
                    let stringtoparsetostring = JSON.stringify(stringtoparse);
                  //  turntoString[0]+="card";
                    console.log(stringtoparse);
                    console.log(stringtoparsetostring);
                    console.log(CardManager.getInstance().get_cardsArray);
                    console.log(jsonRef);
                    // jsonRef.parse(CardManager.getInstance().get_cardsArray);
                    // jsonRef.parse(StyleManager.getInstance());
                    // botionInstanceRef.get_BotionJSON.BotionData.parse(StyleManager.getInstance());


                    break;
                }
            case "READ":
                {
                    break;
                }
            default:
                {
                    break;
                }
        }
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

    /*getters*/
    get get_BotionJSON() {
        return this.#botionJSON;
    }


    get get_Component() {
        return this.#component;
    }

    static instance;
    //Private variables
    #botionJSON;
    #component;
}

/* Event Handler */

let updateHandler = function (data_) {
    applicationUpdate.data = data_;
    document.dispatchEvent(applicationUpdate);

}
/*
 use mediator to send message to all objects that require a save? 

 this function will call botionMemory, to save all the information of all 
 the managers, because all the managers contain the information of all the 
 data types that I want to save to local storage.

 call botionMemory.update_Component using the mediator
*/
let applicationWriteHandler = function (data_) {
    data_ = new BotionAppEventData(null, null, "WRITE");
    console.log(data_.state);
    // mediator.get_component.send(data_, "botionMemory");
    mediator.send(data_, "Mediator", "BotionMemory");
}

let applicationReadHandler = function (data_) {
    console.log("read");

}


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
        if (string != undefined) {
            console.log("Keyboard input:" + data_.data.text);
            mediator.send(data_.data, "Mediator", "CardManager");
        }

    }

}

document.addEventListener("update", function (data_) {

    console.log("update");
    // In here you can section of multiple different updates for mutliple different update features.
    dashBoardUpdateHandler(data_);

});


document.addEventListener("applicationSave", function (data_) {

})

let keyboardHandler = function (data_) {
    const character = data_.key;
    let keyboardChar;
    const data = new BotionAppEventData(data_, null, "");
    data.text = character;
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

    const addHoverInfo = addDivElements[0].children[0];
    addHoverInfo.style.opacity = 1.0;
    update_Application(null);
}
addHabitButton.addEventListener("mouseover", (event) => {
    habitButtonH_over(null);
})

let cardHasBeenSelectedHandler_click = function (data_) {
    update_Application(data_);
}

let addCardButtonHandler_up = function (event) {
    let newCard = new Card();
    newCard = cardMang.createCard(newCard);

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

addHabitButton.addEventListener("mouseleave", (event) => {
    const botionAppData = createBotionData(false, false, false, event);

    addButtonHoverInfo(botionAppData);
})

/*Event Listeners*/

/*Global variables */
//Instantiate Botion Mem
//Instantiate BotionMediator 
//Instantiate CardMang
//Instantiate styleMang
const botionMem = new BotionMemory();
const mediator = new Mediator();
const cardMang = new CardManager();
const styleMang = new StyleManager();
const DashBoardNode = document.getElementById("dash");
/*Global variables */

/*Mediator Custom Event defintions */

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
    mediator.dispatch("dashboardupdate", data_);
}

function botionapp_Writer(data_) {
    mediator.dispatch("save", data_);
}

function botionapp_Reader(data_) {
    mediator.dispatch("read", data_);
}
/*Mediator Custom Event defintions */

/* Mediator Custom Event enabling */
mediator.enable("applicationUpdate", updateHandler);
mediator.enable("keyboardup", keyboardHandler);

mediator.enable("addnewcard", addCardButtonHandler_up);
mediator.enable("cardhasbeenselected", cardHasBeenSelectedHandler_click);

mediator.enable("addbuttonhoverinfo_leave", addButtonHoverInfoHandler_leave);
mediator.enable("dashboardupdate", dashBoardUpdateHandler);

mediator.enable("write", applicationWriteHandler);
mediator.enable("read", applicationReadHandler);
/* Mediator Custom Event enabling */


/*Application Code  */

function intialize() {

    mediator.register("BotionMemory", botionMem.get_Component);
    mediator.register("CardManager", cardMang.get_Component);
    mediator.register("StyleManager", styleMang.get_Component);
    mediator.register("Mediator", mediator.get_component);

    document.head.appendChild(styleMang.get_Style);

}

intialize();
update_Application();

let saveInterval = setInterval(applicationWriteHandler, 2000); // Calls every 2.5 minutes, 150,000 ms = 2.5 minutes

//applicationWriteHandler();
/*Application Code  */

//irrelavent 
// const file = new Blob(["foo"], {type: 'text/plain'});
// // Create a temporary URL for the Blob
// const url = URL.createObjectURL(file);
// // Create an anchor and trigger download 
// const a = document.createElement('a');
// a.href = url;
// a.download = file;
// a.click();

