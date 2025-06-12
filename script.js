/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */
//Won't take credit for something that wasn't mine. 
// but I will use it :)
/* Taken from chatgpt */

function getAllPropertyValues(obj) {
    const result = {};
    const seen = new Set();

    while (obj && obj !== Object.prototype) {
        for (const prop of Object.getOwnPropertyNames(obj)) {
            if (seen.has(prop)) continue;
            seen.add(prop);

            try {
                const value = obj[prop];
                // Avoid functions if you only want data
                if (typeof value !== 'function') {
                    result[prop] = value;
                }
            } catch (err) {
                result[prop] = `[Error accessing property: ${err.message}]`;
            }
        }

        obj = Object.getPrototypeOf(obj);
    }

    return result;
}

/*Custom BotionApplication Base Object */
class baseBotionObject {
    constructor() {
        this.objType = "";
    }
}
/*Custom BotionApplication Base Object */
/*Custom Botionapplication JSON string code 
    - I can parse my botionapplication data directly into 
    BASEBOTIONJSON.botionData value directly.
*/
const BASEBOTIONJSON =
    '{' +
    '"BotionData": {' +
    '}' +
    '}';

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
        this.cardText = "";
    }
}


/* Serializer */
/* Always pass a JSON object 
    no strings.
*/
class BotionSerializer {
    constructor() {

    }

    insertEntry(obj, path, value) {
        if (typeof path == "string") path = path.split(".");
        if (path.length === 0) return;

        const [key, ...rest] = path;

        if (rest.length === 0) {
            obj[key] = value;
        } else {
            if (!obj[key] || typeof obj[key] != "object") {
                obj[key] = {};
            }
            this.insertEntry(obj[key], rest, value);
        }
    }

    retrieveEntry(obj, path) {
        if (typeof path === "string") path = path.split(".");
        if (path.length === 0) return obj;

        const [key, ...rest] = path;

        // If the key doesn't exist or obj is not an object, return undefined
        if (!obj || typeof obj !== "object" || !(key in obj)) {
            return undefined;
        }

        // Recurse down the tree
        return this.retrieveEntry(obj[key], rest);
    }

    deleteEntry(obj, path) {
        if (typeof path === "string") path = path.split(".");
        if (path.length === 0 || typeof obj !== "object" || obj === null) return;

        const [key, ...rest] = path;

        if (rest.length === 0) {
            // Final key: delete it
            delete obj[key];
        } else {
            // Recurse deeper
            if (obj[key] && typeof obj[key] === "object") {
                this.deleteEntry(obj[key], rest);

                // Optionally, clean up empty objects
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            }
        }
    }


    stringify() {
        return JSON.stringify(this.botionJSON);
    }

    /*setter*/
    set set_botionJSON(botionJSON) {
        this.#botionJSON = JSON.parse(botionJSON);
    }

    /* getter */
    get get_botionJSON() {
        return this.#botionJSON;
    }
    #botionJSON;
}


class BotionTeacher{
    
}

/*
    Making BotionSerializer a child class of Botion
*/
Object.setPrototypeOf(BotionSerializer.prototype, baseBotionObject.prototype);
BotionSerializer.prototype.type = "BotionSerializer";

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

Object.setPrototypeOf(Mediator.prototype, baseBotionObject.prototype);
Mediator.prototype.type = "Mediator";


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

Object.setPrototypeOf(Component.prototype, baseBotionObject.prototype);
Component.prototype.type = "Component";

/*Cards potential states 
 - idle
 - selected 
*/

/*The Card class definition */
class Card {
    constructor() {
        this.type = "Card";
        this.isSelected = false;
        this.hasChanged = false;
        this.htmlref = HTMLElement;
        this.id = null;
        this.state = 'idle';
        this.cardText = "";
    }

    /* 
    Because each card is different I am going to create a function 
    that sets the component of each card according to the card's id.  
     */

    set text(text_) {
        this.cardText = text_;
    }
    // don't think that this is a good idea.
    addChar(char_) {
        this.cardText += char_;
    }

    setState(newState_) {
        this.state = newState_;

        switch (this.state) {
            case "idle":
                {
                    this.state = "idle";
                    this.isSelected = false;
                    break;
                }
            case "selected":
                {
                    this.state = "selected";
                    this.isSelected = true;
                    break;
                }
            default: {
                break;
            }
        }
    }

