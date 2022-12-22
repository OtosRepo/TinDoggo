class User {
  constructor(data) {
    Object.assign(this, data);
  }

  getProfilePicUrl() {
    return this.avatar;
  }

  getProfileHtml() {
    return `
          <img id="yep-nope-badge" />
          <div class="profile-text-container">
            <div class="stats">${this.name}, ${this.age}</div>
            <div class="bio">${this.bio}</div>
          </div>
        </div>
        `;
  }

  // Returns HTML for the reject and like buttons
  getRejectLikeHtml() {
    return `<img id="reject-button" src="images/icon-cross.png" />
  <img id="like-button" src="images/icon-heart.png" />`;
  }
}

export default User;

/* <div id="profile-body" class="profile-body" style='background-image: url("${this.avatar}")' /> */
