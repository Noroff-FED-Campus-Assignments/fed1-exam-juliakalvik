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

      for (const photo of galleryPhotos) {
        const imgElement = document.createElement("img");
        imgElement.src = photo.thumbnails.full.url;
        imgElement.alt = "Gallery Photo";
        imgElement.classList.add("gallery-photo");

        blogpostGallery.appendChild(imgElement);
      }
    } else {
      blogpostGallery.innerHTML = "";
    }
  } catch (error) {
    console.error(error);
  }
};

fetchBlogPost();
