document.addEventListener("DOMContentLoaded", function() {

    // find nav & marker elements
    const nav = document.querySelector("nav");
    const marker = document.querySelector("#js-marker");

    // fetch navigation items from json
    async function getNavItems() {
      const response = await fetch('./provided-files/navigation.json');
      const data = await response.json();
      return data;
    }
    getNavItems().then(data => showNavItems(data.cities));

    // create & show nav items
    function showNavItems(items) {
      // for each nav item...
      items.forEach((item, index) => {
        // create anchor element
        const a = document.createElement("a");

        // add nav content to anchor element
        a.setAttribute("href", `#${item.section}`);
        a.innerHTML = item.label;

        // add anchor element to nav
        nav.appendChild(a);
      });
    }

    // listen to click events on nav items
    nav.onclick = event => {
      // get current 'selected' element
      const currentElement = nav.getElementsByClassName("selected")[0];
      // get clicked element's attributes
      const clickedElement = event.target;
      const clickedElementDimensions = clickedElement.getBoundingClientRect();
      const clickedComputedStyle = getComputedStyle(clickedElement);
      // get marker attributes
      const markerDimensions = marker.getBoundingClientRect();

      // calculate left position of marker
      let currentMarkerLeftPosition = Math.round(markerDimensions.left) || 0;

      // calculate & set width and top position of marker
      marker.style.top = clickedElementDimensions.bottom + "px";
      marker.style.width =
        clickedElementDimensions.width -
        parseInt(clickedComputedStyle.paddingLeft) -
        parseInt(clickedComputedStyle.paddingRight) +
        "px";

      // calculate width & position of marker for clicked/selected item
      const clickedElementLeftPosition = Math.round(
        clickedElementDimensions.left +
        parseInt(clickedComputedStyle.paddingLeft, 10)
    );

      // remove 'selected' class from previous selection
      if (currentElement && currentElement !== clickedElement) {
        currentElement.setAttribute("class", "");
      }

      // add 'selected' class to clicked nav item
      clickedElement.setAttribute("class", "selected");

      // animate underline for selected nav item
      // TO-DO: increase animation speed & smooth transition w/multi-fast-clicks
      const movingMarker = setInterval(animateMarker, 5);

      function animateMarker() {
        // update marker position
        if (currentMarkerLeftPosition > clickedElementLeftPosition) {
          currentMarkerLeftPosition--;
        } else {
          currentMarkerLeftPosition++;
        } 

        // if marker has reached new left position, stop animation
        if (currentMarkerLeftPosition === clickedElementLeftPosition) {
          clearInterval(movingMarker);
        }

        // set marker's new left position
        marker.style.left = currentMarkerLeftPosition + "px";
      }
    };
  },
  false
);
