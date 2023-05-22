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

const fetchBlogPosts = async () => {
  try {
    const response = await fetch(tableUrl, { headers: headers });
    const results = await response.json();
    console.log(results);

    const fetchedPostsElement = document.getElementById("fetched-posts-full");
    fetchedPostsElement.innerHTML = "";

    results.records.forEach((post) => {
      const postElement = document.createElement("div");
      const photoUrl =
        post.fields.Photo && Array.isArray(post.fields.Photo)
          ? post.fields.Photo[0].thumbnails.full.url
          : "";
      postElement.classList.add("post");

      const truncatedText = truncateText(post.fields.Text || "", 15);

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

      fetchedPostsElement.appendChild(postElement);
    });
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("DOMContentLoaded", fetchBlogPosts);

/*
const fetchBlogPosts = async () => {
  const response = await fetch(tableUrl, { headers: headers });
  const results = await response.json();
  console.log(results);
  return results;
};

fetchBlogPosts();
============================================
Constants
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L66
============================================
*/

// TODO: Get DOM elements from the DOM

/*
============================================
DOM manipulation
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L89
============================================
*/

// TODO: Fetch and Render the list to the DOM

// TODO: Create event listeners for the filters and the search

/**
 * TODO: Create an event listener to sort the list.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L91
 */

/*
============================================
Data fectching
@example: https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L104
============================================
*/

// TODO: Fetch an array of objects from the API

/*
============================================
Helper functions
https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L154
============================================
*/

/**
 * TODO: Create a function to filter the list of item.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/search-form.html#L135
 * @param {item} item The object with properties from the fetched JSON data.
 * @param {searchTerm} searchTerm The string used to check if the object title contains it.
 */

/**
 * TODO: Create a function to create a DOM element.
 * @example https://github.com/S3ak/fed-javascript1-api-calls/blob/main/src/js/detail.js#L36
 * @param {item} item The object with properties from the fetched JSON data.
 */
