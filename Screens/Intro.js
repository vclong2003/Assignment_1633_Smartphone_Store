class Intro {
  $container;
  $script;
  constructor() {
    this.$container = document.createElement("div");
    this.$container.innerHTML = `<style>
        .cd-intro {
          position: relative;
          height: 100vh;
          width: 100%;
          /* vertically align its content */
          display: table;
          background: #2e416a;
          overflow: hidden;
          font-family: "Open Sans", sans-serif;
        }
        .cd-intro-content {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          padding: 0 5%;
          background: #2e416a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .cd-intro-content h1 {
          font-size: 62.5%;
          color: #ffffff;
        }
        .cd-intro-content p {
          font-size: 1.4rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 1em 0;
          color: #6d7a97;
        }
        .cd-intro-content .action-wrapper {
          display: inline-block;
        }
        .cd-intro-content .action-wrapper::after {
          clear: both;
          content: "";
          display: table;
        }
        .cd-intro-content .action-wrapper > * {
          float: left;
        }
        @media only screen and (min-width: 768px) {
          .cd-intro-content h1 {
            font-size: 5.2rem;
            font-weight: 300;
          }
          .cd-intro-content p {
            font-size: 1.6rem;
            margin: 1.5em 0 1.9em;
          }
        }
  
        .cd-btn {
          cursor: pointer;
          display: inline-block;
          padding: 1.2em 1.4em;
          font-size: 1.3rem;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          background-color: #202e4a;
          border-radius: 0.25em;
          margin-right: 1.5em;
        }
        .cd-btn:nth-of-type(2) {
          margin-right: 0;
        }
        .cd-btn.main-action {
          background-color: #fb5e58;
          font-size: 50%;
        }
        @media only screen and (min-width: 480px) {
          .cd-btn {
            padding: 1.2em 1.6em;
          }
        }
        @media only screen and (min-width: 768px) {
          .cd-btn {
            padding: 1.4em 1.8em;
          }
        }
  
        .cd-intro-content h1,
        .cd-intro-content h1 span,
        .cd-intro-content p,
        .cd-intro-content .cd-btn {
          opacity: 0;
          -webkit-animation-duration: 0.8s;
          -moz-animation-duration: 0.8s;
          animation-duration: 0.8s;
          -webkit-animation-delay: 0.3s;
          -moz-animation-delay: 0.3s;
          animation-delay: 0.3s;
          -webkit-animation-fill-mode: forwards;
          -moz-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
        }
        .no-cssanimations .cd-intro-content h1,
        .no-cssanimations .cd-intro-content h1 span,
        .no-cssanimations .cd-intro-content p,
        .no-cssanimations .cd-intro-content .cd-btn {
          opacity: 1;
        }
        @-webkit-keyframes cd-reveal-up {
          0% {
            opacity: 1;
            -webkit-transform: translateY(100%);
          }
          100% {
            opacity: 1;
            -webkit-transform: translateY(0);
          }
        }
        @-moz-keyframes cd-reveal-up {
          0% {
            opacity: 1;
            -moz-transform: translateY(100%);
          }
          100% {
            opacity: 1;
            -moz-transform: translateY(0);
          }
        }
        @-moz-keyframes cd-reveal-down {
          0% {
            opacity: 1;
            -moz-transform: translateY(-100%);
          }
          100% {
            opacity: 1;
            -moz-transform: translateY(0);
          }
        }
        @keyframes cd-reveal-down {
          0% {
            opacity: 1;
            -webkit-transform: translateY(-100%);
            -moz-transform: translateY(-100%);
            -ms-transform: translateY(-100%);
            -o-transform: translateY(-100%);
            transform: translateY(-100%);
          }
          100% {
            opacity: 1;
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
          }
        }
        .mask.cd-intro-content h1 {
          position: relative;
          padding-bottom: 10px;
          /* overwrite default style */
          opacity: 1;
          font-weight: 700;
          /* <h1> text is not visible - it is used only as a container for the ::after element */
          color: transparent;
          overflow: hidden;
          font-size: 300%;
        }
        .mask.cd-intro-content h1::after {
          /* this is the animated text */
          content: attr(data-content);
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          color: #ffffff;
          -webkit-animation-name: cd-reveal-up;
          -moz-animation-name: cd-reveal-up;
          animation-name: cd-reveal-up;
          -webkit-animation-fill-mode: backwards;
          -moz-animation-fill-mode: backwards;
          animation-fill-mode: backwards;
        }
        .mask.cd-intro-content h1 span {
          position: relative;
          display: inline-block;
          opacity: 1;
        }
        .mask.cd-intro-content h1 span::before {
          /* this is the loading bar */
          content: "";
          position: absolute;
          top: calc(100% + 8px);
          left: -1em;
          height: 2px;
          width: calc(100% + 2em);
          background-color: #ffffff;
          -webkit-animation: cd-loading-mask 1s 0.3s both;
          -moz-animation: cd-loading-mask 1s 0.3s both;
          animation: cd-loading-mask 1s 0.3s both;
        }
        @media only screen and (min-width: 768px) {
          .mask.cd-intro-content h1 {
            padding-bottom: 20px;
          }
          .mask.cd-intro-content h1 span::before {
            top: calc(100% + 18px);
          }
        }
  
        .mask.cd-intro-content p {
          position: relative;
          margin: 0;
          padding: 10px 0 0;
          -webkit-animation-name: cd-reveal-down;
          -moz-animation-name: cd-reveal-down;
          animation-name: cd-reveal-down;
        }
        @media only screen and (min-width: 768px) {
          .mask.cd-intro-content p {
            padding-top: 20px;
          }
        }
  
        .mask.cd-intro-content h1::after,
        .mask.cd-intro-content p {
          -webkit-animation-duration: 0.4s;
          -moz-animation-duration: 0.4s;
          animation-duration: 0.4s;
          -webkit-animation-delay: 0.7s;
          -moz-animation-delay: 0.7s;
          animation-delay: 0.7s;
        }
  
        .mask.cd-intro-content .action-wrapper {
          overflow: hidden;
          cursor: pointer;
        }
        .mask.cd-intro-content .action-wrapper .cd-btn {
          opacity: 1;
          margin: 0 0 0 1.5em;
        }
        .mask.cd-intro-content .action-wrapper .cd-btn:first-of-type {
          margin-left: 0;
        }
  
        @-webkit-keyframes cd-loading-mask {
          0%,
          100% {
            -webkit-transform: scaleX(0);
          }
          40%,
          60% {
            -webkit-transform: scaleX(1);
          }
        }
        @-moz-keyframes cd-loading-mask {
          0%,
          100% {
            -moz-transform: scaleX(0);
          }
          40%,
          60% {
            -moz-transform: scaleX(1);
          }
        }
        @keyframes cd-loading-mask {
          0%,
          100% {
            -webkit-transform: scaleX(0);
            -moz-transform: scaleX(0);
            -ms-transform: scaleX(0);
            -o-transform: scaleX(0);
            transform: scaleX(0);
          }
          40%,
          60% {
            -webkit-transform: scaleX(1);
            -moz-transform: scaleX(1);
            -ms-transform: scaleX(1);
            -o-transform: scaleX(1);
            transform: scaleX(1);
          }
        }
      </style>
      <section class="cd-intro">
        <div class="cd-intro-content mask">
          <h1 data-content="Thanks for registering!"><span>Thanks for registering!</span></h1>
          <div class="action-wrapper">
            <p>
              <a class="cd-btn main-action" id="enterBtn">Enter</a>
            </p>
          </div>
        </div>
      </section>
      `;
    this.$script = document.createElement("script");
    this.$script.type = "module";
    this.$script.innerHTML = `import {navigate} from './navigator.js'
      document.getElementById("enterBtn").addEventListener("click", () => {
      navigate("productDisplayScreen"); });`;
    this.$container.appendChild(this.$script);
  }
  render() {
    return this.$container;
  }
}
export { Intro };
