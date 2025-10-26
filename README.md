# Atlas - Solar System Explorer

A web-based 3D solar system visualization application that allows you to explore our solar system with detailed models of all planets, moons, and comets. Navigate through time and space with interactive controls.

## Features

- 🌍 **Complete Solar System**: All 8 planets with accurate relative sizes and distances
- 🌙 **Moons**: Major moons of each planet (Earth's Moon, Jupiter's Galilean moons, Saturn's Titan, etc.)
- ⭐ **Stars**: The Sun with realistic lighting and glow effects
- ☄️ **Comets**: Famous comets like Halley's Comet with elliptical orbits and tails
- ⏰ **Time Scanner**: Navigate through past, present, and future with adjustable time scale
- 🎯 **Interactive Labels**: Toggle labels for planets, moons, stars, and comets
- 🛸 **Orbital Paths**: Visualize planetary and comet trajectories
- 🎨 **Legend**: Color-coded legend for different celestial body types
- 🎮 **Camera Controls**: Rotate, pan, and zoom to explore from any angle

## Installation & Setup

![Atlas Solar System Explorer Demo](https://github.com/user-attachments/assets/78fee721-78bb-4897-a2f3-d6f88a3ad24a)

*Screenshot of the Atlas Solar System Explorer interface showing the control panel and demo visualization*

### Quick Start (No Installation Required)

1. **Download or Clone the Repository**
   ```bash
   git clone https://github.com/acesonder/Atlas.git
   cd Atlas
   ```

2. **Open in Browser**
   Simply open `index.html` in any modern web browser:
   - Double-click `index.html`, or
   - Right-click `index.html` → Open with → Your browser, or
   - Drag and drop `index.html` into your browser window

   **Note**: The application uses CDN links for Three.js libraries, so an internet connection is required.

3. **Try the Demo** (Optional)
   - Open `demo.html` to see a static demonstration of the UI and controls
   - This demo works without internet connection and shows the interface layout
   - For the full 3D interactive experience, use `index.html` with internet access

### Local Web Server (Recommended)

For the best experience, serve the files through a local web server:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

#### Using PHP (if installed):
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Browser Requirements

The application works best in modern browsers with WebGL support:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Usage Guide

### Time Controls

- **Time Scale Slider**: Adjust the speed of the simulation
  - Positive values: Move forward in time (1x to 100x speed)
  - Zero: Pause the simulation
  - Negative values: Move backward in time (reverse)
  
- **Date Selector**: Jump to a specific date in history or future
  
- **Reset to Now**: Return to the current date and time

### Display Options

Toggle visibility of various elements:
- ☑️ **Planet Labels**: Show/hide planet names
- ☑️ **Moon Labels**: Show/hide moon names
- ☑️ **Star Labels**: Show/hide star/sun labels
- ☑️ **Orbits**: Show/hide orbital paths
- ☑️ **Comets**: Show/hide comets and their trajectories

### Camera Controls

- **Left Click + Drag**: Rotate the view around the solar system
- **Right Click + Drag**: Pan the camera
- **Mouse Wheel**: Zoom in/out
- **Reset Camera Button**: Return to default view

### Legend

The color-coded legend helps identify different types of celestial bodies:
- 🟡 **Yellow**: Sun (Star)
- 🟤 **Brown**: Rocky planets (Mercury, Venus, Earth, Mars)
- 🟠 **Gold**: Gas giants (Jupiter, Saturn)
- 🔵 **Blue**: Ice giants (Uranus, Neptune)
- ⚪ **Gray**: Moons
- 🔷 **Light Blue**: Orbital paths

## Technical Details

### Technologies Used

- **Three.js**: 3D graphics rendering engine
- **WebGL**: Hardware-accelerated 3D graphics
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with blur effects and animations

### Files Structure

```
Atlas/
├── index.html          # Main HTML file
├── styles.css          # Styling and UI
├── solar-system.js     # Main application logic and 3D rendering
└── README.md          # This file
```

### Celestial Bodies Included

**Planets:**
- Mercury
- Venus
- Earth
- Mars
- Jupiter
- Saturn (with rings)
- Uranus
- Neptune

**Moons:**
- Moon (Earth)
- Phobos, Deimos (Mars)
- Io, Europa, Ganymede, Callisto (Jupiter)
- Titan, Rhea, Iapetus (Saturn)
- Titania, Oberon (Uranus)
- Triton (Neptune)

**Comets:**
- Halley's Comet
- Hale-Bopp

**Star:**
- The Sun

## Customization

You can modify the solar system configuration in `solar-system.js`:

- **Add more moons**: Extend the `moons` array for each planet
- **Adjust speeds**: Modify `orbitSpeed` and `rotationSpeed` values
- **Change colors**: Update the `color` values (hex format)
- **Add more comets**: Add entries to the `comets` array with orbital parameters

## Performance Notes

- The application is optimized for modern hardware
- For better performance on older devices:
  - Reduce the number of visible moons
  - Disable orbital paths
  - Hide comets when not needed

## Troubleshooting

**Problem**: White/blank screen
- **Solution**: Check browser console for errors, ensure internet connection for CDN resources

**Problem**: Laggy performance
- **Solution**: Close other browser tabs, disable some visual options, use a modern browser

**Problem**: Controls not working
- **Solution**: Refresh the page, ensure JavaScript is enabled

**Problem**: CDN blocked (corporate/restricted networks)
- **Solution**: The application requires loading Three.js from unpkg.com CDN. If access is blocked:
  - Use a different network without restrictions
  - Download Three.js locally (see advanced setup below)

### Advanced Setup (Offline/CDN-blocked environments)

If you need to run the application without CDN access:

1. Download Three.js library:
   ```bash
   mkdir libs
   cd libs
   wget https://unpkg.com/three@0.150.0/build/three.module.js
   wget https://unpkg.com/three@0.150.0/examples/jsm/controls/OrbitControls.js
   ```

2. Update `index.html` to use local files instead of CDN

## Testing

To verify the application is working correctly:

1. Open the application in your browser
2. You should see:
   - A black space background with stars
   - The Sun in the center (yellow/gold sphere with glow)
   - 8 planets orbiting around the Sun
   - Orbital path lines visible around each planet
   - Control panel on the left side
   - Time controls, display options, and legend visible

3. Test the controls:
   - Move the time slider - planets should speed up/slow down
   - Click and drag on the canvas - view should rotate
   - Scroll mouse wheel - view should zoom in/out
   - Toggle "Show Orbits" - orbital lines should appear/disappear
   - Toggle "Show Comets" - comets should appear with tails
   - Change the date - simulation should jump to that time

4. Check browser console for errors:
   - Press F12 to open developer tools
   - Check Console tab for any errors
   - All resources should load successfully

## License

This project uses royalty-free 3D rendering techniques with procedurally generated celestial bodies. All code is provided as-is for educational and personal use.

## Credits

- Built with [Three.js](https://threejs.org/) - Open source 3D graphics library
- Astronomical data based on NASA references
- Created for the Atlas Solar System Explorer project

## Future Enhancements

Potential features for future versions:
- Real astronomical data integration
- More detailed textures (requires image assets)
- Asteroid belt visualization
- Dwarf planets (Pluto, Ceres, etc.)
- Planetary rotation axis tilt
- Real-time planetary positions
- Educational information panels
- Screenshot/export functionality
- VR support

---

**Enjoy exploring the solar system! 🚀🌌**