// Import Highway
import Highway from '@dogstudio/highway';

// Import Transitions
import Fade from './smooth.js';

// Import Renderers
import CustomRenderer from './custom-renderer.js';

// Call Highway.Core once.
const H = new Highway.Core({
  renderers: {
    post: CustomRenderer
  },
  transitions: {
    default: Fade
  
});
