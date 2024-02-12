const loading = document.querySelector(".loader_content");
const links = document.querySelectorAll(".links");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const startedLink = document.querySelector(".started_link");
const navList = document.querySelector(".nav_list");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const mainContent = document.querySelector("main");
const homePage = document.querySelector(".home");
const allPage = document.querySelector(".all");
const cartPage = document.querySelector(".cart");
const addPage = document.querySelector(".add");
const section1 = document.querySelector(".hero_section");
const linesContainer = document.querySelector(".lines");
const lines = document.querySelectorAll(".lines_line");
const footer = document.querySelector("footer");
const overlay1 = document.querySelector(".overlay1");
const overlay2 = document.querySelector(".overlay2");
const slides = document.querySelectorAll(".slide");
const productsContainer = document.querySelector(".small_products");
const smallProducts = document.querySelectorAll(".small_product");
const showElements = document.querySelectorAll(".show_el");
const favoriteModal = document.querySelector(".favorite_section");
const favoriteItems = document.querySelectorAll(".favorite_container");
const favoriteImgs = document.querySelectorAll(".favorite_img");
const favoriteBtn = document.querySelector(".favorite_btn");
const closeIcon = document.querySelector(".close_icon");
const addSection = document.querySelector(".add_section .container");
const addHeading = document.querySelector(".add_heading");
const shippBtn = document.querySelector(".cart_section .main_btn");
const shippMoadal = document.querySelector(".shipping");
const shippCar = document.querySelector(".shipping_car");
const car = document.querySelector(".shipping_car");
const circle = document.querySelector(".circle_box");
const checkMark = document.querySelector(".check_mark");
const mediaQuery1 = window.matchMedia("(max-width: 72rem)");
const mediaQuery2 = window.matchMedia("(max-width: 48rem)");
const mediaQuery3 = window.matchMedia("(max-width: 31.25rem)");

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
// Load page

wait(1).then(() => {
  loading.classList.add("hidden");
  header.classList.remove("hidden");
  mainContent.classList.remove("hidden");
  footer.classList.remove("hidden");
});
// nav icons before element
navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (!clicked.classList.contains("nav_link")) return;
  document.querySelectorAll(".nav_link").forEach((link) => {
    link.classList.remove("middle--active");
  });
  clicked.classList.add("middle--active");
});

// nav icon's click event
const showNavList = function () {
  overlay1.classList.toggle("hidden");
  wait(0.01).then(() => overlay1.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
};

navIcon.addEventListener("click", showNavList);
overlay1.addEventListener("click", function () {
  if (navList.classList.contains("nav_list--active")) showNavList();
});

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    overlay1.classList.add("hidden");
    overlay1.classList.remove("overlay--active");
    navIcon.classList.remove("nav_icon--active");
    navList.classList.remove("nav_list--active");
  }
});
// Menu fade animation
const handleHover = function (e) {
  const link = e.target.closest(".link");
  if (!link) return;
  const siblings = link.closest(".links").querySelectorAll(".link");
  siblings.forEach((el) => {
    if (el !== link) el.style.opacity = this;
  });
};
links.forEach((link) => {
  link.addEventListener("mouseover", handleHover.bind(0.5));
  link.addEventListener("mouseout", handleHover.bind(1));
});

// Slider
let HeroCurSlide = 0,
  AddCurSlide = 0;
const maxSlide = slides.length;
let able = 0;

// Hero animation
const showHeroEls = function (slide) {
  slides.forEach((s) => {
    s.querySelector(".hero_btn").classList.add("hide_data");
    s.querySelector(".hero_name").classList.add("hide_data");
    s.querySelector(".hero_descr").classList.add("hide_data");
    s.querySelector(".hero_pricing").classList.add("hide_data");
    s.querySelector(".hero_rating").classList.add("hide_data");
    s.querySelector(".active_snicker").classList.add("hide_img");
  });
  slides[slide].querySelector(".active_snicker").classList.remove("hide_img");
  wait(0.5)
    .then(() =>
      slides[slide].querySelector(".hero_name").classList.remove("hide_data")
    )
    .then(() =>
      wait(0.1).then(() =>
        slides[slide].querySelector(".hero_descr").classList.remove("hide_data")
      )
    )
    .then(() =>
      wait(0.1).then(() =>
        slides[slide]
          .querySelector(".hero_pricing")
          .classList.remove("hide_data")
      )
    )
    .then(() =>
      wait(0.1).then(() => {
        const rating = slides[slide].querySelector(".hero_rating");
        rating.classList.remove("hide_data");
        /* if (!mediaQuery1.matches) rating.style.transform = "translateY(10rem)" */
      })
    )
    .then(() =>
      wait(0.1)
        .then(() =>
          slides[slide].querySelector(".hero_btn").classList.remove("hide_data")
        )
        .then(() => (able = 0))
    );
};

