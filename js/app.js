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

const truncateText = (text, limit) => {
  const words = text.split(" ");
  const truncated = words.slice(0, limit).join(" ");
  return words.length > limit ? `${truncated}...` : truncated;
};

let displayedPostsCount = 6;
let totalPosts = 0;
let allPosts = [];

const loader = document.getElementById("loader");
const mainContent = document.querySelector("main");

const showLoader = () => {
  loader.style.display = "block";
  mainContent.style.display = "none";
};

const hideLoader = () => {
  loader.style.display = "none";
  mainContent.style.display = "block";
};

const fetchBlogPosts = async () => {
  try {
    showLoader();

    const response = await fetch(tableUrl, { headers: headers });
    const results = await response.json();
    console.log(results);

    totalPosts = results.records.length;
    allPosts = results.records;

    const fetchedPostsElement = document.getElementById("fetched-posts-full");
    fetchedPostsElement.innerHTML = "";

    const displayedPosts = allPosts.slice(0, displayedPostsCount);
    displayedPosts.forEach((post) => {
      const postElement = createPostElement(post);
      fetchedPostsElement.appendChild(postElement);
    });

    if (totalPosts > displayedPostsCount) {
      const showMoreButton = document.getElementById("show-more-btn");
      showMoreButton.style.display = "block";
      showMoreButton.addEventListener("click", showMorePosts);
    }

    hideLoader();
  } catch (error) {
    console.error(error);
    hideLoader();
  }
};

const createPostElement = (post) => {
  const postElement = document.createElement("div");
  const photoUrl =
    post.fields.Photo && Array.isArray(post.fields.Photo)
      ? post.fields.Photo[0].thumbnails.full.url
      : "";
  postElement.classList.add("post");

  const truncatedText = truncateText(post.fields.Text || "", 10);

  postElement.addEventListener("click", () => {
    const postId = post.id;
    window.location.href = `blogpost.html?id=${postId}`;
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
};

const showMorePosts = () => {
  displayedPostsCount += 6;

  const fetchedPostsElement = document.getElementById("fetched-posts-full");

  const displayedPosts = allPosts.slice(0, displayedPostsCount);
  fetchedPostsElement.innerHTML = "";
  displayedPosts.forEach((post) => {
    const postElement = createPostElement(post);
    fetchedPostsElement.appendChild(postElement);
  });

  if (displayedPostsCount >= totalPosts) {
    const showMoreButton = document.getElementById("show-more-btn");
    showMoreButton.style.display = "none";

    const showLessButton = document.getElementById("show-less-btn");
    showLessButton.style.display = "block";
    showLessButton.addEventListener("click", showLessPosts);
  }
};

const showLessPosts = () => {
  displayedPostsCount = 6;

  const fetchedPostsElement = document.getElementById("fetched-posts-full");

  const displayedPosts = allPosts.slice(0, displayedPostsCount);
  fetchedPostsElement.innerHTML = "";
  displayedPosts.forEach((post) => {
    const postElement = createPostElement(post);
    fetchedPostsElement.appendChild(postElement);
  });

  if (totalPosts > displayedPostsCount) {
    const showLessButton = document.getElementById("show-less-btn");
    showLessButton.style.display = "none";

    const showMoreButton = document.getElementById("show-more-btn");
    showMoreButton.style.display = "block";
    showMoreButton.addEventListener("click", showMorePosts);
  }
};

window.addEventListener("DOMContentLoaded", fetchBlogPosts);
