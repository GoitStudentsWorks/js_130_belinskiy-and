import {
  getCategories,
  getWeddingPhotos,
} from '../js/api-port';

const portfolioFilter = document.querySelector(
  '.portfolio-filter'
);

const portfolioList = document.querySelector(
  '.portfolio-list'
);

const showMoreBtn = document.querySelector(
  '.show-more-btn'
);

const loader = document.querySelector('.loader');

const INITIAL_LIMIT = 9;
const LOAD_MORE_LIMIT = 3;

let currentCategoryId = '';
let currentLimit = INITIAL_LIMIT;
let totalItems = 0;
let isLoading = false;

let loadedPhotoIds = new Set();

const categoryOrder = [
  'Candid Moments',
  'Portrait Perfection',
  'Ceremony & Vows',
  'Joyful Celebrations',
  'Standard',
  'Attention to Detail',
];

const showLoader = () => {
  loader.classList.remove('is-hidden');
};

const hideLoader = () => {
  loader.classList.add('is-hidden');
};

const showMore = () => {
  showMoreBtn.classList.remove('is-hidden');
  showMoreBtn.disabled = false;
};

const hideMore = () => {
  showMoreBtn.classList.add('is-hidden');
  showMoreBtn.disabled = true;
};

const renderCategories = categories => {
  portfolioFilter.innerHTML = '';


  const allItem = document.createElement('li');
  const allButton = document.createElement('button');

  allButton.type = 'button';
  allButton.textContent = 'All Photos';
  allButton.dataset.categoryId = '';

  allButton.classList.add(
    'portfolio-categories-btn',
    'active'
  );

  allItem.appendChild(allButton);
  portfolioFilter.appendChild(allItem);

  
  categories.forEach(category => {
    const item = document.createElement('li');
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = category.category;

    button.dataset.categoryId = category._id;

    button.classList.add(
      'portfolio-categories-btn'
    );

    item.appendChild(button);
    portfolioFilter.appendChild(item);
  });
};

const renderPhotos = photos => {
  let photosToRender = photos;

  if (!currentCategoryId) {
    const markup = photos
      .map(
        photo => `
          <li class="portfolio-photo">
            <img
              src="${photo.img}"
              alt="${photo.title}"
              loading="lazy"
            />
          </li>
        `
      )
      .join('');

    portfolioList.insertAdjacentHTML(
      'beforeend',
      markup
    );

    return photos.length;
  }

  photosToRender = photos.filter(photo => {
    if (loadedPhotoIds.has(photo._id)) {
      return false;
    }

    loadedPhotoIds.add(photo._id);

    return true;
  });

  if (!photosToRender.length) {
    return 0;
  }

  const markup = photosToRender
    .map(
      photo => `
        <li class="portfolio-photo">
          <img
            src="${photo.img}"
            alt="${photo.title}"
            loading="lazy"
          />
        </li>
      `
    )
    .join('');

  portfolioList.insertAdjacentHTML(
    'beforeend',
    markup
  );

  return photosToRender.length;
};

const loadPhotos = async ({
  reset = false,
} = {}) => {
  if (isLoading) {
    return 0;
  }

  try {
    isLoading = true;

    showLoader();

    const data = await getWeddingPhotos(
      currentCategoryId,
      1,
      currentLimit
    );

    console.log('Photos response:', data);

    const photos = data.weddingPhotos || [];

    totalItems = data.totalItems || 0;

    console.log(
      'Current limit:',
      currentLimit
    );

    console.log(
      'Photos received:',
      photos.length
    );

    console.log(
      'Total items:',
      totalItems
    );

    if (reset) {
      portfolioList.innerHTML = '';

      loadedPhotoIds.clear();

      const renderedCount =
        renderPhotos(photos);

      if (
        renderedCount === 0 ||
        totalItems === 0
      ) {
        hideMore();
      } else if (
        currentLimit >= totalItems
      ) {
        hideMore();
      } else {
        showMore();
      }

      return renderedCount;
    }


    const previousLimit =
      currentLimit - LOAD_MORE_LIMIT;

    const newPhotos = photos.slice(
      previousLimit
    );

    console.log(
      'New photos:',
      newPhotos.length
    );

    
    if (!newPhotos.length) {
      hideMore();

      return 0;
    }

    const renderedCount =
      renderPhotos(newPhotos);

  
    if (renderedCount === 0) {
      hideMore();

      return 0;
    }

    if (currentLimit >= totalItems) {
      hideMore();
    } else {
      showMore();
    }

    return renderedCount;
  } catch (error) {
    console.error(
      'Error loading portfolio photos:',
      error
    );

    hideMore();

    return 0;
  } finally {
    isLoading = false;

    hideLoader();
  }
};

portfolioFilter.addEventListener(
  'click',
  async event => {
    const button =
      event.target.closest('button');

    if (!button) {
      return;
    }

    const buttons =
      portfolioFilter.querySelectorAll(
        'button'
      );

    buttons.forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    currentCategoryId =
      button.dataset.categoryId || '';

    
    currentLimit = INITIAL_LIMIT;

    totalItems = 0;

    loadedPhotoIds.clear();

    hideMore();

    await loadPhotos({
      reset: true,
    });
  }
);

showMoreBtn.addEventListener(
  'click',
  async () => {
    if (isLoading) {
      return;
    }

    if (
      totalItems === 0 ||
      currentLimit >= totalItems
    ) {
      hideMore();

      return;
    }

    
    const nextLimit =
      currentLimit + LOAD_MORE_LIMIT;

    currentLimit = Math.min(
      nextLimit,
      totalItems
    );

    console.log(
      'Loading with limit:',
      currentLimit
    );

    const newPhotosCount =
      await loadPhotos();

  
    if (newPhotosCount === 0) {
      hideMore();

      return;
    }

    
    if (currentLimit < totalItems) {
      showMore();
    } else {
      hideMore();
    }
  }
);

const initPortfolio = async () => {
  try {
    showLoader();

    const categoriesResponse =
      await getCategories();

    console.log(
      'Categories response:',
      categoriesResponse
    );

    const categories = Array.isArray(
      categoriesResponse
    )
      ? categoriesResponse
      : categoriesResponse.categories || [];

    const sortedCategories =
      categoryOrder
        .map(categoryName =>
          categories.find(
            category =>
              category.category ===
              categoryName
          )
        )
        .filter(Boolean);

    renderCategories(
      sortedCategories
    );

    currentCategoryId = '';

    currentLimit = INITIAL_LIMIT;

    totalItems = 0;

    loadedPhotoIds.clear();

   
    await loadPhotos({
      reset: true,
    });
  } catch (error) {
    console.error(
      'Portfolio initialization error:',
      error
    );

    hideMore();
  } finally {
    hideLoader();
  }
};

initPortfolio();


