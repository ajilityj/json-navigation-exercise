document.addEventListener('DOMContentLoaded', 
  () => {

    "use strict";
    
    // find nav
    const nav = document.querySelector('nav');

    // set slider bar
    let navSliderBar = null;

    // fetch navigation items from json
    const getNavItems = async () => {
      const response = await fetch('./provided-files/navigation.json');
      const data = await response.json();
      return data;
    }
    getNavItems().then(data => showNavItems(data.cities));

    // create & show nav items
    const showNavItems = items => {
      // create list
      const ul = document.createElement('ul');

      // for each list item...
      items.forEach(item => {
        // create list item
        const li = document.createElement('li');

        // create anchor element
        const a = document.createElement('a');

        // add content to anchor element
        a.setAttribute('href', `#${item.section}`);
        a.innerHTML = item.label;
        a.onclick = addActiveClass;

        // add anchor element to list item
        li.appendChild(a);

        // add list item to list
        ul.appendChild(li);
      });

      // create nav line element & append to nav list
      const li = document.createElement('li');
      li.setAttribute('id', 'js-nav-slider-bar');
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

    const addActiveClass = e => {
      // show slider bar
      navSliderBar.style.display = 'inline-block';

      // get clicked element
      const navItem = e.target;

      // remove 'active' class from previously clicked element
      removeActiveClass();

      // add active class to clicked element
      navItem.classList.add('active');

      // move slider bar to clicked element's width & left position
      getNavSliderBar(navItem.offsetWidth, navItem.offsetLeft);
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

    // update position & size of navSliderBar on resize
    window.addEventListener('resize', () => {
        // find element w/active class
        const activeElement = findActiveElement();

        // move slider bar to active element's width & left position
        if (activeElement) {
          getNavSliderBar(activeElement.offsetWidth, activeElement.offsetLeft);
        }
    })
  }, 
  false
);
