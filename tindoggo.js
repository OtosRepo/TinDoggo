import { dogs as users } from "./tindoggodata.js";
import User from "./User.js";

import {
  getLoginHtml,
  getLoginProfileHtml,
  getLoginBtnHtml,
  getMainPageHtml,
  getSwipePageHtml,
  getResultsPageHtml,
} from "./getHtml.js";

// The logged-in user
let currentUserIndex;

// The current profile being viewed
let currentProfileIndex = 0;

// Stores chats
let chats = {};

// The profile currently being viewed
let currentProfile;

// Render log in
renderLoginScreen();

// Renders the login screen
function renderLoginScreen() {
  const loginPage = document.getElementsByTagName("body")[0];
  let loginHtml = getLoginHtml();

  users.forEach(function (user, index) {
    loginHtml += getLoginProfileHtml(user, index);
  });

  loginPage.innerHTML = loginHtml + getLoginBtnHtml();
  setRadioBtnListener();
}

// Sets event listeners for each login user
function setRadioBtnListener() {
  document.querySelectorAll("input[name='user']").forEach((input) =>
    input.addEventListener("change", function () {
      setLoginBtnListener();
    })
  );
}

// Sets an event listeners for the login button
// Not enabled until a radio button is selected
function setLoginBtnListener() {
  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", function (e) {
    const checkRadioButtons = document.querySelector(
      'input[name="user"]:checked'
    );
    currentUserIndex = parseInt(checkRadioButtons.value);
    // hideLoginPage();
    document.getElementsByTagName("body")[0].innerHTML = `<main></main>`;
    renderMainPage();
  });
}

function renderMainPage() {
  const mainPage = document.getElementsByTagName("main")[0];
  mainPage.innerHTML = getMainPageHtml(
    users[currentUserIndex].name,
    users.length - 1 - users[currentUserIndex].hasSwiped.length
  );
  setMainPageListeners();
}

function setMainPageListeners() {
  document
    .getElementsByTagName("main")[0]
    .addEventListener("click", function (e) {
      switch (e.target.id) {
        case "look-at-profiles-option":
          // Randomly assign like backs to simulate matchmaking
          randomlyAssignLikeBacks();

          renderProfilePage();
          nextProfile();
          break;
        case "messages-option":
          break;
        case "learn-option":
          break;
      }
    });
}

// Profile page = a page showing a user's profile that can be liked or disliked
function renderProfilePage() {
  const swipePage = document.getElementsByTagName("main")[0];
  swipePage.innerHTML = getSwipePageHtml(users[currentUserIndex].avatar);
}

// Get the next profile
function nextProfile() {
  // Go to the next profile that is not the user's and that has not already been swiped
  while (
    currentProfileIndex === currentUserIndex ||
    users[currentUserIndex].hasSwiped.includes(currentProfileIndex)
  ) {
    currentProfileIndex++;
  }

  // If all profiles have been reviewed, go to analysis
  if (
    currentProfileIndex === currentUserIndex ||
    users[currentUserIndex].hasSwiped.includes(currentProfileIndex) ||
    currentProfileIndex === users.length
  ) {
    // document.getElementById("yep-nope-badge").style.display = "none";
    matchAnalysis();
  } else {
    currentProfile = getNewUser();
    renderProfile();
  }
}

function getNewUser() {
  return new User(users[currentProfileIndex]);
}

function renderProfile() {
  const profileBody = document.getElementById("profile-body");
  profileBody.innerHTML = currentProfile.getProfileHtml();
  // The profile image is set as the background image.
  profileBody.style.backgroundImage = `url(${currentProfile.getProfilePicUrl()})`;
  renderProfileFooter();
}

// Renders the profile footer with reject and like buttons
function renderProfileFooter() {
  document.getElementById(
    "profile-footer"
  ).innerHTML = currentProfile.getRejectLikeHtml();
  setLikeRejectListeners();
}

// Sets listeners for the reject and like buttons
function setLikeRejectListeners() {
  // Reject button listener
  document
    .getElementById("reject-button")
    .addEventListener("click", function () {
      displayYepNopeBadge("images/badge-nope.png");
      users[currentUserIndex].hasSwiped.push(currentProfileIndex);
    });

  // Like button listener
  document.getElementById("like-button").addEventListener("click", function () {
    users[currentUserIndex].hasLiked.push(currentProfileIndex);
    displayYepNopeBadge("images/badge-like.png");
    users[currentUserIndex].hasSwiped.push(currentProfileIndex);
  });
}

// Display the NOPE/LIKE badge with a 0.5-second transition
// The parameter 'url' is the url of the badge image.
function displayYepNopeBadge(url) {
  const yepNopeBadge = document.getElementById("yep-nope-badge");
  yepNopeBadge.src = url;
  yepNopeBadge.style.width = "200px";

  // Delay between like/pass and next user
  setTimeout(function () {
    nextProfile();
  }, 1000);
}

// Determine if there are any matches
// The user liked a dog and that dog liked the user
function matchAnalysis() {
  if (users.length === 0) {
    noMatches();
  } else {
    displayResults();
  }
}

function noMatches() {
  const noMatches = document.getElementById("match-analysis-results");
  noMatches.innerText += "You have no matches";
  noMatches.innerHTML += `<img src="images/sad-dog.jpg" />`;
}

function displayResults() {
  const resultsPage = document.getElementsByTagName("main")[0];
  const likedMe = getlikedMeArray();

  resultsPage.innerHTML = getResultsPageHtml(
    users[currentUserIndex].hasLiked,
    likedMe,
    getMatchArray()
  );

  document
    .getElementById("return-to-main-btn")
    .addEventListener("click", function () {
      renderMainPage();
    });
}

// Find the other users that liked the current user
function getlikedMeArray() {
  let likedMe = [];
  users.forEach(function (user) {
    if (user.hasLiked.includes(currentUserIndex)) {
      likedMe.push(user.id);
    }
  });
  return likedMe;
}

// Returns an array of matches (mutual likes)
function getMatchArray() {
  const matchArray = [];
  users.forEach(function (user) {
    if (
      user.hasLiked.includes(currentUserIndex) &&
      users[currentUserIndex].hasLiked.includes(user.id)
    ) {
      matchArray.push(user.id);
    }
  });
  return matchArray;
}

// Randomly assigns like backs to simulate a real app
function randomlyAssignLikeBacks() {
  users.forEach(function (user) {
    if (user.id !== currentUserIndex) {
      const randomNum = Math.floor(Math.random() * 2);
      if (randomNum) {
        user.hasLiked.push(currentUserIndex);
        user.hasLiked.push(3);
      }
    }
  });
}
