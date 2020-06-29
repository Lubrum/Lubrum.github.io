// Import Highway
import Highway from '@dogstudio/highway';

// Import Transitions
import Fade from './smooth.js';

// Import Renderers
import CustomRenderer from './custom-renderer.js';

function manageScripts(to) {
  // Your main JS file, used to prepend other scripts
  const main = document.querySelector('#main-script');
  const a = [...to.page.querySelectorAll('script:not([data-no-reload])')];
  const b = [...document.querySelectorAll('script:not([data-no-reload])')];
  // Compare Scripts
  for (let i = 0; i < b.length; i++) {
    const c = b[i];
    for (let j = 0; j < a.length; j++) {
      const d = a[j];
      if (c.outerHTML === d.outerHTML) {
        // Create Shadow Script
        const script = document.createElement(c.tagName);
        // Loop Over Attributes
        for (let k = 0; k < c.attributes.length; k++) {
          // Get Attribute
          const attr = c.attributes[k];
          // Set Attribute
          script.setAttribute(attr.nodeName, attr.nodeValue);
        }
        // Inline Script
        if (c.innerHTML) {
          script.innerHTML = c.innerHTML;
        }
        // Replace
        c.parentNode.replaceChild(script, c);
        // Clean Arrays
        b.splice(i, 1);
        a.splice(j, 1);
        // Exit Loop
        break;
      }
    }
  }
  // Remove Useless
  for (const script of b) {
    // Remove
    script.parentNode.removeChild(script);
  }
  // Add Scripts
  console.log("hhgghghfgmkggkfkhgkhgkghkmhfg");
  for (const script of a) {
    const loc = script.parentNode.tagName;
    console.log(script)
    if (loc === 'HEAD') {
      document.head.appendChild(script);
    }
    else  {
      document.body.appendChild(script);
    }
  }
};

// Call Highway.Core once.
const H = new Highway.Core({
  renderers: {
    post: CustomRenderer
  },
  transitions: {
    default: Fade
  }
});

H.on('NAVIGATE_END', ({ to }) => {
 // manageStyles(to);
 // manageScripts(to);
});