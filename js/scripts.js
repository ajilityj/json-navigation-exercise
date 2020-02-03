document.addEventListener('DOMContentLoaded', 
  () => {

    "use strict";
    
    let currentUTC = 0;

    // fetch navigation items from json
    const getNavItems = async () => {
      const response = await fetch('./provided-files/navigation.json');
      const data = await response.json();
      return data;
    }
    getNavItems().then(data => {
      showNavItems(data.cities);
    });

    // find nav & 'current time' element
    const nav = document.querySelector('nav');
    const currentTimeElement = document.getElementById('js-current-time');

    // set slider bar
    let navSliderBar = null;

    const showNavItems = cities => {
      // create list
      const ul = document.createElement('ul');

      // for each list item...
      cities.forEach(city => {
        // create list item
        const li = document.createElement('li');

        // create anchor element
        const a = document.createElement('a');

        // add content to anchor element
        a.setAttribute('href', `#${city.section}`);
        a.setAttribute('data-utc', `${city["utc-offset"]}`);
        a.innerHTML = city.label;
        a.onclick = activateNavItem;

        // add anchor element to list item
        li.appendChild(a);

        // add list item to list
        ul.appendChild(li);
      });

      // create nav line element & append to nav list
      const li = document.createElement('li');
      li.setAttribute('id', 'js-nav-slider-bar');
      li.setAttribute('class', 'nav-slider-bar');
      ul.appendChild(li);

      // add list to nav
      nav.appendChild(ul);

      // update reference to the slider bar
      navSliderBar = document.getElementById('js-nav-slider-bar');
    };

    const removeActiveClass = () => {
      // get active element
      const activeElement = document.getElementsByClassName('active').length ? document.getElementsByClassName('active')[0] : null;

      // remove 'active' class from currently active element, if it exists
      if (activeElement) {
        activeElement.classList.remove('active');
      }
    };

    const activateNavItem = e => {
      // show slider bar & 'current time' element
      navSliderBar.style.display = 'inline-block';
      currentTimeElement.style.display = 'block';

      // get clicked element
      const navItem = e.target;

      // remove 'active' class from previously clicked element
      removeActiveClass();

      // add active class to clicked element
      navItem.classList.add('active');

      // move slider bar to clicked element's width & left position
      getNavSliderBar(navItem.offsetWidth, navItem.offsetLeft);

      // save utc of clicked element
      currentUTC = navItem.dataset.utc;

      // show current time of selected location
      getCurrentTime();
    };

    const getNavSliderBar = (width, leftPosition) => {

      // find window width
      const windowWidth = document.body.clientWidth;
      
      // set emSize, based on window width
      let emSize = 0;
      if (windowWidth < 792) emSize = 18;
      else if (windowWidth < 910) emSize = 12;
      else if (windowWidth < 1032) emSize = 14;
      else if (windowWidth < 1154) emSize = 16;
      else emSize = 18;

      // set width and position (accounting for 1em left/right padding)
      navSliderBar.style.width = width - (emSize * 2) + 'px';
      navSliderBar.style.left = leftPosition + (emSize) + 'px';
    }

    const findActiveElement = () => {
      return document.getElementsByClassName('active').length ? document.getElementsByClassName('active')[0] : null;
    }

    const getUTCTime = (date, offset) => {

      let seconds = date.getUTCSeconds();
      if (seconds < 10) seconds = `0${seconds}`;

      let minutes = date.getUTCMinutes();
      if (minutes < 10) minutes = `0${minutes}`;

      let hours = date.getUTCHours() + offset;
      if (hours > 23) hours = 24 - hours;
      if (hours < 0) hours = 24 + hours;
      
      const timeOfDay = hours < 12 ? "AM" : "PM";
      const hour = hours <= 12 ? (hours === 0 ? 12 : hours) : (hours - 12);

      return `${hour}:${minutes}:${seconds} ${timeOfDay}`;
    }
  
    const getCurrentTime = () => {
      return currentTimeElement.innerHTML = getUTCTime(new Date(), parseInt(currentUTC));
    }
    setInterval(getCurrentTime, 1000); // 1s

    // update position & size of navSliderBar on window resize
    window.addEventListener('resize', () => {
      // find element w/active class
      const activeElement = findActiveElement();

      // move slider bar to active element's width & left position
      if (activeElement) {
        getNavSliderBar(activeElement.offsetWidth, activeElement.offsetLeft);
      }
  });
  }, 
  false
);
