// Slider in section Welcome
let items = document.querySelectorAll(".welcome__slider .welcome__slider--item");
let currentItem = 0;
let isEnabled = true;
let paginations = document.querySelectorAll('.welcome__panel--pagination');
let el = document.querySelector('.welcome__slider');

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document
  .querySelector(".welcome__panel--left")
  .addEventListener("click", function () {
    if (isEnabled) {
      previousItem(currentItem);
    }

    let indexCurrent = +document.querySelector('.welcome__panel--num').textContent;
    let indexToMove = indexCurrent - 1;
    if (indexToMove == 0) {
      indexToMove = 5;
    }
    document.querySelector('.welcome__panel--num').textContent = `0${indexToMove}`;
    bullets(indexToMove);
  });

document
  .querySelector(".welcome__panel--right")
  .addEventListener("click", function () {
    if (isEnabled) {
      nextItem(currentItem);
    }

    let indexCurrent = +document.querySelector('.welcome__panel--num').textContent;
    let indexToMove = indexCurrent + 1;
    if (indexToMove == 6) {
      indexToMove = 1;
    }
    document.querySelector('.welcome__panel--num').textContent = `0${indexToMove}`;
    bullets(indexToMove);
  });

function bullets(paginationNext) {
  paginations.forEach(function (e, index, array) {
    e.classList.remove('pagination-active');
    array[paginationNext - 1].classList.add('pagination-active');

    // if (array[paginationNext - 1] < 0){
    //   paginationNext == 0
    // }
    // array[paginationNext - 1] > 5;
    // paginationNext == 5;
  });
}

paginations.forEach((item, index) => {
  let indexCurrent;
  let indexStart;
  item.addEventListener('click', () => {
    indexCurrent = index + 1;
    paginations.forEach((e, i) => {
      if (e.classList.contains('pagination-active')) {
        indexStart = i + 1;
      }
      e.classList.remove('pagination-active');
    });
  });
})

function swipedetect(el) {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', (e) => {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if ((distX > 0)) {
          if (isEnabled) {
            previousItem(currentItem);
            bullets(currentItem + 1);

            let indexCurrent = +document.querySelector('.welcome__panel--num').textContent;
            let indexToMove = indexCurrent - 1;
            if (indexToMove == 0) {
              indexToMove = 5;
            }
            document.querySelector('.welcome__panel--num').textContent = `0${indexToMove}`;
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
            bullets(currentItem + 1);

            let indexCurrent = +document.querySelector('.welcome__panel--num').textContent;
            let indexToMove = indexCurrent + 1;
            if (indexToMove == 6) {
              indexToMove = 1;
            }
            document.querySelector('.welcome__panel--num').textContent = `0${indexToMove}`;
          }
        }
      }
    }
  });
}

swipedetect(el);


// Modal window section tickets
let btn = document.querySelector(".submit_btn");
let popup = document.querySelector(".form__wrapper");
let close = document.querySelector(".form__close");

btn.addEventListener("click", function (ev) {
  ev.preventDefault();
  popup.classList.add("form__wrapper--active");
});

close.addEventListener("click", function (ev) {
  ev.preventDefault();
  popup.classList.remove("form__wrapper--active");
});

btn.addEventListener("click", function (e) {
  const x = e.clientX;
  const y = e.clientY;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  this.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
});


// Explore Slider
function initComparisons() {

  const compImage = document.querySelector('.explore_before');

  compareImages(compImage);

  function compareImages(img) {
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    let clicked = 0;
    let slider;

    img.style.width = `${(imgWidth / 2) + 80}px`;
    slider = document.createElement("div");
    slider.classList.add('explore_comp');
    img.parentElement.insertBefore(slider, img);

    slider.style.top = `${(imgHeight / 2) - (slider.offsetHeight / 2)}px`;
    slider.style.left = `${(imgWidth / 2) - (slider.offsetWidth / 2) + 80}px`;

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      e.preventDefault();

      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      let position;
      if (clicked == 0)
        return false;

      position = getCursorPos(e);

      if (position < 0)
        position = 0;
      if (position > imgWidth)
        position = imgWidth;

      slide(position);
    }

    function getCursorPos(e) {
      let a;
      let x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;

      a = img.getBoundingClientRect();

      x = e.pageX - a.left;

      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      img.style.width = `${x}px`;
      slider.style.left = `${img.offsetWidth - (slider.offsetWidth / 2)}px`;
    }
  }
}

