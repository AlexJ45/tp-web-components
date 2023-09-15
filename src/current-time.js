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
  }
  connectedCallback() {
    if (this.format == "utc") {
      this.innerHTML = `
        <p class="current-time__title">Heure UTC</p>
        <time class="current-time__time">${new Date().toUTCString()}</time>
        `;
      this.$time = this.querySelector("time");

      this.intervalId = setInterval(() => {
        this.$time.innerHTML = new Date().toUTCString();
        console.log("Heure de UTC : " + this.$time.innerHTML);
      }, 1000);
    } else {
      this.innerHTML = `
      <p class="current-time__title">Heure Locale</p>
      <time class="current-time__time">${new Date().toLocaleString()}</time>
      `;
      this.$time = this.querySelector("time");

      this.intervalId = setInterval(() => {
        this.$time.innerHTML = new Date().toLocaleString();
        console.log("Heure de actuelle : " + this.$time.innerHTML);
      }, 1000);
    }
  }

  disconnectedCallback() {
    console.log("Heure de déconnexion : " + this.$time.innerHTML);
    clearInterval(this.intervalId);
  }
}

customElements.define("current-time", CurrentTime);
