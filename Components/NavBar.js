import { changeScreen } from "../navigator.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { auth } from "../firebaseConfig.js";
class NavBar {
  $container;

  $contactContainer;

  $authStateText;
  authState = false;

  $componentContainer;
  $leftComponentContainer;
  $searchContainer;
  $rightComponentContainer;

  $searchBox;
  $searchInput;
  $searchIconImg;
  searching = false;

  $logo;

  $consoleScreenIcon;
  $cartIcon;

  constructor(_searchFunction = null) {
    this.$container = document.createElement("div");
    this.$container.classList.add("navBarContainer");

    this.$contactContainer = document.createElement("div");
    this.$contactContainer.classList.add("contactContainer");

    this.$componentContainer = document.createElement("div");
    this.$leftComponentContainer = document.createElement("div");
    this.$searchContainer = document.createElement("div");
    this.$rightComponentContainer = document.createElement("div");
    this.$componentContainer.appendChild(this.$leftComponentContainer);
    this.$componentContainer.appendChild(this.$searchContainer);
    this.$componentContainer.appendChild(this.$rightComponentContainer);
    this.$componentContainer.classList.add("componentContainer");
    this.$leftComponentContainer.classList.add("leftComponentContainer");
    this.$searchContainer.classList.add("searchContainer");
    this.$rightComponentContainer.classList.add("rightComponentContainer");

    this.$searchBox = document.createElement("div");
    this.$searchInput = document.createElement("input");
    this.$searchInput.addEventListener("focusin", () => {
      this.$searchBox.classList.add("searchBoxInFocus");
    });
    this.$searchInput.addEventListener("focusout", () => {
      this.$searchBox.classList.remove("searchBoxInFocus");
    });
    this.$searchBox.appendChild(this.$searchInput);
    this.$searchInput.type = "text";
    this.$searchInput.placeholder = "Search Products...";
    this.$searchContainer.appendChild(this.$searchBox);
    this.$searchBox.classList.add("searchBox");
    this.$searchInput.classList.add("searchInput");

    this.$searchIconImg = document.createElement("img");
    this.$searchIconImg.style = "cursor: pointer;";
    this.$searchIconImg.src = "././Assets/Icons/search_icon.png";
    this.$searchBox.appendChild(this.$searchIconImg);
    this.$searchIconImg.addEventListener("click", () => {
      if (!this.searching) {
        this.searching = true;
        this.$searchIconImg.src = "././Assets/Icons/cancel_icon.png";
        _searchFunction(this.$searchInput.value);
      } else {
        this.searching = false;
        this.$searchIconImg.src = "././Assets/Icons/search_icon.png";
        this.$searchInput.value = "";
        _searchFunction("");
      }
    });
    this.$searchInput.addEventListener("input", () => {
      if (this.searching) {
        this.searching = false;
        this.$searchIconImg.src = "././Assets/Icons/search_icon.png";
      }
    });

    this.$logo = document.createElement("img");
    this.$logo.src = "././Assets/Img/VCL-logos_black.png";
    this.$logo.addEventListener("click", () => {
      history.pushState(undefined, undefined, `?screen=productDisplayScreen`);
      location.reload();
    });
    this.$leftComponentContainer.appendChild(this.$logo);

    this.$authStateText = document.createElement("div");
    this.$authStateText.title = "Click to logout!";
    this.$authStateText.classList.add("navBarAuthStateText");
    this.$contactContainer.appendChild(this.$authStateText);
    this.$authStateText.addEventListener("click", () => {
      if (this.authState) {
        changeScreen("userScreen");
      } else {
        changeScreen("loginScreen");
      }
    });

    this.$consoleScreenIcon = document.createElement("img");
    this.$consoleScreenIcon.src = "././Assets/Icons/editor_icon.png";
    this.$consoleScreenIcon.addEventListener("click", () => {
      changeScreen("consoleScreen");
    });
    this.$cartIcon = document.createElement("img");
    this.$cartIcon.src = "././Assets/Icons/ic-ecommerce-basket.png";
    this.$rightComponentContainer.appendChild(this.$cartIcon);
    this.$cartIcon.addEventListener("click", () => {
      if (this.authState) {
        changeScreen("cartScreen");
      } else {
        alertify.notify("You need to login to use this function!", "error", 3);
        changeScreen("loginScreen");
      }
    });
  }
  render() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$authStateText.innerHTML = user.email;
        this.$authStateText.classList.add("navBarAuthStateTextLoggedIn");
        this.authState = true;
        if (user.email == "vclong2003@gmail.com") {
          this.$rightComponentContainer.appendChild(this.$consoleScreenIcon);
        }
      } else {
        this.$authStateText.classList.remove("navBarAuthStateTextLoggedIn");
        this.$authStateText.innerHTML = "Login";
        this.authState = false;
      }
    });

    this.$container.appendChild(this.$contactContainer);
    this.$container.appendChild(this.$componentContainer);

    return this.$container;
  }
}

export { NavBar };