// Activate Slider lines
const activateLine = function (slide) {
  if (homePage) {
    lines.forEach((l) => l.classList.remove("lines_line--active"));
    document
      .querySelector(`.lines_line[data-slide="${slide}"]`)
      .classList.add("lines_line--active");
  }
  smallProducts.forEach((l) => l.classList.remove("small_product--active"));
  document
    .querySelector(`.small_product[data-slide="${slide}"]`)
    .classList.add("small_product--active");
};

const goToSlide = function (slide) {
  able = 1;
  slides.forEach((s) => {
    s.style.transform = `translateX(${100 * -slide}%)`;
  });
  if (homePage) {
    showHeroEls(slide);
  }
};
goToSlide(0);
// Hero Slide
if (homePage) {
  // Next slide
  const nextSlide = function () {
    if (!able) {
      if (HeroCurSlide == maxSlide - 1) {
        HeroCurSlide = 0;
      } else {
        HeroCurSlide++;
      }
      goToSlide(HeroCurSlide);
      activateLine(HeroCurSlide);
    }
  };
  // Prev slide
  const prevSlide = function () {
    if (!able) {
      if (HeroCurSlide == 0) {
        HeroCurSlide = maxSlide - 1;
      } else {
        HeroCurSlide--;
      }
      goToSlide(HeroCurSlide);
      activateLine(HeroCurSlide);
    }
  };

  // Hero Event Handler
  document.addEventListener("keydown", function (e) {
    const heroPosition = section1.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (heroPosition < windowHeight) {
      if (e.key === "ArrowLeft") prevSlide();
      e.key === "ArrowRight" && nextSlide();
    }
  });
  let startX;
  let endX;
  document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
  });

  document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].clientX;

    if (startX > endX) {
      nextSlide();
    }
    if (startX < endX) {
      prevSlide();
    }
  });

  linesContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".lines_line");
    if (clicked) {
      const { slide } = e.target.dataset;
      if (!able) {
        HeroCurSlide = slide;
        goToSlide(slide);
        activateLine(slide);
      }
    }
  });
}

//Small Products Event handlers
if (homePage || addPage) {
  productsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".small_product");
    if (clicked) {
      const { slide } = clicked.dataset;
      if (homePage) {
        if (!able) {
          HeroCurSlide = slide;
          goToSlide(slide);
          activateLine(slide);
        }
      } else {
        goToSlide(slide);
        activateLine(slide);
      }
    }
  });
}

const body = document.querySelector("body");

// Favorite section
body.offsetWidth;
if (mediaQuery3.matches) {
  favoriteImgs.forEach((img, i) => {
    img.classList.add("hidden");
    const favImg = `<div class="favorite_img">
    <img
      src="./media/${img.querySelector("img").alt}/01.png"
      alt="${img.querySelector("img").alt}"
    />
  </div>`;
    favoriteItems[i].insertAdjacentHTML("afterbegin", favImg);
  });
}

const OpenModal = function () {
  favoriteModal.classList.remove("hidden");
  overlay2.classList.toggle("hidden");
  wait(0.01).then(() => overlay2.classList.toggle("overlay--active"));
};
const closeModal = function () {
  favoriteModal.classList.add("hidden");
  overlay2.classList.toggle("hidden");
  wait(0.001).then(() => overlay2.classList.toggle("overlay--active"));
};
favoriteBtn.addEventListener("click", OpenModal);
closeIcon.addEventListener("click", closeModal);
overlay2.addEventListener("click", closeModal);

// Add To cart Sneacker Heading
if (addPage) {
  if (mediaQuery2.matches) {
    addHeading.classList.add("hidden");
    const newHeading = `<div class="add_heading">
    <h2 class="name">Jordan 1 Mid</h2>
    <span class="categ">Men</span>
  </div>`;
    addSection.insertAdjacentHTML("afterbegin", newHeading);
  }
}
let timer;
if (cartPage) {
  shippBtn.addEventListener("click", function () {
    overlay2.classList.remove("hidden");
    shippMoadal.classList.remove("hidden");
    shippCar.classList.remove("hidden");
    timer = setTimeout(() => {
      circle.classList.remove("hidden");
      checkMark.classList.remove("hidden");
    }, 1300);
  });
  overlay2.addEventListener("click", function () {
    clearTimeout(timer);
    shippMoadal.classList.add("hidden");
    shippCar.classList.add("hidden");
    circle.classList.add("hidden");
    checkMark.classList.add("hidden");
  });

  // Cart Media Query
  if (mediaQuery3.matches) {
    document
      .querySelectorAll(".cart_product")
      .forEach((el) => el.classList.remove("flex"));
    document
      .querySelectorAll(".cart_product .name")
      .forEach((el) => el.classList.add("hidden"));
    document
      .querySelectorAll(".cart_product .icons")
      .forEach((el) => el.classList.add("hidden"));
    document.querySelectorAll(".cart_product").forEach((el) => {
      el.insertAdjacentHTML(
        "afterbegin",
        `<div class="cart_product--flex">
    <h3 class="name">adidas Superstar</h3>
    <div class="icons">
      <i class="fa-solid fa-pen"></i>
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>`
      );
    });
  }
}
