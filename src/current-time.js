class CurrentTime extends HTMLElement {
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
    this.intervalId = null;
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
    /*this.title = this.format === "utc" ? "Heure UTC ": "Heure Locale" */
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
class ScreenSize extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unit = "px";
    this.render();
    this.resizeListener = this.renderSize().bind(this);
    window.addEventListener("resize", this.resizeListener);
    this.$btn = this.shadowRoot.querySelector("button");

    if (this.$btn) {
      this.$btn.addEventListener("click", () => {
        this.unit = this.unit === "px" ? "rem" : "px";
        this.render();
      });
    }
  }
  static get observedAttributes() {
    return ["unit"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "unit" && oldVal !== newVal) {
      this.unit = newVal;
    }
  }
  renderSize() {
    this.width =
      this.unit === "px" ? window.innerWidth : window.innerWidth / 16;
  }
  render() {
    this.btntext = this.unit === "px" ? "rem" : "px";

    this.renderSize();
    this.shadowRoot.innerHTML = `
    <style>
    :host{
      color: rgb(234, 234, 234);
        background-color: rgb(38, 38, 38);
        border-radius: 20px;
        position: fixed;
        top: 0;
        right: 0;
        padding: 1rem;
        margin: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;}
        </style>
    <p>${this.width} ${this.unit}</p>
    <button>${this.btntext}</button>
    `;
  }

  disconnectedCallback() {
    this.resizeListener = null;
  }
}
customElements.define("current-time", CurrentTime);
customElements.define("screen-size", ScreenSize);
