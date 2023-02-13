// Import Highway
import Highway from '@dogstudio/highway';
import gsap from 'gsap';

class Fade extends Highway.Transition {

  in({ from, to, done }) {
    gsap.fromTo(
      to,
      { duration: 0.25 , opacity: 0 },
      {
        opacity: 1, onComplete: function () {
          done();
        }
      }
    );
  }

  out({ from, done }) {
    gsap.fromTo(
      from, 
      { duration: 0.25 , opacity: 1 },
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
