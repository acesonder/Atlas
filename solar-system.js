// Import Three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Solar System Configuration
const solarSystemData = {
    sun: {
        name: 'Sun',
        radius: 10,
        color: 0xFFD700,
        emissive: 0xFFAA00,
        emissiveIntensity: 1
    },
    planets: [
        {
            name: 'Mercury',
            radius: 0.38,
            color: 0x8C7853,
            distance: 20,
            orbitSpeed: 4.74,
            rotationSpeed: 0.01,
            moons: []
        },
        {
            name: 'Venus',
            radius: 0.95,
            color: 0xFFC649,
            distance: 30,
            orbitSpeed: 3.50,
            rotationSpeed: 0.005,
            moons: []
        },
        {
            name: 'Earth',
            radius: 1,
            color: 0x2233FF,
            distance: 40,
            orbitSpeed: 2.98,
            rotationSpeed: 0.02,
            moons: [
                { name: 'Moon', radius: 0.27, color: 0xC0C0C0, distance: 3, orbitSpeed: 1 }
            ]
        },
        {
            name: 'Mars',
            radius: 0.53,
            color: 0xCD5C5C,
            distance: 50,
            orbitSpeed: 2.41,
            rotationSpeed: 0.018,
            moons: [
                { name: 'Phobos', radius: 0.15, color: 0x999999, distance: 2, orbitSpeed: 2 },
                { name: 'Deimos', radius: 0.12, color: 0x888888, distance: 2.5, orbitSpeed: 1.5 }
            ]
        },
        {
            name: 'Jupiter',
            radius: 5,
            color: 0xDAA520,
            distance: 70,
            orbitSpeed: 1.31,
            rotationSpeed: 0.04,
            moons: [
                { name: 'Io', radius: 0.28, color: 0xFFFF99, distance: 8, orbitSpeed: 1.5 },
                { name: 'Europa', radius: 0.24, color: 0xCCDDFF, distance: 9.5, orbitSpeed: 1.2 },
                { name: 'Ganymede', radius: 0.41, color: 0xB8B8B8, distance: 11, orbitSpeed: 1 },
                { name: 'Callisto', radius: 0.37, color: 0x999999, distance: 12.5, orbitSpeed: 0.8 }
            ]
        },
        {
            name: 'Saturn',
            radius: 4.5,
            color: 0xFAD5A5,
            distance: 95,
            orbitSpeed: 0.97,
            rotationSpeed: 0.038,
            hasRings: true,
            moons: [
                { name: 'Titan', radius: 0.4, color: 0xFFCC99, distance: 9, orbitSpeed: 1 },
                { name: 'Rhea', radius: 0.12, color: 0xDDDDDD, distance: 10.5, orbitSpeed: 1.2 },
                { name: 'Iapetus', radius: 0.11, color: 0xAAAAAA, distance: 12, orbitSpeed: 0.9 }
            ]
        },
        {
            name: 'Uranus',
            radius: 2.5,
            color: 0x4FD0E7,
            distance: 120,
            orbitSpeed: 0.68,
            rotationSpeed: 0.03,
            moons: [
                { name: 'Titania', radius: 0.12, color: 0xBBBBBB, distance: 6, orbitSpeed: 1 },
                { name: 'Oberon', radius: 0.11, color: 0xAAAAAA, distance: 7, orbitSpeed: 0.9 }
            ]
        },
        {
            name: 'Neptune',
            radius: 2.4,
            color: 0x4169E1,
            distance: 150,
            orbitSpeed: 0.54,
            rotationSpeed: 0.032,
            moons: [
                { name: 'Triton', radius: 0.21, color: 0xCCCCCC, distance: 6, orbitSpeed: 1.2 }
            ]
        }
    ],
    comets: [
        {
            name: 'Halley',
            radius: 0.3,
            color: 0xCCFFFF,
            distance: 60,
            orbitSpeed: 0.5,
            eccentricity: 0.967
        },
        {
            name: 'Hale-Bopp',
            radius: 0.25,
            color: 0xAADDFF,
            distance: 80,
            orbitSpeed: 0.3,
            eccentricity: 0.995
        }
    ]
};

