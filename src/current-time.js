class CurrentTime extends HTMLElement {
  constructor() {
    super();
    this.intervalId = null;
  }
  static get observedAttributes() {
    return ["format"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "format" && oldVal !== newVal) {
      this.format = newVal;
    }
    if (this.$time) {
      this.render();
    }
  }
  connectedCallback() {
    this.render();
    this.intervalId = setInterval(() => {
      if (this.format == "utc") {
        this.$time.innerHTML = new Date().toUTCString();
      } else {
        this.$time.innerHTML = new Date().toLocaleString();
      }
    }, 1000);
  }

  disconnectedCallback() {
    console.log("Heure de déconnexion : " + this.$time.innerHTML);
    clearInterval(this.intervalId);
  }
  render() {
    /*this.title = this.format === "utc" ? "Heure UTC : "Heure Locale" */
    if (this.format == "utc") {
      this.$date = new Date().toUTCString();
      this.title = "Heure UTC";
    } else {
      this.$date = new Date().toLocaleString();
      this.title = "Heure Locale";
    }
    this.innerHTML = `
        <p class="current-time__title">${this.title}</p>
        <time class="current-time__time">${this.$date}</time>
        `;
    this.$time = this.querySelector("time");
  }
}

customElements.define("current-time", CurrentTime);
