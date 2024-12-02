//This is my first hands on web dev, i have comments in between, for what i think may be useful and are unique.
let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");
const xptext = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name:"Stick",
        power:5
    },
    {
        name:"Dagger",
        power:30
    },
    {
        name:"Thor Hammer",
        power:50
    },
    {
        name:"Dragon Slayer Sword",
        power:100
    }
];

const monsters = [
    {
        name:"Slime",
        level:2,
        health:15
    },
    {
        name:"Fanged Beast",
        level:8,
        health:60
    },
    {
        name:"Dragon",
        level:20,
        health:300
    }
]

const locations = [
    {
        name:"town square",
        "button text":["Go to Store","Go to Cave","Fight Dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"You are in the Town Square. What a pleasant day it is."
    },
    {
        name:"store",
        "button text":["Buy 10 health (10 gold)","Buy Weapon (30 gold)","Go to Town Square"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"You entered the Store."
    },
    {
        name:"cave",
        "button text":["Fight Slime","Fight fanged beast","Go to Town Square"],
        "button functions":[fightSlime,fightBeast,goTown],
        text:"You entered the Cave. Beware, You see some monsters"
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button functions":[attack,dodge,goTown],
        text:"*Narrator Gulps* \"You are figthing a monster.\" "
    },
    {
        name:"kill monster",
        "button text":["Go to Town Square","Go to Town Square","Go to Town Square"],
        "button functions":[goTown,goTown,easterEgg],
        text:"The monster screams \"Arg!\" as it dies. You gain xp and gold. Good Job Champ."
    },
    {
        name:"lose",
        "button text":["Respawn","Respawn","Respawn"],
        "button functions":[restart,restart,restart],
        text:"You got absolutely destroyed, not even a chance."
    },
    {
        name:"win",
        "button text":["Replay?","Please Resplay?","Cmon Respawn and Replay?"],
        "button functions":[restart,restart,restart],
        text:"You defeated the big snake lizard (dragon)! You win the Game."
    },
    {
        name:"easter egg",
        "button text":["2","8","Go to Town Square?"],
        "button functions":[pickTwo,pickEight,goTown],
        text:"You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Important
 
/* 
    Notice that when we write button1.onclick = goStore;, we don't use parentheses (goStore()), because we’re 
    assigning the reference to the goStore function, not calling it immediately.If you used 
    button1.onclick = goStore();, the function would execute immediately when the page loads,
    and the return value (if any) of goStore would be assigned to onclick, which is not what we want.
    By assigning goStore (without parentheses), we’re telling JavaScript to store a reference to the function in
    the onclick property. This means "Call this function when the event occurs."

    Also, it's important to understand that onclick is a property, not a function.  
    Specifically, it's an event handler property designed to hold a function that will be invoked when the
    click event occurs on the button. By default, button.onclick is explicitly initialized to null by the browser
    when the DOM element is created. (if no function is assigned).
    After you assign a function (e.g., button.onclick = goStore), the property holds a reference to that function.
    The browser will invoke this function when the event is triggered.
*/

function goTown()
{
    update(locations[0]);
}

function goStore()
{
    update(locations[1]);
}

function goCave()
{
    update(locations[2]);
}

function update(location)
{
    monsterStats.style.display = "none"; // note that it will remove monsterStats everytime you change your location.
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    text.innerText = location.text; //or instead of just location.text, you could even use location["text"].
}

function buyHealth()
{
    if(gold>=10)
    {
        gold-=10;
        health+=10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else
    {
        text.innerText = "You do not have enough money for the health, kid.";
    }
}

function buyWeapon()
{
    if(currentWeapon<weapons.length-1)
    {
        if(gold>=30)
        {
            gold-=30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "You now have a "+ newWeapon +".";
            text.innerText += " You now have upgraded your existing weapon to "+newWeapon+ " . Go Beserk."
        }
        else
        {
            text.innerText = "You do not have enough money for the weapon, kid.";
        }
    }
    else 
    {
        text.innerText = "You already have the most Powerful Weapon with you. There is nothing more i can give you. Well You can sell me Weapon though, if you need gold."
        button2.innerText = "Sell Weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}   

function sellWeapon()
{
    if(inventory.length > 1)
    {
        gold += 15;
        goldText.innerText = gold;
        let weaponRightNow =  inventory.shift();
        //shift removes and returns the first element and shifts all elements one position to the left while pop gives the last element.
        text.innerText = "You sold a "+weaponRightNow+".";
        text.innerText += "In your inventory you have: "+inventory;
    }
    else
    {
        text.innerText = "Don't sell your only weapon kid, how are you going to fight the monsters then, by emotional damage?"
    }

}

function fightSlime()
{
    fighting = 0;
    goFight();
}

function fightBeast()
{
    fighting = 1;
    goFight();
}

function fightDragon()
{
    console.log("Fighting Dragon.");
    fighting = 2;
    goFight();
}

function goFight()
{
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block"; // i am using js to dynamically change a part of the css file, here i am changing a parameter called display in the #monsterStats in the style.css file.
    // in the above line, we are basically going to monsterStats which is a div id, and then select the style part of that id, and then change the display parameter of that id's styling to "block".
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack()
{
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";

    health -= getMonsterAttackValue(monsters[fighting].level);

    if(isMonsterHit())
    {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1;
    }
    else
    {
        text.innerText += " You Miss. "
    }
    //floor method rounds off numbers just like in other programming languages
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0)
    {
        lose();
    }
    else if (monsterHealth <= 0)
    {
        fighting === 2 ? winGame():defeatMonster(); //using ternary operator instead of normal if else statement
    }

    //note 
    
    // double equals sign "==" compares the values after doing any necessary type coercion
    // triple equals sign "===" compares the values without any such coercions
    //type conversions(casting) are explicit while type conercions are implicit.

    if(Math.random()<=0.1 && inventory.length !== 1) 
    {
        text.innerText = " Your "+ inventory.pop() + " breaks.";
        currentWeapon--;
    }

    //note

    // notice the "!==", its  a strict inequality
    // its analogous to "==" and "===", 5=="5" will return true, while 5==="5" will return false since one is an int while other is string
    // similarly null==undefined returns true while null===undefined returns false, cuz they are different types.
    // null is of object datatype, undefined is of undefined datatype

    // null represents intentional absence of any value. It is explicitly assigned to indicate that a variable or property has no value.
    // while undefined indicates variable defined but not assigned a value, or that a property/method is missing.
}

function getMonsterAttackValue(level)
{
    let hit = (level * 5) - (Math.floor(Math.random()*xp));
    return hit;
}

function isMonsterHit()
{
    return Math.random()>0.2 || health < 20; // so 80% chance that you would hit the monster or if your health is below 20, u will always hit.
    //btw Math.random ranges from 0 to 1.
}

function dodge()
{
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster()
{
    gold += Math.floor(monsters[fighting].level*6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xptext.innerText = xp;
    update(locations[4]);
}

function lose()
{
    update(locations[5]);
}

function winGame()
{
    update(locations[6]);
}


function restart()
{
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xptext.innerText = xp;
    goTown();
}

function easterEgg()
{
    update(locations[7]);
}

function pickTwo()
{
    pick(2);
}

function pickEight()
{
    pick(8);
}

function pick (guess)
{
    let numbers = [];
    while(numbers.length<10)
    {
        numbers.push(Math.floor(Math.random()*11))
    }

    text.innerText =  "You picked "+guess+". Here are the random numbers:\n";

    for(let i = 0;i<10;i++)
    {
        text.innerText += numbers[i]+"\n";
    }
    if (numbers.indexOf(guess) !== -1) 
    {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } 
    else 
    {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0)
        {
          lose();
        }
    }
}