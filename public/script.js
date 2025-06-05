//  The special header and footer starts here
class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="responsive-header">
        <header>
            <div class="inner-header">
                <div class="logo-container">
                    <a href="index.html"><img src="images/icons/logo/Orban Forest Logo_white_website.png" alt="orban forest logo white."/></a>
                    <a><p>Orban Forest Inc.</p></a>
                </div>
                
                
                <ul class="navigation">
                    <a href="index.html"><li>Home</li></a>
                    <a href="about-us.html"><li>About Us</li></a>
                    <a href="contact-us.html"><li>Contact Us</li></a>
                    <a id="call-button" href="https://wa.me/+13659948961"><li><button>Call Us</button></li></a>
                </ul>
                <label class="hamburger-menu">
                    <input type="checkbox">
                </label>
                <aside class="sidebar">
                    <nav>
                        <div><a href="index.html">Home</a></div>
                        <div><a href="about-us.html">About Us</a></div>
                        <div><a href="contact-us.html">Contact Us</a></div>
                        
                    </nav>
                </aside>         
            </div>
        </header>
        <div class="mobile-call-button">
            <a href="tel:1-365-994-8961"><button>Call us</button></a>
        </div>
     <hr class="header-hr">   
    </section>
    
    <style>
      #call-button button {
        background-color: #a82eff;
      }
    </style>
    `;
  }
}

customElements.define("special-header", SpecialHeader);

class SpecialFooter extends HTMLElement {
  // connectedCallback() {
  //   this.innerHTML = `
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <footer class="footer-container">
        <div class="inner-footer">
          <div class="footer-info">
            <p>+13659948961</p>
            <p>hello@orbanforest.ca</p>
          </div>
          <div class="copyright">
            <a id="scrollTopLink" href="#"><img src="images/icons/arrow_white_1.png" alt="Back to top arrow. Description: white arrow pointing up."></a>
            <p>Orban Forest Inc &copy; 2025</p>
          </div>
        </div>
      </footer>
      <style>
        footer {
    padding: 0;
    list-style: none; text-decoration: none;
    width: 100%;
    display: flex;
    flex-direction: column;    
    overflow: hidden;
    padding: 70px 0;
    box-sizing: border-box;    
    margin-top: -3rem;
}
.inner-footer {   
    margin: 0 auto;
    width: 1100px;
    height: 100%;

    display: flex; flex-direction: column;
    justify-content: center;
    align-items: center; 
}
.footer-logo {
    display: flex;
    width: 60%;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
}
.footer-info {
    width: 80%;
    display: flex;
    justify-content: space-between;
}
.copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: -4rem;
}
.copyright a:hover {
    transform: scale(120%);
    transition: 200ms ease-in-out;
}
.inner-footer>.copyright {
    font-size: .8rem;
    width: 100%;
    display: flex;
    justify-content: center;
}
@media (max-width: 360px) {
footer {
      margin-top: 2rem;
}    
.inner-footer {
      padding: 40px 0px;
      width: 100%;
    }
    
    .footer-info {
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
}
@media screen and (max-width: 480px) {
    footer {
      margin-top: 0.2rem;
      margin-bottom: 1rem;
}  
    .inner-footer {
      width: 95%;
      margin-top: -3rem;
      margin-bottom: -4rem;
    }
    
    .footer-logo {
      width: 90%;
    }
}
      </style>
    `;
    this.scrollTopLink = this.shadowRoot.getElementById("scrollTopLink");

    // Using arrow function to preserve 'this' context
    this.scrollTopLink.addEventListener("click", (event) => {
      this.scrollToTop(event);
    });
  }

  disconnectedCallback() {
    this.scrollTopLink.removeEventListener("click", this.scrollTopLink.onclick);
  }

  scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  }
}

customElements.define("special-footer", SpecialFooter);

// The header and footer templating ends here

// The style on scroll effect on the header starts here

const responsiveHeader = document.querySelector(".responsive-header");
const scrollWatcher = document.createElement("div");

scrollWatcher.setAttribute("data-scroll-watcher", "");

// Style the watcher element
scrollWatcher.style.position = "absolute";
scrollWatcher.style.top = "0";
scrollWatcher.style.height = "1px";
scrollWatcher.style.width = "100%";
scrollWatcher.style.pointerEvents = "none";
scrollWatcher.style.opacity = "0";

// Insert the watcher before the header
responsiveHeader.before(scrollWatcher);

// Create the IntersectionObserver
const navObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;

    // Toggle the 'sticking' class when the watcher is no longer visible
    responsiveHeader.classList.toggle("sticking", !entry.isIntersecting);
  },
  {
    rootMargin: "-1px 0px 0px 0px",
    threshold: 0,
  }
);

// Start observing the scroll watcher

navObserver.observe(scrollWatcher);

// --------------------------------------------------------------------
// hover glare and tilt effects start here

// media query set for screen width 1200px

if (window.innerWidth > 1280) {
  const dotSize = 5;

  const spacing = dotSize * 2;

  let dots = [];

  function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < width; i += spacing) {
      for (let j = 0; j < height; j += spacing) {
        let dot = new Dot(i, j, dotSize);
      }
    }
  }

  function draw() {
    background(0);
    dots.forEach((dot) => {
      dot.render();
    });
  }

  class Dot {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
    update() {}
    render() {
      ellipse(this.x, this.y, this.size);
    }
  }

  var VanillaTilt = (function () {
    "use strict";

    /**
     * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
     * Original idea: https://github.com/gijsroge/tilt.js
     * MIT License.
     * Version 1.8.1
     */

    class VanillaTilt {
      constructor(element, settings = {}) {
        if (!(element instanceof Node)) {
          throw (
            "Can't initialize VanillaTilt because " +
            element +
            " is not a Node."
          );
        }

        this.width = null;
        this.height = null;
        this.clientWidth = null;
        this.clientHeight = null;
        this.left = null;
        this.top = null;

        // for Gyroscope sampling
        this.gammazero = null;
        this.betazero = null;
        this.lastgammazero = null;
        this.lastbetazero = null;

        this.transitionTimeout = null;
        this.updateCall = null;
        this.event = null;

        this.updateBind = this.update.bind(this);
        this.resetBind = this.reset.bind(this);

        this.element = element;
        this.settings = this.extendSettings(settings);

        this.reverse = this.settings.reverse ? -1 : 1;
        this.resetToStart = VanillaTilt.isSettingTrue(
          this.settings["reset-to-start"]
        );
        this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
        this.glarePrerender = VanillaTilt.isSettingTrue(
          this.settings["glare-prerender"]
        );
        this.fullPageListening = VanillaTilt.isSettingTrue(
          this.settings["full-page-listening"]
        );
        this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
        this.gyroscopeSamples = this.settings.gyroscopeSamples;

        this.elementListener = this.getElementListener();

        if (this.glare) {
          this.prepareGlare();
        }

        if (this.fullPageListening) {
          this.updateClientSize();
        }

        this.addEventListeners();
        this.reset();

        if (this.resetToStart === false) {
          this.settings.startX = 0;
          this.settings.startY = 0;
        }
      }

      static isSettingTrue(setting) {
        return setting === "" || setting === true || setting === 1;
      }

      /**
       * Method returns element what will be listen mouse events
       * @return {Node}
       */
      getElementListener() {
        if (this.fullPageListening) {
          return window.document;
        }

        if (typeof this.settings["mouse-event-element"] === "string") {
          const mouseEventElement = document.querySelector(
            this.settings["mouse-event-element"]
          );

          if (mouseEventElement) {
            return mouseEventElement;
          }
        }

        if (this.settings["mouse-event-element"] instanceof Node) {
          return this.settings["mouse-event-element"];
        }

        return this.element;
      }

      /**
       * Method set listen methods for this.elementListener
       * @return {Node}
       */
      addEventListeners() {
        this.onMouseEnterBind = this.onMouseEnter.bind(this);
        this.onMouseMoveBind = this.onMouseMove.bind(this);
        this.onMouseLeaveBind = this.onMouseLeave.bind(this);
        this.onWindowResizeBind = this.onWindowResize.bind(this);
        this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

        this.elementListener.addEventListener(
          "mouseenter",
          this.onMouseEnterBind
        );
        this.elementListener.addEventListener(
          "mouseleave",
          this.onMouseLeaveBind
        );
        this.elementListener.addEventListener(
          "mousemove",
          this.onMouseMoveBind
        );

        if (this.glare || this.fullPageListening) {
          window.addEventListener("resize", this.onWindowResizeBind);
        }

        if (this.gyroscope) {
          window.addEventListener(
            "deviceorientation",
            this.onDeviceOrientationBind
          );
        }
      }

      /**
       * Method remove event listeners from current this.elementListener
       */
      removeEventListeners() {
        this.elementListener.removeEventListener(
          "mouseenter",
          this.onMouseEnterBind
        );
        this.elementListener.removeEventListener(
          "mouseleave",
          this.onMouseLeaveBind
        );
        this.elementListener.removeEventListener(
          "mousemove",
          this.onMouseMoveBind
        );

        if (this.gyroscope) {
          window.removeEventListener(
            "deviceorientation",
            this.onDeviceOrientationBind
          );
        }

        if (this.glare || this.fullPageListening) {
          window.removeEventListener("resize", this.onWindowResizeBind);
        }
      }

      destroy() {
        clearTimeout(this.transitionTimeout);
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }

        this.element.style.willChange = "";
        this.element.style.transition = "";
        this.element.style.transform = "";
        this.resetGlare();

        this.removeEventListeners();
        this.element.vanillaTilt = null;
        delete this.element.vanillaTilt;

        this.element = null;
      }

      onDeviceOrientation(event) {
        if (event.gamma === null || event.beta === null) {
          return;
        }

        this.updateElementPosition();

        if (this.gyroscopeSamples > 0) {
          this.lastgammazero = this.gammazero;
          this.lastbetazero = this.betazero;

          if (this.gammazero === null) {
            this.gammazero = event.gamma;
            this.betazero = event.beta;
          } else {
            this.gammazero = (event.gamma + this.lastgammazero) / 2;
            this.betazero = (event.beta + this.lastbetazero) / 2;
          }

          this.gyroscopeSamples -= 1;
        }

        const totalAngleX =
          this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
        const totalAngleY =
          this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

        const degreesPerPixelX = totalAngleX / this.width;
        const degreesPerPixelY = totalAngleY / this.height;

        const angleX =
          event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
        const angleY =
          event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

        const posX = angleX / degreesPerPixelX;
        const posY = angleY / degreesPerPixelY;

        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }

        this.event = {
          clientX: posX + this.left,
          clientY: posY + this.top,
        };

        this.updateCall = requestAnimationFrame(this.updateBind);
      }

      onMouseEnter() {
        this.updateElementPosition();
        this.element.style.willChange = "transform";
        this.setTransition();
      }

      onMouseMove(event) {
        if (this.updateCall !== null) {
          cancelAnimationFrame(this.updateCall);
        }

        this.event = event;
        this.updateCall = requestAnimationFrame(this.updateBind);
      }

      onMouseLeave() {
        this.setTransition();

        if (this.settings.reset) {
          requestAnimationFrame(this.resetBind);
        }
      }

      reset() {
        this.onMouseEnter();

        if (this.fullPageListening) {
          this.event = {
            clientX:
              ((this.settings.startX + this.settings.max) /
                (2 * this.settings.max)) *
              this.clientWidth,
            clientY:
              ((this.settings.startY + this.settings.max) /
                (2 * this.settings.max)) *
              this.clientHeight,
          };
        } else {
          this.event = {
            clientX:
              this.left +
              ((this.settings.startX + this.settings.max) /
                (2 * this.settings.max)) *
                this.width,
            clientY:
              this.top +
              ((this.settings.startY + this.settings.max) /
                (2 * this.settings.max)) *
                this.height,
          };
        }

        let backupScale = this.settings.scale;
        this.settings.scale = 1;
        this.update();
        this.settings.scale = backupScale;
        this.resetGlare();
      }

      resetGlare() {
        if (this.glare) {
          this.glareElement.style.transform =
            "rotate(180deg) translate(-50%, -50%)";
          this.glareElement.style.opacity = "0";
        }
      }

      getValues() {
        let x, y;

        if (this.fullPageListening) {
          x = this.event.clientX / this.clientWidth;
          y = this.event.clientY / this.clientHeight;
        } else {
          x = (this.event.clientX - this.left) / this.width;
          y = (this.event.clientY - this.top) / this.height;
        }

        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0), 1);

        let tiltX = (
          this.reverse *
          (this.settings.max - x * this.settings.max * 2)
        ).toFixed(2);
        let tiltY = (
          this.reverse *
          (y * this.settings.max * 2 - this.settings.max)
        ).toFixed(2);
        let angle =
          Math.atan2(
            this.event.clientX - (this.left + this.width / 2),
            -(this.event.clientY - (this.top + this.height / 2))
          ) *
          (180 / Math.PI);

        return {
          tiltX: tiltX,
          tiltY: tiltY,
          percentageX: x * 100,
          percentageY: y * 100,
          angle: angle,
        };
      }

      updateElementPosition() {
        let rect = this.element.getBoundingClientRect();

        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
      }

      update() {
        let values = this.getValues();

        this.element.style.transform =
          "perspective(" +
          this.settings.perspective +
          "px) " +
          "rotateX(" +
          (this.settings.axis === "x" ? 0 : values.tiltY) +
          "deg) " +
          "rotateY(" +
          (this.settings.axis === "y" ? 0 : values.tiltX) +
          "deg) " +
          "scale3d(" +
          this.settings.scale +
          ", " +
          this.settings.scale +
          ", " +
          this.settings.scale +
          ")";

        if (this.glare) {
          this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
          this.glareElement.style.opacity = `${
            (values.percentageY * this.settings["max-glare"]) / 100
          }`;
        }

        this.element.dispatchEvent(
          new CustomEvent("tiltChange", {
            detail: values,
          })
        );

        this.updateCall = null;
      }

      /**
       * Appends the glare element (if glarePrerender equals false)
       * and sets the default style
       */
      prepareGlare() {
        // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
        if (!this.glarePrerender) {
          // Create glare element
          const jsTiltGlare = document.createElement("div");
          jsTiltGlare.classList.add("js-tilt-glare");

          const jsTiltGlareInner = document.createElement("div");
          jsTiltGlareInner.classList.add("js-tilt-glare-inner");

          jsTiltGlare.appendChild(jsTiltGlareInner);
          this.element.appendChild(jsTiltGlare);
        }

        this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
        this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

        if (this.glarePrerender) {
          return;
        }

        Object.assign(this.glareElementWrapper.style, {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          "pointer-events": "none",
          "border-radius": "inherit",
        });

        Object.assign(this.glareElement.style, {
          position: "absolute",
          top: "50%",
          left: "50%",
          "pointer-events": "none",
          "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
          transform: "rotate(180deg) translate(-50%, -50%)",
          "transform-origin": "0% 0%",
          opacity: "0",
        });

        this.updateGlareSize();
      }

      updateGlareSize() {
        if (this.glare) {
          const glareSize =
            (this.element.offsetWidth > this.element.offsetHeight
              ? this.element.offsetWidth
              : this.element.offsetHeight) * 2;

          Object.assign(this.glareElement.style, {
            width: `${glareSize}px`,
            height: `${glareSize}px`,
          });
        }
      }

      updateClientSize() {
        this.clientWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;

        this.clientHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
      }

      onWindowResize() {
        this.updateGlareSize();
        this.updateClientSize();
      }

      setTransition() {
        clearTimeout(this.transitionTimeout);
        this.element.style.transition =
          this.settings.speed + "ms " + this.settings.easing;
        if (this.glare)
          this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;

        this.transitionTimeout = setTimeout(() => {
          this.element.style.transition = "";
          if (this.glare) {
            this.glareElement.style.transition = "";
          }
        }, this.settings.speed);
      }

      /**
       * Method return patched settings of instance
       * @param {boolean} settings.reverse - reverse the tilt direction
       * @param {number} settings.max - max tilt rotation (degrees)
       * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
       * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
       * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
       * @param {string} settings.easing - Easing on enter/exit
       * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
       * @param {number} settings.speed - Speed of the enter/exit transition
       * @param {boolean} settings.transition - Set a transition on enter/exit
       * @param {string|null} settings.axis - What axis should be enabled. Can be "x" or "y"
       * @param {boolean} settings.glare - if it should have a "glare" effect
       * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
       * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
       * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
       * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
       * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
       * @param {boolean} settings.reset-to-start - true = On reset event (mouse leave) will return to initial start angle (if startX or startY is set)
       * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
       * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
       * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
       */
      extendSettings(settings) {
        let defaultSettings = {
          reverse: false,
          max: 15,
          startX: 0,
          startY: 0,
          perspective: 1000,
          easing: "cubic-bezier(.03,.98,.52,.99)",
          scale: 1,
          speed: 300,
          transition: true,
          axis: null,
          glare: false,
          "max-glare": 1,
          "glare-prerender": false,
          "full-page-listening": false,
          "mouse-event-element": null,
          reset: true,
          "reset-to-start": true,
          gyroscope: true,
          gyroscopeMinAngleX: -45,
          gyroscopeMaxAngleX: 45,
          gyroscopeMinAngleY: -45,
          gyroscopeMaxAngleY: 45,
          gyroscopeSamples: 10,
        };

        let newSettings = {};
        for (var property in defaultSettings) {
          if (property in settings) {
            newSettings[property] = settings[property];
          } else if (this.element.hasAttribute("data-tilt-" + property)) {
            let attribute = this.element.getAttribute("data-tilt-" + property);
            try {
              newSettings[property] = JSON.parse(attribute);
            } catch (e) {
              newSettings[property] = attribute;
            }
          } else {
            newSettings[property] = defaultSettings[property];
          }
        }

        return newSettings;
      }

      static init(elements, settings) {
        if (elements instanceof Node) {
          elements = [elements];
        }

        if (elements instanceof NodeList) {
          elements = [].slice.call(elements);
        }

        if (!(elements instanceof Array)) {
          return;
        }

        elements.forEach((element) => {
          if (!("vanillaTilt" in element)) {
            element.vanillaTilt = new VanillaTilt(element, settings);
          }
        });
      }
    }

    if (typeof document !== "undefined") {
      /* expose the class to window */
      window.VanillaTilt = VanillaTilt;

      /**
       * Auto load
       */
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }

    return VanillaTilt;
  })();

  const el = document.querySelector("div[contenteditable]");

  // Get value from element on input events
  el.addEventListener("input", () => console.log(el.textContent));
}
