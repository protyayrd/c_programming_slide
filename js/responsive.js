// Responsive functionality
class ResponsiveHandler {
    constructor() {
        this.breakpoints = {
            mobile: 320,
            tablet: 768,
            laptop: 1024,
            desktop: 1440,
            largeScreen: 2560,
            smartBoard: 3840
        };

        this.init();
    }

    init() {
        // Listen for resize events
        window.addEventListener('resize', this.handleResize.bind(this));

        // Initial check
        this.handleResize();
    }

    handleResize() {
        const width = window.innerWidth;
        document.body.classList.remove('mobile', 'tablet', 'laptop', 'desktop', 'large-screen', 'smart-board');

        if (width <= this.breakpoints.mobile) {
            document.body.classList.add('mobile');
        } else if (width <= this.breakpoints.tablet) {
            document.body.classList.add('tablet');
        } else if (width <= this.breakpoints.laptop) {
            document.body.classList.add('laptop');
        } else if (width <= this.breakpoints.desktop) {
            document.body.classList.add('desktop');
        } else if (width <= this.breakpoints.largeScreen) {
            document.body.classList.add('large-screen');
        } else {
            document.body.classList.add('smart-board');
        }
    }

    // Utility method to check if device is touch-enabled
    isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    }
}

// Initialize responsive handler
const responsive = new ResponsiveHandler(); 