/*
 * Author: Jairo Alberto Morelli Santamaria
 * Description: Written May 13th 2025
 * License: Do not copy or redistribute without permission.
 */

/*Functionality/Defintion Code */

const applicationUpdate = new CustomEvent("update", {
    detail: { message: 'this is my update event for my botion application' },
    bubbles: true,
    cancelable: true
}
);
/*Class delecrations*/
/*Mediator design pattern used for 

Define an objec that encapsualtes how a set of objects interact. Mediator promotes
loose coupling by keeeping objects from referring to each other explicitly, and it lets you 
vary their interaction indepedently. 
*/

class BotionMediator {
    constructor() {
        this.components = {};
        this.events = {};
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
    on(eventName, handler)
    {

    }
    // function to communicate with application events
    off(eventName,handler)
    {

    }
    //function to communicate with application events
    emit(eventName,data)
    {

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
        this.isSelected = false;
        this.hasChanged = false;
        this.htmlref = HTMLElement;
        this.id;
    }
    update() {

    }
    isSelected = false;
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
        this.#listenerRegistry = new WeakMap();
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

    get get_listenerRegistry() {
        return this.#listenerRegistry;
    }

    /*Working with an html element here*/
    createCard(card_) {
        card_ = document.createElement("div");
        card_.setAttribute("class", "Card Component");
        card_.setAttribute("id", "card-" + (this.#cardsArray.length + 1)); //ID's will always start at 1.
        this.#component.send(card_, "StyleManager");
        this.#cardsArray.push(card_);
        return card_;
    }
    /* */
    addClickListener(card_) {

        const cardS_ID = "card_ID: " + card_.getAttribute("id");

        /*Might have to add alot of functionality here
            If card was clicked 
            if other card was click therefore 
            previously unselect the last selected card, etc, etc.
        */
        let clickHandler = function (event) {
            /*If the card selected is a different card from, the 
            previously selected card.
            */
            if (CardManager.getInstance().#previousCard != card_) {
                CardManager.getInstance().#previousCard = card_;
                CardManager.getInstance().#previousCard.isSelected = false;
                card_.isSelected = true;
                console.log("Previous card has been unselected");
            } else { // if current card has been selected

            }
            console.log(cardS_ID);
            console.log(CardManager.getInstance().#listenerRegistry);
            update_UI();
        };

        this.#listenerRegistry.set(card_, clickHandler);

        // Attach the event listener to the element 
        card_.addEventListener("mouseup", clickHandler);
    }

    static instance;
    #component;
    #cardsArray = [];
    #listenerRegistry;
    #previousCard
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
        this.#style.setAttribute("id", "mod-style");
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
            Just a reminder when you're calling this function 

            "this" does not refer to, the styleManager instance, "this" refers to actually 
            whatever manager or component is calling it.
        */
        /* 
         Here take the current card and then update its style attributes and then append 
         to the document object model.
        */


        // // This needs to be more modular.
        // style.textContent = '#card-5.Card.Component{ width:70px; height:70p; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c' +
        //     '}' +
        //     '#card-5.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}'
        //    document.head.appendChild(style);


        /*Becare when usings strings to build stuff. */
        const styleTemplate = `#${message.getAttribute("id")}.Card.Component { width:140px; height:140px; padding:10px;background-color:#669171; overflow-wrap:anywhere; border: 2.5px solid #0c0d0c; opacity:0.5;` +
            '}' +
            `#${message.getAttribute("id")}.Card.Component p {opacity:0.3; font-size:12px; text-align:center;}`;

        const s = StyleManager.getInstance().get_Style;

        /*I have to check first if the 
            modular stylesheet exist 

            and then append after the previous node.
        */


        /*
        To properly append what you need to do is 
        access the modular style sheet. 
        
        then add the node that you want to add.
        */
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

/*
    Over here you'll have your respective types of 
    UI updates, 

    if it is a card, then update the card function, and update the 
    associated json information.

    here you can literally just check up with the system component's

    To put this into proper context, your loop is like this 

    start() <- google-chrome 
     |
   Intialize() <- your code
     | 
    EventListeners() <- something you don't see easily 
     | 
    UI_Update() <-Again your code 
*/
document.addEventListener("update", (event) => {
    console.log('custom event trigger:', event.detail.message);
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
    update_UI();
})


/*
Just a note that I want to bring up. Depending on where I inject 
my javascript code in the html file, this code below will either run before 
the DOM has been fully loaded or after.

I've gone with the design choice of injecting my javascript code after the DOM file has mostly loaded.
*/
const addHabitButton = document.getElementById("btn-add");

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

    update_UI();

})

addHabitButton.addEventListener("mouseup", () => {
    let newCard = new Card();
    newCard.htmlref = cardMang.createCard(newCard.htmlref);

    cardMang.addClickListener(newCard.htmlref);

    DashBoardNode.append(newCard.htmlref);

    update_UI();
})

addHabitButton.addEventListener("mouseleave", () => {

    const addDivElements = document.getElementsByClassName("Btn");

    const addHoverInfo = addDivElements[0].children[0];

    addHoverInfo.style.opacity = 0.0;
    update_UI();
})

/*Functionality/Defintion Code*/

/*Global variables */

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

/*Global variables */


/*Application Code  */

/*This is where the application code lives, or application logic lives*/

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

function update_UI() {
    document.dispatchEvent(applicationUpdate);
}

/*Application Code  */



intialize();
update_UI();