// Global variables
let scene, camera, renderer, controls;
let sun, planets = [], planetMeshes = [], moonMeshes = [], orbitLines = [], cometMeshes = [];
let labels = { planets: [], moons: [], stars: [], comets: [] };
let timeScale = 10;
let simulationDate = new Date();
let animationId;

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.set(0, 100, 200);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 500;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xFFFFFF, 2, 1000);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Add stars background
    addStars();

    // Create the sun
    createSun();

    // Create planets and moons
    createPlanets();

    // Create comets
    createComets();

    // Set up event listeners
    setupEventListeners();

    // Hide loading screen
    document.getElementById('loading').style.display = 'none';

    // Start animation
    animate();
}

// Add stars to the background
function addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.7,
        transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Add star label
    labels.stars.push({ name: 'Stars (Background)', element: null });
}

// Create the sun
function createSun() {
    const sunGeometry = new THREE.SphereGeometry(solarSystemData.sun.radius, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: solarSystemData.sun.color,
        emissive: solarSystemData.sun.emissive,
        emissiveIntensity: solarSystemData.sun.emissiveIntensity
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(solarSystemData.sun.radius * 1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFAA00,
        transparent: true,
        opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sun.add(glow);

    labels.stars.push({ name: solarSystemData.sun.name, mesh: sun });
}

// Create planets, moons, and orbits
function createPlanets() {
    solarSystemData.planets.forEach((planetData, index) => {
        // Create planet group
        const planetGroup = new THREE.Group();
        scene.add(planetGroup);

        // Create planet mesh
        const planetGeometry = new THREE.SphereGeometry(planetData.radius, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: planetData.color,
            roughness: 0.7,
            metalness: 0.3
        });
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        planetGroup.add(planetMesh);

        // Add Saturn's rings
        if (planetData.hasRings) {
            const ringGeometry = new THREE.RingGeometry(
                planetData.radius * 1.2,
                planetData.radius * 2,
                64
            );
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xC9A98F,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planetMesh.add(ring);
        }

        // Create orbit line
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitPoints = [];
        for (let i = 0; i <= 128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            orbitPoints.push(
                Math.cos(angle) * planetData.distance,
                0,
                Math.sin(angle) * planetData.distance
            );
        }
        orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
        const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x4DD0E1,
            transparent: true,
            opacity: 0.3
        });
        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
        scene.add(orbitLine);
        orbitLines.push(orbitLine);

        // Store planet data
        planets.push({
            group: planetGroup,
            mesh: planetMesh,
            data: planetData,
            angle: Math.random() * Math.PI * 2,
            moons: []
        });
        planetMeshes.push(planetMesh);

        labels.planets.push({ name: planetData.name, mesh: planetMesh });

        // Create moons
        if (planetData.moons && planetData.moons.length > 0) {
            planetData.moons.forEach(moonData => {
                const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
                const moonMaterial = new THREE.MeshStandardMaterial({
                    color: moonData.color,
                    roughness: 0.8,
                    metalness: 0.2
                });
                const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

                const moonGroup = new THREE.Group();
                moonGroup.add(moonMesh);
                planetMesh.add(moonGroup);

                const moon = {
                    group: moonGroup,
                    mesh: moonMesh,
                    data: moonData,
                    angle: Math.random() * Math.PI * 2
                };

                planets[planets.length - 1].moons.push(moon);
                moonMeshes.push(moonMesh);
                labels.moons.push({ name: moonData.name, mesh: moonMesh });
            });
        }
    });
}

// Create comets
function createComets() {
    solarSystemData.comets.forEach(cometData => {
        const cometGeometry = new THREE.SphereGeometry(cometData.radius, 16, 16);
        const cometMaterial = new THREE.MeshBasicMaterial({
            color: cometData.color,
            transparent: true,
            opacity: 0.8
        });
        const cometMesh = new THREE.Mesh(cometGeometry, cometMaterial);

        // Create comet tail
        const tailGeometry = new THREE.ConeGeometry(cometData.radius * 0.5, cometData.radius * 10, 8);
        const tailMaterial = new THREE.MeshBasicMaterial({
            color: cometData.color,
            transparent: true,
            opacity: 0.3
        });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.rotation.x = Math.PI / 2;
        tail.position.z = -cometData.radius * 5;
        cometMesh.add(tail);

        const cometGroup = new THREE.Group();
        cometGroup.add(cometMesh);
        scene.add(cometGroup);

        const comet = {
            group: cometGroup,
            mesh: cometMesh,
            data: cometData,
            angle: Math.random() * Math.PI * 2,
            visible: false
        };

        cometMeshes.push(comet);
        labels.comets.push({ name: cometData.name, mesh: cometMesh });

        // Initially hide comets
        cometGroup.visible = false;
    });
}

