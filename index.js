const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

function getRandomQuote() {
    const quotes = [
        "Short cuts make long delays. - Pippin",
        "The wise speak only of what they know. - Gandalf",
        "Even the smallest person can change the course of the future. - Galadriel",
        "Not all those who wander are lost. - Bilbo Baggins",
        "The praise of the praiseworthy is above all rewards. - Faramir",
        "Courage is found in unlikely places. - Gildor",
        "All's well that ends better. - Hamfast Gamgee",
        "Deeds will not be less valiant because they are unpraised. - Aragorn",
        "It is not the strength of the body, but the strength of the spirit. - J.R.R. Tolkien",
        "It's the job that's never started as takes longest to finish. - Sam Gamgee",
        "Your time will come. You will face the same Evil, and you will defeat it. - Arwen",
        "This day does not belong to one man but to all. Let us together rebuild this world that we may share in the days of peace. - Aragorn",
        "Despair is only for those who see the end beyond all doubt. We do not. - Gandalf",
        "Memory is not what the heart desires. That is only a mirror. - Gimli",
        "The Quest stands upon the edge of a knife. Stray but a little, and it will fail, to the ruin of all. Yet hope remains while the Company is true. - Galadriel",
        "Who knows? Have patience. Go where you must go, and hope! - Gandalf",
        "Oft hope is born when all is forlorn. - Legolas",
        "Do not trouble your hearts overmuch with thought of the road tonight. Maybe the paths that you each shall tread are already laid before your feet, though you do not see them. - Galadriel",
        "Few other griefs amid the ill chances of this world have more bitterness and shame for a man's heart than to behold the love of a lady so fair and brave that cannot be returned. - Aragorn",
        "May it be a light to you in dark places, when all other lights go out. - Galadriel",
        "I would rather share one lifetime with you than face all the ages of this world alone. - Arwen",
        "Don't adventures ever have an end? I suppose not. Someone else always has to carry on the story. - Bilbo Baggins",
        "May your beer be laid under an enchantment of surpassing excellence for seven years! - Gandalf",
        "The world is full enough of hurts and mischances without wars to multiply them. - Warden",
        "There's some good in this world, Mr. Frodo... and it's worth fighting for. - Sam Gamgee",
        "All we have to decide is what to do with the time that is given us. - Gandalf",
        "The world is indeed full of peril, and in it there are many dark places; but still there is much that is fair, and though in all lands love is now mingled with grief, it grows perhaps the greater. - Haldir",
        "Faithless is he that says farewell when the road darkens. - Gimli",
        "He that breaks a thing to find out what it is, has left the path of wisdom. - Gandalf",
        "The wide world is all about you: you can fence yourselves in, but you cannot forever fence it out. - Gildor",
        "The Ring has awoken, it's heard its master's call. - Gandalf",
        "It is a strange fate that we should suffer so much fear and doubt over so small a thing... such a little thing. - Boromir",
        "A wizard is never late, Frodo Baggins. Nor is he early; he arrives precisely when he means to. - Gandalf",
        "Fly, you fools! - Gandalf",
        "I don't know half of you half as well as I should like, and I like less than half of you half as well as you deserve. - Bilbo Baggins",
        "You may learn something, and whether what you see be fair or evil, that may be profitable, and yet it may not. Seeing is both good and perilous. - Galadriel",
        "Yet such is oft the course of deeds that move the wheels of the world: small hands do them because they must, while the eyes of the great are elsewhere. - Elrond",
        "It is a strange fate that we should suffer so much fear and doubt over so small a thing. Such a little thing. - Boromir",
        "It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to. - Frodo",
        "This day does not belong to one man but to all. Let us together rebuild this world that we may share in the days of peace. - Aragorn",
        "If we didn't do everything we weren't supposed to, we'd hardly do anything at all. - Nori Brandyfoot",
        "Beauty has great power to heal the soul. - Arondir",
        "But in the end it's only a passing thing, this shadow; even darkness must pass. - Sam Gamgee",
        "In this hour, I do not believe that any darkness will endure. - Faramir",
        "For behold! the storm comes, and now all friends should gather together, lest each singly be destroyed. - Gandalf",
        "Hope is never mere, even when it is meager. - Gil-Galad",
        "Everyone, each of us, needs to decide who we shall be. - Queen Regent Miriel",
        "For the time will soon come when Hobbits will shape the fortunes of all. - Galadriel",
        "Evil will be drawn to you from outside the fellowship. And, I fear, from within you must trust yourself. Trust your own strengths. - Gandalf",
        "Moonlight drowns out all but the brightest stars. - J.R.R. Tolkien",
        "You shall not pass! - Gandalf",
        "I can't carry it for you, but I can carry you. - Sam Gamgee",
        "Do not be so quick to deal out death and judgment. Even the very wise do not see all ends. - Gandalf",
        "The old world will burn in the fires of industry. The forests will fall. A new order will rise. - Saruman",
        "You have no authority here! Your orders mean nothing! - Eomer",
        "Even darkness must pass. A new day will come. And when the sun shines it will shine out the clearer. Those were the stories that stayed with you, that meant something, even if you were too small to understand why. - Samwise Gamgee",
        "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world. - Thorin Oakenshield",
        "A hunted man sometimes wearies of distrust and longs for friendship. - Aragorn",
        "It is useless to meet revenge with revenge: it will heal nothing. - Frodo",
        "But do not despise the lore that has come down from distant years; for oft it may chance that old wives keep in memory word of things that once were needful for the wise to know. - Celeborn",
        "I wonder if we'll ever be put into songs or tales. - Samwise Gamgee",
        "It is no bad thing to celebrate a simple life. - Bilbo Baggins",
        "I thought up an ending for my book: 'And he lived happily ever after, unto the end of his days.' - Bilbo Baggins",
        "You can not hide, I see you! There is no life after me. Only death! - Sauron",
        "No, thank you! We don't want any more visitors, well-wishers or distant relations! - Bilbo Baggins",
        "The board is set, the pieces are moving. We come to it at last, the great battle of our time. - Gandalf",
        "You are the luckiest, the canniest, and the most reckless man I ever knew. - Gimli",
        "When in doubt, follow your nose. - Gandalf",
        "All shall love me and despair! - Galadriel",
        "I will take the Ring, though I do not know the way. - Frodo",
        "I can avoid being seen, if I wish, but to disappear entirely, that is a rare gift. - Aragorn",
        "Potatoes! Boil 'em, mash 'em, stick 'em in a stew. - Samwise Gamgee",
        "You'll find more cheer in a graveyard. - Gimli",
        "War will make corpses of us all. - Faramir",
        "There can be no trust between hammer and rock. - King Durin III",
        "There is no secret worth concealing with deception. - Elrond",
        "An avalanche can start with one stone. - Pharazon",
        "Nothing is evil in the beginning. - Galadriel",
        "There is only one Lord of the Ring, only one who can bend it to his will. And he does not share power. - Gandalf",
        "Anyways, you need people of intelligence on this sort of... mission... quest... thing. - Pippin",
        "Oh, it's quite simple. If you are a friend, you speak the password, and the doors will open. - Gandalf",
        "We swears, to serve the master of the Precious. We will swear on... on the Precious! - Gollum",
        "But no living man am I! You look upon a woman. - Eowyn",
        "To crooked eyes truth may wear a wry face. - Gandalf",
        "Valour needs first strength, and then a weapon. - J.R.R. Tolkien",
        "I was talking aloud to myself. A habit of the old: they choose the wisest person present to speak to. - J.R.R. Tolkien",
        "Let him not vow to walk in the dark, who has not seen the nightfall. - Elrond",
        "I will not say: do not weep; for not all tears are an evil. - Gandalf",
        "None knows what the new day shall bring him. - Aragorn",
        "I am Gandalf the White. And I come back to you now... at the turn of the tide. - Gandalf"
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

app.get("/quote", (req, res) => {
    const quote = getRandomQuote();

    res.json({
        quote: quote,
    });
});

app.listen(3000, () => console.log('API Server is running...'));