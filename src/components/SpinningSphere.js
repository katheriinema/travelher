import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SpinningSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFEBF4"); // Set to match the lighter pink

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load Texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
      "/assets/logo.png",
      () => console.log("Texture loaded successfully"),
      undefined,
      (err) => console.error("Error loading texture:", err)
    );

    // Adjust texture wrapping to avoid stretching
    logoTexture.wrapS = THREE.RepeatWrapping; // Wrap horizontally
    logoTexture.repeat.set(2, 1); // Repeat the texture horizontally twice

    // Sphere Geometry and Material
    const geometry = new THREE.SphereGeometry(2, 64, 64); // Larger sphere
    const material = new THREE.MeshStandardMaterial({
      map: logoTexture,
      metalness: 0.0, // Remove metallic reflections
      roughness: 0.0, // Make it smooth
      emissive: new THREE.Color(0xffffff), // Brighten the texture
      emissiveIntensity: 0.5, // Adjust brightness
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Brighter ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // Animation loop (slower spinning)
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the sphere slowly
      sphere.rotation.y += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "400px", // Adjust height as needed
        margin: "0 auto",
      }}
    />
  );
};

export default SpinningSphere;