initComparisons();

// Custom Video Player

// Custom Video Player buttons
const playVideo = document.querySelector('.btn_player');
const playPauseBtns = document.querySelectorAll('.btn__panel');
const playPanel = document.querySelector('.play_panel');
const player = document.querySelector('.video_hidden');
const video = document.querySelector('.video_main');
const videoControPplay = document.querySelector('.progress');

function pausePlayVideo() {

  videoControPplay.max = video.duration;

  playPauseBtns.forEach(e => {
    e.classList.toggle('btn__panel--pause');
  })

  video.ontimeupdate = () => {
    videoControPplay.value = video.currentTime;
    let counter = 100 / video.duration;
    videoControPplay.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoControPplay.value * counter}%, #C4C4C4 ${videoControPplay.value * counter}%, #C4C4C4 100%`;
  }

  if (video.classList.contains('playing')) {
    video.pause();
    playVideo.style.display = "block";
    video.classList.remove('playing');
    video.classList.add('pause');
    return;
  }
  playVideo.style.display = "none";
  video.play();
  video.classList.remove('pause');
  video.classList.add('playing');
  return;
}


playVideo.addEventListener('click', pausePlayVideo);
player.addEventListener('click', pausePlayVideo);
playPanel.addEventListener('click', pausePlayVideo);


const videoControVolume = document.querySelector('.progress_volume');
const contrMute = document.querySelectorAll('.panel_volume');

// Volume control

function control(evt) {
  evt.addEventListener('input', () => {
    let counter = 100 / video.duration;
    videoControPplay.max = video.duration;
    const muteValue = evt.value;

    if (evt === videoControVolume) {
      evt.style.background = `linear-gradient(to right, #710707 0%, #710707 ${muteValue}%, #C4C4C4 ${muteValue}%, #C4C4C4 100%`;
      video.volume = muteValue / 100;
      if (muteValue == 0) {
        contrMute.forEach(e => e.classList.toggle('panel_volume--unmute'));
        video.muted = true;
      } else {
        contrMute[0].classList.remove('panel_volume--unmute');
        contrMute[1].classList.add('panel_volume--unmute');
        video.muted = false;
      }
    } else {
      evt.style.background = `linear-gradient(to right, #710707 0%, #710707 ${muteValue * counter}%, #C4C4C4 ${muteValue * counter}%, #C4C4C4 100%`;
      video.current = evt.value;
    }
  })
}
control(videoControVolume);
control(videoControPplay);

//Audio button

const audio = document.querySelector('.btn__volume');

audio.addEventListener('click', mute);

function mute() {
  if (audio.classList.contains('volume_on')) {
    audio.classList.remove('volume_on');
    contrMute.forEach(e => e.classList.toggle('panel_volume--unmute'));
    video.muted = false;
    return;
  }

  audio.classList.add('volume_on');
  contrMute.forEach(e => e.classList.toggle('panel_volume--unmute'));
  video.muted = true;
  return;

}

// // Full Screen Button

// const fullBtn = document.querySelector('.btn__full');
// const fullScr = document.querySelector('.video__slider');
// const fullScrBtn = document.querySelectorAll('.full_screen');

// fullScr.addEventListener('fullscreenchange', () => {

// })
// fullScr.addEventListener('click', ()=> {
//   if (fullScr.classList.contains('video_fullscreen')) {
//     fullScr.classList.remove('video_fullscreen');
//     document.exitFullscreen();
//     return;
//   }
//   fullScr.classList.add('video_fullscreen');
//   fullScrBtn.forEach(e => e.classList.toggle('full_screen-on'));
//   fullScr.requestFullscreen();
//   return
// })




// Ticket calculate

let label = document.querySelectorAll('.input_checkmark');

document.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('btn__plus')) {
    ++e.target.parentElement.querySelector('input').value;
    if (e.target.parentElement.querySelector('input').value > 20) {
      e.target.parentElement.querySelector('input').value = 20;
    }
  } else if (e.target.classList.contains('btn__minus')) {
    --e.target.parentElement.querySelector('input').value;
    if (e.target.parentElement.querySelector('input').value < 0) {
      e.target.parentElement.querySelector('input').value = 0;
    }
  }
})

console.log(label);


label.forEach((item) => {
  if (item.checked) {
    console.log('dfdfds');
  }
})



const price = {
  Permanent_exhibition: 20,
  Temporary_exhibition: 25,
  Combined_Admission: 45,
}