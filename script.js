

let viewer;


document.addEventListener('DOMContentLoaded', function () {
    initializeViewer();
    displayBooks();

});

function initializeViewer() {

    viewer = OpenSeadragon({
        id: "openseadragon1",
        showNavigationControl: false,
        prefixUrl: "/openseadragon-bin-5.0.1/images/",
        tileSources: "/deepzoom_output/image.dzi",
        minZoomLevel: 0.01,
        zoomPerClick: 1,
        defaultZoomLevel: 0.4


    });

    viewer.addHandler('canvas-double-click', function processDoubleClick(event) {

        viewer.viewport.zoomBy(2)

    });


}

function displayBooks() {

    viewer.addHandler('canvas-click', function (event) {
        const viewportPoint = viewer.viewport.pointFromPixel(event.position);
        const listContainer = document.getElementById('listContainer');
        const header = document.getElementById('shelfHeader');
        const subHeader = document.getElementById('shelfSubHeader');
        listContainer.innerHTML = '';
        let listItems, headerText;

        if (viewportPoint.y < 0.5) {

            listItems = ["Akira, Katsuhiro Otomo", "Boys Run The Riot Vol 1, 2, 3, 4, Keto Gaku", "Last Night at the Telegraph Club, Malinda Lo", "For the Kid I Saw in My Dreams Vol 1, Kei Sanbe", "Sunny Vol 1, Taiyo Matsumoto", "Orange, Ichigo Takano", "Two Heads, Frith", "Nijigahara Holograph, Inio Asano", "Wotakoi Vol 1, 2, 3, 4, Fujita", "The Tea Dragon Festival, K. O'Neill", "Woman World, Aminder Dwalwal"];
            headerText = "Top Shelf"
            

        } else {

            listItems = ["The Push, Ashley Audrain", "Everyone in This Room Will Someday Be Dead, Emily Austin", "The Trouble With Being Alive, Cioran", "Women, Race, & Class, Angela Davis", "The Ones We're Meant to Find, Joan He", "This is How You Lose the Time War, Amal El-Mohtar", "The Hate U Give, Thomas", "The Poppy War, RF Kuang", "The Dragon Republic, RF Kuang", "The Burning God, RF Kuang", "I'm Glad My Mom Died, Jenette McCurdy", "The Impossible City, Karen Cheung", "Black Water Sister, Zen Cho", "PatternMaster, Octavia Butler", "Parable of the Talents, Octavia Butler", "In the Dreamhouse, Carmen Machado", "The Soul of an Octopus, Sy Montgomery", "Earthlings, Sayaka Murata", "Zen and the Art of Motorcycle Maintenance, Robert Pirsig", "Year of the Monkey, Patti Smith", "If Not, Winter, Anne Carsin", "Fiebre Tropical, Juliana Lopera", "In Case of Emergency, Mahsa Mohbali", "Voices From the Valley, Moira Weigel", "Trick Mirror, Jia Tolentino"];
            headerText = "Bottom Shelf"
        }
        
        subHeader.textContent = "°。°。°。°。";
        header.textContent = headerText;
        const ul = document.createElement("ul");
        ul.classList.add("custom-list");
        listItems.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = item;
            li.setAttribute('data-tooltip', getHoverContent(item));
            ul.appendChild(li);

        });

        listContainer.append(ul);

    });
}



function getHoverContent(bookTitle) {


    const bookData = {

        // top shelf
        "Akira, Katsuhiro Otomo": "My thoughts: A classic, not much else to say. I need to finish the series one day.",
        "Boys Run The Riot Vol 1, 2, 3, 4, Keto Gaku": "My thoughts: My fav LGBTQ+ manga. The main plot focuses on a trans person, and the characters are overall wholesome.",
        "Last Night at the Telegraph Club, Malinda Lo": "One of my fav books of all time. Based in SF so it holds a special place in my heart. Super queer and it details what life was like as a queer person in sf during a time before me.",
        "Orange, Ichigo Takano": "If my friends know one thing about me, it's that this manga/anime is the only piece of media that has EVER made me cry. It's just too good. I think the manga is categorized as a romance but it's definitely more of a story of friendship. Hug ur friends.",
        "Wotakoi Vol 1, 2, 3, 4, Fujita": "The art is cute but it's too corny for me personally",
        //bottom shelf
        "The Push, Ashley Audrain": "Predictable and got kinda boring but the plot has potential.",
        "Everyone in This Room Will Someday Be Dead, Emily Austin": "Also one of my favorite books. The main character is about a lesbian with OCD that fixates on death and dying. The portrayal of OCD was so real that the book gave me anxiety at some points lol.",
        "The Trouble With Being Alive, Cioran": "A philosophical book but I found it way too existential. Life is just not that serious. No need to be a doomer.",
        "This is How You Lose the Time War, Amal El-Mohtar": "A beautifully written book about two women on opposite sides of war that fall in love. It's a bit too poetic for me, and I expected more of a fantasy plot since this is labeled as a fantasy book. It reads as a poem/collection of love letters, but still good nontheless.",
        "The Hate U Give, Thomas": "A classic. Thoroughly explores systemic racism, police brutality, and their impacts on black communities. I didn't read this until I was an adult but it should be a required reading for everyone. ",
        "The Poppy War, RF Kuang": "The first book in one of my all time fav trilogies by one of my all time fav authors. School setting with magical element, war, and class critiques.",
        "The Dragon Republic, RF Kuang" : "The most boring book of the 3 in the trilogy, but still good. In terms of mythical creatures, dragons are my least fav so I wasn't a huge fan of this storyline.",
        "The Burning God, RF Kuang": "Um... heartbreaking... tragic... I've never read anything like it and I hope I never do again because it was just that sad.",
        "I'm Glad My Mom Died, Jenette McCurdy": "Super sad book but eye opening for someone that grew up on watching the shows Jenette starred in. Definitely more graphic than I predicted.",
        "In the Dreamhouse, Carmen Machado": "A lifechanging book about abuse within queer relationships. The book takes a choose your own adventure approach which immersed you in the author's personal experiences.",
        "Earthlings, Sayaka Murata": "One of the most disturbing pieces of translated literature I've ever read. Look up trigger warnings before reading, seriously. I can't even say whether I liked this book or not because the plot was overshowed by the gruesome characters and their actions",
        "Year of the Monkey, Patti Smith": "I couldn't get into this one... the book bounces between reality and dream and I was constantly confused.",



    };

    return bookData[bookTitle] || "Review: I haven't reviewed this yet...";
}




