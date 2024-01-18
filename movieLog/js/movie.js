alert('お好きな映画を検索し、感想を記入してください');

async function searchMovies() {
  const language = 'ja-JP';
  const searchText = document.getElementById('text').value;
  const apiKey = 'bd26887845b847dd40905b0a11f980a7';
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;
  const none = document.getElementsByClassName('searchInstructions');
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayMovies(data.results);
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  none.classList.remove('searchInstructions');
  none.classList.add('none');
}

function displayMovies(movies) {
  const movieList = document.querySelector('.movie-list');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieTitle = movie.title;
    const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

    const movieElement = document.createElement('div');
    movieElement.innerHTML = `
      <img src="${moviePoster}" alt="${movieTitle}" class="movie-poster" data-bs-toggle="modal" data-bs-target="#movieDetailModal" onclick="showMovieDetail('${moviePoster}', '${movieTitle}', '${movie.overview}')"/>
    `;

    movieList.appendChild(movieElement);
  });
}

function showMovieDetail(poster, title, overview) {
  // モーダル内の要素に情報を設定
  document.getElementById('modalPoster').src = poster;
  console.log(poster);
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalOverview').innerText = overview;

  // モーダルを表示
  $('#movieDetailModal').modal('show');
}

function saveReview() {
  const poster = document.getElementById('modalPoster').src;
  const title = document.getElementById('modalTitle').innerText;
  const overview = document.getElementById('modalOverview').innerText;
  const review = document.getElementById('modalReview').value;

  const reviewData = {
    poster: poster,
    title: title,
    overview: overview,
    review: review
  };

  // ローカルストレージに保存
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(reviewData);
  localStorage.setItem('reviews', JSON.stringify(reviews));

  // モーダルを閉じる
  $('#movieDetailModal').modal('hide');
}