    get getState() {
        return this.state;
    }


    isSelected;
    hasChanged;
    htmlref;
    id;
    cardText;
    state;
    #component;
}

Object.setPrototypeOf(Card.prototype, baseBotionObject.prototype);
Card.prototype.type = "Card";

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

        switch (message.state) {
            case "WRITETOAPP":
                {



                    let templateCard = new Card();


                    let template = document.createElement("div");
                    template.setAttribute("class", "Card Component");
                    // what is the id here?
                    template.setAttribute("id", "card-" + message.currentCard.id);

                    CardManager.getInstance().get_Component.send(message, "StyleManager");

                    /*Create a temporary card class, save all the json information
                    to it, then use that temporary class to assign to Eventsystem 
                    object.s

              */
                    templateCard.type = message.currentCard.type;
                    templateCard.isSelected = message.currentCard.isSelected;
                    templateCard.hasChanged = message.currentCard.hasChanged;
                    templateCard.id = message.currentCard.id;
                    templateCard.state = message.currentCard.state;
                    templateCard.text = message.currentCard.cardText;

                    templateCard.htmlref = template;
                    templateCard.htmlref.textContent = message.currentCard.cardText;




                    message.currentCard = templateCard;


                    message.currentCard.htmlref.addEventListener("click", (event_) => {
                        let data = new BotionAppEventData(event_, templateCard, "selected");
                        cardHasBeenSelected(data);
                    })

                    console.log(message.currentCard.htmlref);

                    CardManager.getInstance().get_cardsArray.push(message.currentCard);

                    DashBoardNode.append(message.currentCard.htmlref);
                    break;
                }
        }
    }

    get get_Component() {
        return this.#component;
    }

    get get_cardsArray() {
        return this.#cardsArray;
    }

    get previous_card()
    {
        return this.#previousCard;
    }

    set_previous_card(prevCard)
    {
        this.#previousCard=prevCard;
    }

    //create card from blank.
    //Part of an event, so it makes sense for it to carry event data with it.
    /* 
        Just for notes here, if you wanted to be consistent with your programming 
        BotionAppEventData should be in the eventhandler that calls createCard, 
        not inside of it. But for the sake of speed, here we are.
    */
    createCard(card_) {
        /*setting of temporary variables 
            then to assign them to more perament variables
        */
        card_.htmlref = document.createElement("div");
        card_.htmlref.setAttribute("class", "Card Component");
        card_.htmlref.setAttribute("id", "card-" + (this.#cardsArray.length + 1)); //ID's will always start at 1.
        card_.id = this.#cardsArray.length + 1;
        //assigning all new data to BotionAppEventData.currentCard
        //also assigning a state called ADDCSS

        // this is an event system message, within a event system message.
        let data = new BotionAppEventData(null, card_, "ADDCSS");

        //send a Eventdata, sending a message that will inject css into my card.
        this.#component.send(data, "StyleManager");



        this.#cardsArray.push(data.currentCard);
        return data.currentCard
    }

    //create card from data

    RemoveCard(card_) {

    }

    static instance;
    #previousCard;
    #component;
    #cardsArray = [];
}

Object.setPrototypeOf(CardManager.prototype, baseBotionObject.prototype);
CardManager.prototype.type = "CardManager";

/*Style Manager Class 
    - Style Manager class should maintain collection of cards 
    - Style Manager should create classes like a factory class 
    - Style Manager should delete cards 
    - Style Manager should edit cards 
    - Style Manager should be able to retrieve the card's styling information

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

        switch (message.state) {
            case "WRITE":
                {
                    break;
                }
            case "READ":
                {
                    break;
                }
            case "ADDCSS":
                {
                    //card right now is a div.
                    const card = message.currentCard.htmlref;
                    const styleTemplate = `#${card.getAttribute("id")}.Card.Component { width:140px; height:140px; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c; opacity:0.5;` +
                        '}' +
                        `#${card.getAttribute("id")}.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}`;

                    const s = StyleManager.getInstance().get_Style;

                    const sNode = document.getElementById("mod-style");
                    sNode.append(styleTemplate);

                    break;
                }
            case "WRITETOAPP":
                {
                    const card = message.currentCard;

                    const styleTemplate = card.style;

                    const s = StyleManager.getInstance().get_Style;

                    const sNode = document.getElementById("mod-style");
                    sNode.append(styleTemplate);

                    break;
                }
            default:
                {
                    return 0;
                }
        }

    }

    retrieve_style(i) {
        const sNode = document.getElementById("mod-style");
        const styles = sNode.childNodes;


        return styles[i].data
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
Object.setPrototypeOf(StyleManager.prototype, baseBotionObject.prototype);
StyleManager.prototype.type = "StyleManager";

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
        /* There is read and write to the .JSON file and there is read nad write 
        to the application (Botion)
        */
        switch (message.state) {
            case "WRITE":
                {
                    const cardsref = CardManager.getInstance().get_cardsArray;
                    const styleref = StyleManager.getInstance();

                    for (let i = 0; i < cardsref.length; i++) {
                        botionSerial.insertEntry(botionSerial.get_botionJSON, `BotionData.card${i + 1}`, cardsref[i]);
                        botionSerial.insertEntry(botionSerial.get_botionJSON, `BotionData.card${i + 1}.style`, styleref.retrieve_style(i));
                    }
                    const stringified = JSON.stringify(botionSerial.get_botionJSON);
                    localStorage.setItem("BotionData", stringified);
                    break;
                }
            case "READ":
                {
                    const botionData = localStorage.getItem("BotionData");
                    const botionDataJSON = JSON.parse(botionData);

                    for (let objKey in botionDataJSON.BotionData) {
                        if (botionDataJSON.BotionData.hasOwnProperty(objKey)) {
                            const nestedObj = botionDataJSON.BotionData[objKey];
                            let data = new BotionAppEventData();

                            console.log(`Object key: ${objKey}`);
                            console.log(nestedObj);
                            let card = nestedObj;

                            /* with the objects in this loop, 
                            
                            call there managers and pass this object information in order 
                            to write in it.*/

                            data.currentCard = card;
                            data.state = "WRITETOAPP";
                            mediator.send(data, "BotionMemory", "CardManager");


                            for (let prop in nestedObj) {
                                if (nestedObj.hasOwnProperty(prop)) {
                                    console.log(` ${prop}: ${nestedObj[prop]}`);
                                }
                            }
                        }
                    }


                    console.log(botionDataJSON.BotionData);
                    break;
                }
            default:
                {
                    return 0;
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
Object.setPrototypeOf(BotionMemory.prototype, baseBotionObject.prototype);
BotionMemory.prototype.type = "BotionMemory";

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
    mediator.send(data_, "Mediator", "BotionMemory");
}

let applicationReadHandler = function (data_) {
    data_ = new BotionAppEventData(null, new Card(), "READ");
    console.log(data_.state);
    mediator.send(data_, "Mediator", "BotionMemory");
}

let applicationIconSaveHandler = function (data_) {
    data_.state = "WRITE";
    console.log("saved application");
    applicationWriteHandler(data_);
}


let dashBoardUpdateHandler = function (data_) {

    /*because all information here is mutiable 
    I am going to keep most things here as a let variable */
    let card = data_.data.currentCard;
    let event = data_.data.eventType;
    let string = data_.data.text;

    /*
    * if currentCard is the one that has been selected, then give it functionality, 
    if the currentCard isn't the one that has been selected look for the new selected one, 
    if it doesn't exist, run the rest of the if statement.
    */

    /* 
      you might want to not use card, in this case. because 
      you're checking to see if a card has been given the selected 
      state which is almost like you checking a previous update. 

    this code below, is working in a different context to your pure 
    event system data, update code.
    */
    const cardRef = CardManager.getInstance();
    for (let i = 0; i < cardRef.get_cardsArray.length; i++) {
        // how do I make sure only one card can be selected?
        if (cardRef.get_cardsArray[i].getState == "selected") {
            card = cardRef.get_cardsArray[i];
            CardManager.getInstance().set_previous_card(card);
        }
    }




    if (card != undefined) {
        if (string != undefined) {
            if (card.getState == "selected") {
                card.htmlref.textContent += string;
                card.addChar(string);

            } else if (card.getState == "idle") {

            }
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

    let keyboardHandler = function (event_) {
        const character = event_.key;
        let keyboardChar;
        let data = new BotionAppEventData(event_, null, "keypress");
        data.text = character;
        if (character != undefined) {
            switch (data.eventType.key) {
                //This will be remove in the near future this is simply just 
                //how I am building this new feature.
                //Since I am only sending the the keycodes and not changing the data, of the card here 
                // I might have to make it so that the cards, update themselves.
                //Enter should be a special command
                /* in this particular case you would have to do some sort of 
                css manipulation in order to complete this. */
                case "Enter":
                    {
                        data.text = "\n";
                        break;
                    }
                case "Tab":
                    {
                        data.text += '\t';
                        break;
                    }
                case " ":
                    {
                        data.text += ' '
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


    /*Intialization of html elements that I will use at the beginning 
    of my application  */
    const addHabitButton = document.getElementById("btnAdd");
    const saveIcon = document.getElementById("saveimg");


    let habitButtonH_over = function (event) {
        //Access div container through .html .css attribute
        const addDivElements = document.getElementsByClassName("Btn");

        const addHoverInfo = addDivElements[0].children[0];
        addHoverInfo.style.opacity = 1.0;
        update_Application(null);
    }
    addHabitButton.addEventListener("mouseover", (event) => {
        let data = new BotionAppEventData(event, null, "mouseover");
        habitButtonH_over(data);
    })

    let cardHasBeenSelectedHandler_click = function (data_) {
        data_.currentCard.setState("selected");
        if(CardManager.getInstance().previous_card!=undefined)
        {
            CardManager.getInstance().previous_card.setState("idle");
        }
        CardManager.getInstance().set_previous_card(data_.currentCard);
      
        console.log(data_);
        update_Application(data_);
    }

    let addCardButtonHandler_up = function (data_) {

        let data = data_;
        let newCard = new Card();

        data.currentCard = newCard;

        data.currentCard = cardMang.createCard(newCard);

        DashBoardNode.append(data.currentCard.htmlref);

        //I have to pass the card into this handler
        data.currentCard.htmlref.addEventListener("click", (event_) => {

            let data = new BotionAppEventData(event_, newCard, "selected");
            data.eventType = data.event;
            cardHasBeenSelected(data);
        }
        )

        update_Application(data_);
    }
    addHabitButton.addEventListener("mouseup", (event_) => {

        let data = new BotionAppEventData(event_, null, "mouseup");

        addNewCard(data);
    });

    let addButtonHoverInfoHandler_leave = function (data_) {

        let data = data_;

        const addDivElements = document.getElementsByClassName("Btn");

        const addHoverInfo = addDivElements[0].children[0];

        addHoverInfo.style.opacity = 0.0;

        update_Application(null);
    }

    addHabitButton.addEventListener("mouseleave", (event_) => {
        let data = new BotionAppEventData(event_, null, "mouseleave");

        addButtonHoverInfo(data);
    })

    saveIcon.addEventListener("mouseup", (event_) => {
        let data = new BotionAppEventData(event_, null, "mouseup");

        saveBotionIcon(data);
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
    const botionSerial = new BotionSerializer();
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

    function saveBotionIcon(data_) {
        mediator.dispatch("saveIcon", data_);
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
    mediator.enable("saveIcon", applicationIconSaveHandler);
    /* Mediator Custom Event enabling */


    /*Application Code  */

    function intialize() {

      

        mediator.register("BotionMemory", botionMem.get_Component);
        mediator.register("CardManager", cardMang.get_Component);
        mediator.register("StyleManager", styleMang.get_Component);
        mediator.register("Mediator", mediator.get_component);

        botionSerial.set_botionJSON = BASEBOTIONJSON;

        document.head.appendChild(styleMang.get_Style);

          //reload previously saved cards.
          if (localStorage.getItem("BotionData")) {
            window.addEventListener("DOMContentLoaded", () => {
                applicationReadHandler();
            });
        }

    }


    intialize();
    update_Application();


//let saveInterval = setInterval(applicationReadHandler, 2000); // Calls every 2.5 minutes, 150,000 ms = 2.5 minutes

//applicationWriteHandler();
/*Application Code  */
