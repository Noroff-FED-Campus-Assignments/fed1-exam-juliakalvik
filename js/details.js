const env = {
  BASE_ID: "apppMh1aYCTA6ZTgA",
  TABLE_NAME: "Blog",
  API_KEY: "key0KTCwaChVT2u0x",
};

const BASE_ID = env.BASE_ID;
const TABLE_NAME = env.TABLE_NAME;
const apiKey = env.API_KEY;

const tableUrl = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;
const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const fetchBlogPost = async () => {
  try {
    const response = await fetch(`${tableUrl}/${postId}`, { headers: headers });
    const post = await response.json();

    console.log("Post:", post);

    const blogpostTitleElement = document.getElementById("blogpost-title");
    const blogpostContentElement = document.getElementById("blogpost-content");
    const blogpostPhotoElement = document.getElementById("blogpost-photo");
    const blogpostGallery = document.getElementById("blogpost-gallery");

    blogpostTitleElement.textContent = post.fields["Title"];
    blogpostContentElement.textContent = post.fields["Text"];

    if (post.fields["Photo"] && Array.isArray(post.fields["Photo"])) {
      const photoUrl = post.fields["Photo"][0].thumbnails.full.url;

      console.log("Photo URL:", photoUrl);

      blogpostPhotoElement.src = photoUrl;
      blogpostPhotoElement.style.display = "block";
    } else {
      blogpostPhotoElement.style.display = "none";
    }

    if (post.fields["Gallery"] && Array.isArray(post.fields["Gallery"])) {
      const galleryPhotos = post.fields["Gallery"];

      console.log("Gallery Photos:", galleryPhotos);

      blogpostGallery.innerHTML = "";
      const photoUrls = [];

      for (const photo of galleryPhotos) {
        const imgElement = document.createElement("img");
        const photoUrl = photo.thumbnails.full.url;
        imgElement.src = photoUrl;
        imgElement.alt = "Gallery Photo";
        imgElement.classList.add("gallery-photo");

        imgElement.addEventListener("click", () => {
          openImagePopup(photoUrl, galleryPhotos);
        });

        blogpostGallery.appendChild(imgElement);

        photoUrls.push(photoUrl);
      }

      return photoUrls;
    } else {
      blogpostGallery.innerHTML = "";
    }
  } catch (error) {
    console.error(error);
  }
};

let currentPhotoIndex = 0;
let photoUrls = [];

const openImagePopup = (imageUrl, galleryPhotos) => {
  currentPhotoIndex = galleryPhotos.findIndex(
    (photo) => photo.thumbnails.full.url === imageUrl
  );

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const popupImage = document.createElement("img");
  popupImage.src = imageUrl;
  popupImage.classList.add("popup-img");

  overlay.appendChild(popupImage);

  const nextButton = document.createElement("button");
  nextButton.classList.add("popup-next");
  nextButton.innerHTML = "&rarr;";
  nextButton.addEventListener("click", showNextPhoto);
  overlay.appendChild(nextButton);

  const prevButton = document.createElement("button");
  prevButton.classList.add("popup-prev");
  prevButton.innerHTML = "&larr;";
  prevButton.addEventListener("click", showPrevPhoto);
  overlay.appendChild(prevButton);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  document.body.appendChild(overlay);
};

const showNextPhoto = () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % photoUrls.length;
  const imageUrl = photoUrls[currentPhotoIndex];
  const popupImage = document.querySelector(".popup-img");
  popupImage.src = imageUrl;
};

const showPrevPhoto = () => {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + photoUrls.length) % photoUrls.length;
  const imageUrl = photoUrls[currentPhotoIndex];
  const popupImage = document.querySelector(".popup-img");
  popupImage.src = imageUrl;
};

fetchBlogPost().then((urls) => {
  photoUrls = urls;
});

const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("comment-name").value;
  const content = document.getElementById("comment-content").value;

  const comment = {
    name,
    content,
  };

  addComment(comment);

  commentForm.reset();
});

function addComment(comment) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");
  commentElement.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.content}</p>
      <hr>
    `;

  commentsList.appendChild(commentElement);
}
