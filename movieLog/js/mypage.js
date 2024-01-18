
const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];


const savedReviewsContainer = document.getElementById('savedReviews');
savedReviews.forEach(review => {
  const reviewElement = document.createElement('div');
  reviewElement.innerHTML = `
  <div class="mypage">
    <div class="image">
      <img src="${review.poster}" alt="${review.title}" class="poster">
    </div>
    <div class="reviews">
      <h3>${review.title}</h3>
      <p><strong>タイトル:</strong> ${review.title}</p>
      <p><strong>あらすじ:</strong> ${review.overview}</p>
      <p><strong>感想:</strong> ${review.review}</p>
    </div>
  </div>
  <hr>
  `;
  savedReviewsContainer.appendChild(reviewElement);
});