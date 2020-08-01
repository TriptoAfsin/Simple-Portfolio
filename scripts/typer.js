console.log('Typer script loaded!');



const TypeWriter = function(txtElement, words, wait = 2000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

//Type method
TypeWriter.prototype.type = function() {
    //Current index
    const current = this.wordIndex % this.words.length;
    //console.log(current);
    //Get full txt of current word
    const fullTxt = this.words[current];
    
    //check if deleting words
    if(this.isDeleting){
        //remove chars
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else{
        //add chars
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //insert txt into html
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type Speed
    let typeSpeed = 300; //initial speed
    if(this.isDeleting){
        typeSpeed = typeSpeed / 2;
    }

    //is complete
    if(!this.isDeleting && this.txt === fullTxt){

        typeSpeed = this.wait; // waiting when one word is complete
        //setDelte to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //moving to bext word
        this.wordIndex++;
        //pause before starting to type
        typeSpeed = 400;
    }


    setTimeout(() => this.type(), typeSpeed)
}

//Init on DOM laod

document.addEventListener('DOMContentLoaded', init);
//Init app

function init(){
    const txtElement = document.getElementById('txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init typewriter

    new TypeWriter(txtElement, words, wait);
}