// Update planet and moon positions
function updateCelestialBodies(deltaTime) {
    const timeMultiplier = timeScale * deltaTime * 0.001;

    // Update planets
    planets.forEach(planet => {
        // Update orbital position
        planet.angle += planet.data.orbitSpeed * timeMultiplier * 0.01;
        const x = Math.cos(planet.angle) * planet.data.distance;
        const z = Math.sin(planet.angle) * planet.data.distance;
        planet.group.position.set(x, 0, z);

        // Update rotation
        planet.mesh.rotation.y += planet.data.rotationSpeed;

        // Update moons
        planet.moons.forEach(moon => {
            moon.angle += moon.data.orbitSpeed * timeMultiplier * 0.05;
            const mx = Math.cos(moon.angle) * moon.data.distance;
            const mz = Math.sin(moon.angle) * moon.data.distance;
            moon.group.position.set(mx, 0, mz);
            moon.mesh.rotation.y += 0.01;
        });
    });

    // Update comets
    cometMeshes.forEach(comet => {
        if (comet.visible) {
            comet.angle += comet.data.orbitSpeed * timeMultiplier * 0.01;
            
            // Elliptical orbit using eccentricity
            const e = comet.data.eccentricity;
            const a = comet.data.distance;
            const b = a * Math.sqrt(1 - e * e);
            
            const x = Math.cos(comet.angle) * a;
            const z = Math.sin(comet.angle) * b;
            comet.group.position.set(x, 0, z);

            // Point tail away from sun
            const direction = new THREE.Vector3(x, 0, z);
            direction.normalize();
            comet.mesh.lookAt(new THREE.Vector3(0, 0, 0));
        }
    });

    // Update simulation date
    simulationDate = new Date(simulationDate.getTime() + timeMultiplier * 86400000); // Add days
    updateDateDisplay();
}

// Update date display
function updateDateDisplay() {
    const dateStr = simulationDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = `Current Date: ${dateStr}`;
}

// Setup event listeners
function setupEventListeners() {
    // Time slider
    const timeSlider = document.getElementById('timeSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    timeSlider.addEventListener('input', (e) => {
        timeScale = parseFloat(e.target.value);
        timeDisplay.textContent = timeScale > 0 ? `${timeScale}x` : 
                                  timeScale < 0 ? `${timeScale}x (reverse)` : 'Paused';
    });

    // Date input
    const dateInput = document.getElementById('dateInput');
    dateInput.value = new Date().toISOString().split('T')[0];
    dateInput.addEventListener('change', (e) => {
        simulationDate = new Date(e.target.value);
        updateDateDisplay();
    });

    // Reset time button
    document.getElementById('resetTime').addEventListener('click', () => {
        simulationDate = new Date();
        dateInput.value = new Date().toISOString().split('T')[0];
        updateDateDisplay();
    });

    // Reset camera button
    document.getElementById('resetCamera').addEventListener('click', () => {
        camera.position.set(0, 100, 200);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    // Toggle planet labels
    document.getElementById('togglePlanetLabels').addEventListener('change', (e) => {
        // Labels would be implemented with CSS2DRenderer for production
        console.log('Planet labels:', e.target.checked);
    });

    // Toggle moon labels
    document.getElementById('toggleMoonLabels').addEventListener('change', (e) => {
        console.log('Moon labels:', e.target.checked);
    });

    // Toggle star labels
    document.getElementById('toggleStarLabels').addEventListener('change', (e) => {
        console.log('Star labels:', e.target.checked);
    });

    // Toggle orbits
    document.getElementById('toggleOrbits').addEventListener('change', (e) => {
        orbitLines.forEach(line => {
            line.visible = e.target.checked;
        });
    });

    // Toggle comets
    document.getElementById('toggleComets').addEventListener('change', (e) => {
        cometMeshes.forEach(comet => {
            comet.visible = e.target.checked;
            comet.group.visible = e.target.checked;
        });
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    animationId = requestAnimationFrame(animate);

    const deltaTime = 16; // Approximate 60fps
    updateCelestialBodies(deltaTime);

    controls.update();
    renderer.render(scene, camera);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);
