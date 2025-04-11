import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Center,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import Confetti from "react-confetti";

// 3D Model Loader Component
function FlowerModel(props) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/flower.glb");

  useEffect(() => {
    // Ensure materials are properly loaded
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Preload the model
useGLTF.preload(process.env.PUBLIC_URL + "/flower.glb");

function Scene() {
  const cameraRef = React.useRef();
  const [isAnimating, setIsAnimating] = useState(true);

  useFrame(() => {
    if (!isAnimating || !cameraRef.current) return;

    // Smoothly animate camera position
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      1.5,
      0.02
    );
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      0.5,
      0.02
    );

    // Stop animation when close enough
    if (Math.abs(cameraRef.current.position.z - 1.5) < 0.01) {
      setIsAnimating(false);
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 1.5, 5]}
        fov={35}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Environment preset="studio" />
      <Center scale={1.2}>
        <FlowerModel
          scale={[0.4, 0.4, 0.4]}
          position={[0, -0.5, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </Center>
      <OrbitControls
        makeDefault
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        enableZoom={true}
        enablePan={false}
        minDistance={0.9}
        maxDistance={6}
      />
    </>
  );
}

export default function BirthdayFlowerPot() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#2D1B3E" }}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowIntro(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #FF69B4, #FF1493)",
              color: "white",
              fontFamily: "Arial, sans-serif",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={200}
              recycle={true}
              colors={[
                "#FFB6C1",
                "#FF69B4",
                "#FF1493",
                "#FFE4E1",
                "#FFF0F5",
                "#gold",
              ]}
            />

            <motion.img
              src={process.env.PUBLIC_URL + "/birthday-cake-animated.gif"}
              alt="Birthday Cake"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{
                width: "200px",
                marginBottom: "2rem",
                borderRadius: "15px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            />

            <motion.div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "2rem 3rem",
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <motion.h1
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                style={{
                  fontSize: "3.5rem",
                  marginBottom: "1rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  background: "linear-gradient(45deg, #fff, #FFE4E1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Happy 21st Birthday
              </motion.h1>
              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "4.5rem",
                  background: "linear-gradient(45deg, #FFE4E1, #FFF0F5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                Ananya!
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "2rem",
                fontSize: "1.2rem",
                opacity: 0.9,
                background: "rgba(255,255,255,0.1)",
                padding: "0.8rem 1.5rem",
                borderRadius: "30px",
                backdropFilter: "blur(5px)",
              }}
            >
              Tap anywhere to continue
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="flower"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Canvas shadows>
              <Scene />
            </Canvas>

            {/* Click & Hold Instructions */}
            <div
              style={{
                position: "absolute",
                bottom: "50%", // Center vertically
                right: "20px", // Position on the right side
                transform: "translateY(50%)", // Center vertically
                color: "#ffffff", // Changed to white for better visibility on purple background
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                userSelect: "none",
                zIndex: 10,
                padding: "15px",
                background: "rgba(0,0,0,0.2)", // Semi-transparent background
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                click & hold
              </div>
              <div style={{ fontSize: "16px" }}>to rotate</div>
            </div>

            {/* Letter Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => setShowLetter(true)}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "49%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "40px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                padding: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  color: "#FF69B4",
                }}
              >
                💌
              </div>
            </motion.div>

            {/* Letter Modal */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20,
                    padding: "20px",
                    backdropFilter: "blur(8px)",
                  }}
                  onClick={() => setShowLetter(false)}
                >
                  <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    style={{
                      background: "#ffffff",
                      padding: "80px 50px",
                      borderRadius: "20px",
                      maxWidth: "700px",
                      width: "95%",
                      maxHeight: "80vh",
                      position: "relative",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,105,180,0.2)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setShowLetter(false)}
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "25px",
                        background: "rgba(255,105,180,0.1)",
                        border: "none",
                        fontSize: "28px",
                        cursor: "pointer",
                        color: "#FF69B4",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        transition: "all 0.3s ease",
                        zIndex: 2,
                      }}
                    >
                      ×
                    </button>
                    <div
                      style={{
                        overflowY: "auto",
                        flex: 1,
                        paddingRight: "20px",
                        marginRight: "-20px", // Compensate for padding
                        // Customize scrollbar
                        scrollbarWidth: "thin",
                        scrollbarColor: "#FF69B4 #f0f0f0",
                      }}
                    >
                      <h2
                        style={{
                          color: "#FF1493",
                          marginBottom: "50px",
                          fontSize: "48px",
                          textAlign: "center",
                          fontFamily: "'Brush Script MT', cursive",
                          textShadow: "2px 2px 4px rgba(255,105,180,0.2)",
                          position: "sticky",
                          top: 0,
                          backgroundColor: "white",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          zIndex: 1,
                        }}
                      >
                        Dear Ananya,
                      </h2>
                      <div
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,105,180,0.1) 1px, transparent 1px)",
                          backgroundSize: "100% 2em",
                          paddingTop: "10px",
                        }}
                      >
                        <p
                          style={{
                            lineHeight: "2.2",
                            color: "#000000",
                            marginBottom: "40px",
                            fontSize: "24px",
                            fontFamily: "'Segoe UI', Arial, sans-serif",
                            letterSpacing: "0.3px",
                            textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
                          }}
                        >
                          Hi Ananya. Happy 21st Birthday. I realllllllly wish I
                          was celebrating with you and can't believe I am
                          missing this. The last time I wrote a letter on your
                          birthday it was for your 19th birthday and honestly
                          then I saw you as my best friend and really saw more
                          than that. Up to that point, I had never met someome
                          that made my smile be so wide on my face everytime I
                          saw you. Honeslty, I was very scared of our future
                          then just thinking of if I would ever have to go a day
                          where me and you are just strangers. Now I am writing
                          this knowing you are my soul mate and the love of my
                          life. I picture us graduating together. I picture us
                          going on a vacation after we finish school. I picture
                          us visiting each others work. I picture us moving in
                          together or hopefully being very close by after we
                          gradute. I picture us making new friends together. I
                          picture us marrying I picture us marrying, buying our
                          own house, going on family vacation and growing old
                          together. I was alwasy excited about life, but never
                          like this, knowing I will be going with it with my
                          bestfriend, my other half to go on an adventure with.
                          I just think of all of the fun things that we are
                          going to do. These last 4 months have been really hard
                          for me honestly. This is the first time I feel lonely
                          in my life even though I am surrounded with so many
                          people all the time. The only thing that gets me
                          through is seeing or hearing your voice.
                        </p>
                        {/* Add more paragraphs here and they'll be scrollable */}
                      </div>
                      <p
                        style={{
                          textAlign: "right",
                          color: "#FF1493",
                          fontStyle: "italic",
                          marginTop: "60px",
                          marginBottom: "40px",
                          fontSize: "32px",
                          fontFamily: "'Brush Script MT', cursive",
                          textShadow: "1px 1px 2px rgba(255,105,180,0.1)",
                        }}
                      >
                        With love and best wishes ❤️
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
