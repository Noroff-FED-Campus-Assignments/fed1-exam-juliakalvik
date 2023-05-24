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

const slider = document.getElementById("slider");
const sliderWrapper = document.getElementById("slider-wrapper");
const prevButton = document.getElementById("slider-prev");
const nextButton = document.getElementById("slider-next");

let postItems = [];
const truncateText = (text, limit) => {
  const words = text.split(" ");
  const truncated = words.slice(0, limit).join(" ");
  return words.length > limit ? `${truncated}...` : truncated;
};

const fetchBlogPosts = async () => {
  try {
    const response = await fetch(tableUrl, { headers: headers });
    const results = await response.json();
    console.log(results);

    postItems = results.records.map((post) => {
      const postElement = document.createElement("div");
      const photoUrl =
        post.fields.Photo && Array.isArray(post.fields.Photo)
          ? post.fields.Photo[0].thumbnails.full.url
          : "";
      postElement.classList.add("post");

      const truncatedText = truncateText(post.fields.Text || "", 10);

      postElement.addEventListener("click", () => {
        const postId = post.id;
        window.location.href = `blogpost.html?postId=${postId}`;
      });

      if (post.fields.Title) {
        const titleElement = document.createElement("h2");
        titleElement.textContent = post.fields.Title;
        postElement.appendChild(titleElement);
      }

      if (truncatedText) {
        const textElement = document.createElement("p");
        textElement.textContent = truncatedText;
        postElement.appendChild(textElement);
      }

      if (photoUrl) {
        const imageElement = document.createElement("img");
        imageElement.src = photoUrl;
        imageElement.alt = "Post Image";
        postElement.appendChild(imageElement);
      }

      return postElement;
    });

    renderPosts();
  } catch (error) {
    console.error(error);
  }
};

const renderPosts = () => {
  sliderWrapper.innerHTML = "";

  const visiblePosts = postItems.slice(0, 3);
  visiblePosts.forEach((post) => {
    const postWrapper = document.createElement("div");
    postWrapper.classList.add("slider-item");

    postWrapper.appendChild(post.cloneNode(true));
    sliderWrapper.appendChild(postWrapper);
  });
};

prevButton.addEventListener("click", function () {
  slider.scrollBy({
    left: -slider.offsetWidth,
    behavior: "smooth",
  });
});

nextButton.addEventListener("click", function () {
  slider.scrollBy({
    left: slider.offsetWidth,
    behavior: "smooth",
  });
});

fetchBlogPosts();
