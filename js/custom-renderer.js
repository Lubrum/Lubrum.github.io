// File: custom-renderer.js
// Import Highway
import Highway from '@dogstudio/highway';

class CustomRenderer extends Highway.Renderer {
    // Hooks/methods   
    onEnterCompleted() {
        const scripts = document.querySelectorAll('script')
        for (const script of scripts) {
            if(script.type !== 'application/json' && 
            script.type !== 'application/htmlwidget-sizing' &&
            script.type !== 'application/ld+json') {
                const code = script.innerText    
                Function(code)()
            }
        }
    }
}

// Don`t forget to export your renderer
export default CustomRenderer;