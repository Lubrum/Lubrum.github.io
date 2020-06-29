// Import Highway
import Highway from '@dogstudio/highway';
import { TweenMax } from 'gsap';

class Fade extends Highway.Transition {

  in({ from, to, done }) {
    TweenMax.fromTo(to,
      0.5,
      { opacity: 0 },
      {
        opacity: 1, onComplete: function () {
          done();
        }
      }
    );
  }

  out({ from, done }) {
    TweenMax.fromTo(from, 
      0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: function () {
          window.scrollTo(0, 0);
          from.remove();
          
          done();
        }
      }
    );
  }

}

export default Fade;
