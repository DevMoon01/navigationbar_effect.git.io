// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particelle multicolore
const colors = [0x0071ff, 0x00ff77, 0xff5e00];
const geometry = new THREE.SphereGeometry(0.15, 12, 12);
const spheres = [];

for (let i = 0; i < 120; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6
    });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30
    );
    scene.add(mesh);
    spheres.push(mesh);
}

scene.add(new THREE.AmbientLight(0xffffff, 0.8));

// Inerzia
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    targetX = x * 0.3;
    targetY = y * 0.1;
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / innerWidth - 0.5) * 2;
        const y = (touch.clientY / innerHeight - 0.5) * 2;
        targetX = x * 0.3;
        targetY = y * 0.1;
    }
}, { passive: true });

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Gliding effetto
    scene.rotation.y += (targetX - scene.rotation.y) * 0.002;
    scene.rotation.x += (targetY - scene.rotation.x) * 0.002;

    spheres.forEach(s => {
        s.rotation.x += 0.005;
        s.rotation.y += 0.005;
    });

    renderer.render(scene, camera);
}
animate();

// Animazioni del testo
gsap.to("h1", { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
gsap.to("p", { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power3.out" });
gsap.to(".btn", { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" });

// Resize reattivo
window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});




$(document).ready(function () {
    const colors = ["#0071ff", "#00ff77", "#ff5e00"];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function updateButtonEffect(e, $btn) {
        const offset = $btn.offset();
        const relX = (e.pageX || e.originalEvent.touches[0].pageX) - offset.left;
        const relY = (e.pageY || e.originalEvent.touches[0].pageY) - offset.top;

        const color = getRandomColor();
        const $span = $btn.find("span");

        // Posizionamento
        $span.css({
            top: relY,
            left: relX,
            backgroundColor: color
        });
    }

    // Mouse
    $(".btn").on("mouseenter mouseout", function (e) {
        updateButtonEffect(e, $(this));
    });

    // Touch (mobile)
    $(".btn").on("touchstart", function (e) {
        updateButtonEffect(e, $(this));
    });
});







gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".effect").forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: "top 50%",    // quando l'elemento entra nello schermo
        end: "center 39%",      // quando esce completamente
        onEnter: () => gsap.to(el, { opacity: 1, duration: 0.5, ease: "power2.out", pointerEvents: "auto" }),
        onLeave: () => gsap.to(el, { opacity: 0, duration: 0.5, ease: "power2.in", pointerEvents: "none" }),
        onEnterBack: () => gsap.to(el, { opacity: 1, duration: 0.5, ease: "power2.out", pointerEvents: "auto" }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, duration: 0.5, ease: "power2.in", pointerEvents: "none" }),
    });
});