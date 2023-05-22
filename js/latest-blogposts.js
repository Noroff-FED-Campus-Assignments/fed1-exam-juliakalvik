/*const env = {
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

let blogPosts = []; // Array to store the blog post data
let currentSlide = 0; // Index of the current slide

const fetchLatestBlogPosts = async () => {
  try {
    const response = await fetch(tableUrl, { headers: headers });
    const data = await response.json();
    return data.records.map((post) => ({
      title: post.fields.Title,
      content: post.fields.Text,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const showLatestBlogPosts = async () => {
  blogPosts = await fetchLatestBlogPosts();
  showSlide();
};

const showSlide = () => {
  const slider = document.getElementById("slider");
  slider.innerHTML = ""; // Clear any existing content

  const numPosts = blogPosts.length;
  const startIndex = currentSlide * 4;
  const endIndex = Math.min(startIndex + 4, numPosts);

  for (let i = startIndex; i < endIndex; i++) {
    const post = blogPosts[i];

    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;

    slider.appendChild(postElement);
  }
};

const handleSliderButtonClick = (direction) => {
  const numSlides = Math.ceil(blogPosts.length / 4); // Calculate the number of slides

  if (direction === "prev") {
    currentSlide = (currentSlide - 1 + numSlides) % numSlides;
  } else {
    currentSlide = (currentSlide + 1) % numSlides;
  }

  showSlide();
};

// Attach event listeners to slider buttons
const prevButton = document.getElementById("slider-prev");
prevButton.addEventListener("click", () => handleSliderButtonClick("prev"));

const nextButton = document.getElementById("slider-next");
nextButton.addEventListener("click", () => handleSliderButtonClick("next"));

// Call the function to display the latest blog posts
showLatestBlogPosts();
