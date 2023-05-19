class Dictionary {
    constructor() {
      this.inputEl = document.getElementById("input");
      this.infoTextEl = document.getElementById("info-text");
      this.meaningContainerEl = document.getElementById("meaning-container");
      this.titleEl = document.getElementById("title");
      this.meaningEl = document.getElementById("meaning");
      this.audioEl = document.getElementById("audio");
  
      this.inputEl.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }
  
    handleKeyUp(e) {
      if (e.target.value && e.key === "Enter") {
        this.fetchAPI(e.target.value);
      }
    }
  
    async fetchAPI(word) {
      try {
        this.displayLoadingState(word);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
  
        if (result.title) {
          this.displayNoMeaning(word);
        } else {
          this.displayMeaning(result);
        }
      } catch (error) {
        this.displayError(word);
      }
    }
  
    displayLoadingState(word) {
      this.infoTextEl.style.display = "block";
      this.meaningContainerEl.style.display = "none";
      this.infoTextEl.innerText = `Searching the meaning of "${word}"`;
    }
  
    displayNoMeaning(word) {
      this.meaningContainerEl.style.display = "block";
      this.infoTextEl.style.display = "none";
      this.titleEl.innerText = word;
      this.meaningEl.innerText = "N/A";
      this.audioEl.style.display = "none";
    }
  
    displayMeaning(result) {
      this.infoTextEl.style.display = "none";
      this.meaningContainerEl.style.display = "block";
      this.audioEl.style.display = "inline-flex";
      this.titleEl.innerText = result[0].word;
      this.meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      this.audioEl.src = result[0].phonetics[0].audio;
    }
  
    displayError(word) {
      this.infoTextEl.innerText = `An error occurred while searching for "${word}", please try again later.`;
    }
  }
  
  new Dictionary();
  