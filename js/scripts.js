document.addEventListener(
  'DOMContentLoaded',
  function() {
    // find nav
    const nav = document.querySelector('nav');

    // fetch navigation items from json
    async function getNavItems() {
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
        a.onclick = activateNavItem;

        // add anchor element to list item
        li.appendChild(a);

        // add list item to list
        ul.appendChild(li);
      });

      const li = document.createElement('li');
      li.setAttribute('id', 'nav-line');
      ul.appendChild(li);

      // add list to nav
      nav.appendChild(ul);
    };

    const removeActiveClass = () => {
      const activeElements = document.querySelectorAll('.active');

      for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.remove('active');
      }
    };

    const activateNavItem = e => {
      // show line
      const navLine = document.getElementById('nav-line');
      navLine.style.display = 'inline-block';

      // get clicked element
      const navItem = e.target;

      // find & remove active class from all elements
      removeActiveClass();

      // add active class to clicked element
      navItem.classList.add('active');

      // set width and position (accounting for 1em (18px) left/right padding)
      navLine.style.width = navItem.offsetWidth - 36 + 'px';
      navLine.style.left = navItem.offsetLeft + 18 + 'px';
    };
  },
  false
);
