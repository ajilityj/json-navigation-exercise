document.addEventListener('DOMContentLoaded', function() {
    
    // find nav element
    const nav = document.querySelector('nav');

    // fetch navigation items
    async function getNavItems() {
      const response = await fetch('./provided-files/navigation.json');
      const data = await response.json();
      return data;
    }
    getNavItems().then(data => showNavItems(data.cities));

    function showNavItems(items) {
            
        // for each nav item...
        items.forEach(item => {
        
            // create anchor element
            const a = document.createElement('a');

            // add nav content to anchor element
            a.setAttribute('href', `#${item.section}`);
            a.innerHTML = item.label;
            
            // add anchor element to nav
            nav.appendChild(a);
        });
    }

    // listen to click events on nav items
    nav.onclick = (event) => {

        const clickedElement = event.target;
        const currentElement = nav.getElementsByClassName('selected')[0];
        const marker = document.querySelector('#js-marker');

        const clickedElementDimensions = clickedElement.getBoundingClientRect();
        const computedStyle = getComputedStyle(clickedElement);

        // remove 'selected' class from previous selection
        if (currentElement && currentElement !== clickedElement) {
            currentElement.setAttribute('class', '');
        }

        // add 'selected' class to clicked nav item
        clickedElement.setAttribute('class', 'selected');
      
        // animate nav item underline
        marker.style.left = clickedElementDimensions.left + parseInt(computedStyle.paddingLeft, 10) + 'px';
        marker.style.top = clickedElementDimensions.bottom + 'px';
        marker.style.width = clickedElementDimensions.width - parseInt(computedStyle.paddingLeft) - parseInt(computedStyle.paddingRight) + 'px';
    }

}, false);