import { dogs as users } from "./tindoggodata.js";

function getNameAge(userArray) {
  let textString = ``;
  userArray.forEach(function (userId) {
    textString += `<p>${users[userId].name}: ${users[userId].age}</p>
    `;
  });
  return textString;
}

function getLoginHtml() {
  return `<h1>Log in as</h1>
    <form>
    <div class="login-profile-grid">
    `;
}

function getLoginProfileHtml(user, index) {
  return `
      <div class="login-profile-box">
        <input type="radio" name="user" value="${index}">
        <label for="user"></label>
        <div class="user-container">
          <img class="small-avatar" src="${user.avatar}" />
          <div>${user.name}</div>
        </div>
      </div>`;
}

function getLoginBtnHtml() {
  return `
      </div>
      <div class="btn-wrapper">
        <input class="bottom-btn" id="login-btn" type="button" value="Log in" />
      </div>
      </div>
    </form>    
  `;
}

function getMainPageHtml(name, unswipedUserCount) {
  let lookAtProfilesText;
  let myClass;
  if (unswipedUserCount) {
    myClass = "things-to-do-hover";
    lookAtProfilesText = "Look at Profiles";
  } else {
    lookAtProfilesText = "No More Profiles to View";
  }

  return `
    <div class="profile-container">
      <h1>Welcome, ${name}!</h1>
      <h2>What would you like to do?</h2>
      <div id="things-to-do-container">
        <form>
          <ul>
            <li class="things-to-do ${myClass}" id="look-at-profiles-option">${lookAtProfilesText}</li>
            <li class="things-to-do things-to-do-hover" id="messages-option">Go to Messages</li>
            <li class="things-to-do things-to-do-hover" id="learn-option">Learn about Safe Dating Practices</li>
          </ul>
        </form>
      </div>
      </div>
    `;
}

function getSwipePageHtml(avatar) {
  return `<h1>Who's Waggin' It Today?</h1>
    <div id="profile-container" class="profile-container">
      <div id="profile-header" class="profile-header">
        <img class="user-icon" id="user-icon" src="${avatar}" />
        <img class="pawprint" src="images/logo.png" />
        <div class="app-title">Tin Doggo</div>
      </div>
      <div id="profile-body" class="profile-body">
      </div>
      <div id="profile-footer" class="profile-footer"></div>
    </div>`;
}

function getResultsPageHtml(hasLiked, likedMe, matchArray) {
  const nameAge = getNameAge(likedMe);
  return `
    <h1>Match Results</h1>
    <div class="result-box">
      <h2>You liked ${hasLiked.length} other user${
    hasLiked.length == 1 ? "" : "s"
  }:</h2>
      ${getNameAge(hasLiked)}
    </div>
    <div class="result-box">
      <h2>${likedMe.length} user${
    likedMe.length == 1 ? "" : "s"
  } liked you:</h2>
      <p>${nameAge}</p>
    </div>
    <div class="result-box">
      <h2>Matches:</h2> 
      <p>${getMatchHtml(matchArray)}</p>

    </div>
    <div class="btn-wrapper">
          <input class="bottom-btn" id="return-to-main-btn" type="button" value="OK" />
    </div>

  
  `;
}

// Returns the HTML for matches (mutual likes)
function getMatchHtml(matchArray) {
  return matchArray.reduce(
    (accumulator, value) =>
      accumulator + `<p>${users[value].name}: ${users[value].age}</p>`,
    ``
  );
}

export {
  getLoginHtml,
  getLoginProfileHtml,
  getLoginBtnHtml,
  getMainPageHtml,
  getSwipePageHtml,
  getResultsPageHtml,
  getNameAge,
};
