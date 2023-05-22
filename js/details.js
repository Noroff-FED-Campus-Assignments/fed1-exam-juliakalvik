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

// ...

// Function to fetch and display the blog post
const fetchBlogPost = async () => {
  try {
    const response = await fetch(`${tableUrl}/${postId}`, { headers: headers });
    const post = await response.json();

    const blogpostTitleElement = document.getElementById("blogpost-title");
    const blogpostContentElement = document.getElementById("blogpost-content");
    const blogpostPhotoElement = document.getElementById("blogpost-photo");

    blogpostTitleElement.textContent = post.fields.Title;
    blogpostContentElement.textContent = post.fields.Text;

    if (post.fields.Photo && Array.isArray(post.fields.Photo)) {
      const photoUrl = post.fields.Photo[0].thumbnails.full.url;
      blogpostPhotoElement.src = photoUrl;
      blogpostTitleContainer.style.backgroundImage = `url('${photoUrl}')`;
    } else {
      blogpostPhotoElement.style.display = "none"; // Hide the photo element if no photo is available
      blogpostTitleContainer.style.backgroundImage = "none";
    }
  } catch (error) {
    console.error(error);
  }
};

fetchBlogPost();
