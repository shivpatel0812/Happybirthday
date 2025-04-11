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

function FlowerModel(props) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/flower.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload(process.env.PUBLIC_URL + "/flower.glb");

function Scene() {
  const cameraRef = React.useRef();
  const [isAnimating, setIsAnimating] = useState(true);

  useFrame(() => {
    if (!isAnimating || !cameraRef.current) return;

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

            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              onClick={() => setShowIntro(true)}
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "16px",
                color: "#FF69B4",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                zIndex: 10,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.9)";
              }}
            >
              ← Back
            </motion.button>

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
                        marginRight: "-20px",

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
                          Hi Ananya. Happy 21st Birthday my love. I realllllllly
                          wish I was celebrating with you in Singapore and can't
                          believe I am missing this. I miss my beautiful
                          girlfriend. There is not a single person in the world
                          like you. I miss your glowing and soft skin. Your
                          beautiful curly hair. Your precious and calm voice and
                          your funny jokes that make me laught non stop. I miss
                          the flowerly scent I would smell on your neck and
                          chest everytime we would cuddle. I miss seeing you
                          from a distance and walking towards each other and
                          having the biggest excitement ever to meet you. I wish
                          I could hug you right now holding your gorgeous self.
                          Everytime I hold you, I instantly feel this hot
                          adrenaline inside going through everywhere single
                          time. I have loved every single part of this
                          relationship. I know we have had a lot of downs, but I
                          feel like everytime we go down, we come back stronger.
                          I just have so many favorite moments of us that
                          everytime I try to think, more and more pop up.
                          Whether it was the first time me and you talked in our
                          room or the NLE concert or midsummers or the time we
                          went to Tiki Tai on a date or both of your previous
                          birthdays or the last good bye I had before you left,
                          every moment with you has been nothing but perfect.
                          The last time I wrote a letter on your birthday it was
                          for your 19th birthday and even though our
                          relationship was in an akward phase, I still saw you
                          as my best friend and felt inside in a way I had never
                          about another person. Up to that point, I had never
                          met someome that put a smile so wide on my phase.
                          Really looking back at it, while I was writing that
                          letter, it was the moment where I really felt I was so
                          in love. A feeling in my heart emerged that I never
                          felt before. Honeslty throughout our first year, I was
                          very scared of our future particuarly thinking what if
                          me and you just ended up as strangers. Everytime I
                          thought of that I would just feel so sick inside
                          hoping that I would never be in that type of
                          situation. Now I am writing this knowing you are my
                          soul mate and the love of my life. I picture us
                          graduating together. I picture us going on a vacation
                          after we finish school. I picture us visiting each
                          others work. I picture us moving in together or
                          hopefully being very close by after we gradute. I
                          picture us making new friends together. I picture us
                          marrying, buying our own house, going on family
                          vacation, test driving a car, and growing old
                          together. I was alwasy excited about life, but never
                          like this, knowing I will exploring it with my
                          bestfriend, my other half, my love. I just think of
                          all of the fun things and adventures we are going to
                          do. I imagine us traveling and building the most
                          unquie experiences. These last 4 months have been
                          really hard for me honestly. This is the first time I
                          feel lonely in my life even though I am surrounded
                          with so many people all the time. The only thing that
                          gets me through is seeing or hearing your voice. I
                          can't tell you how excited I am to see you back.
                          However, seeing you smile in your birthday video made
                          me feel so happy. The only thing I want in this world
                          is for you to be happy. The only thing that I want is
                          for you to enjoy every second of my life. I still
                          can't beleive you are 21. It literally feels like
                          yesterday that I met you on the side of Mccormick
                          seeing your extremely cute smile for the first time
                          and instanlty thinking "WOW she is CUTE". I can't even
                          imagine how my life would be if maybe we never met or
                          if we never became close. You have literally built me
                          into the person I am today. You make me feel so
                          confident and make me feel like I am the only guy in
                          the whole world. You asked about how I got more mature
                          throughout the years and the truth is, all that is the
                          influence you give on me. I can say out of all of my
                          friends, you influence and make me into the best
                          possible person I can be. I would be a completely
                          differnet person if it weren't for you. Who knows I
                          might still be pre - med hehe. Happy Birthday again
                          Ananya! I want you to wish for you to accomplish
                          anything in life that you want and for you to have a
                          smile on your face forever. After you birthday party
                          you told me how you really felt that life is great and
                          I hope that every single day in your future is like
                          that. I really miss you and really can not wait till
                          your back. I miss the late night conversations we used
                          to have. Ever since first year we can literally be up
                          till 4 or 5 am just talking. I remeber we used to go
                          to our 8 am regression 4 hours of sleep because we
                          would stay up so late. I miss us cuddling on bed non
                          stop forever. I miss the tension between us when we
                          would be in our room where we both knew what was about
                          to happen but would just always try to make it seem so
                          natural. I miss when the lights are off, blank on top,
                          and everything off at 2 am where I just feel like my
                          heart is burning out of pure love. I miss just the
                          staring into each other eyes, where there is no
                          talking just feeling the love. I know I make a lot of
                          mistakes in this relationship and there are moments
                          that I know I should have been better. I really am
                          trying to learn and be the best possible boyfriend,
                          partner, and make you the happiest person in the
                          world. I hope you accomplish everything you want in
                          life and in the end of it are happy and have no
                          regrets. I love you Ananya. I just really wanted you
                          to have a letter that you could keep forever and see
                          anytime so that is why I created this website. I hope
                          you like it!!
                        </p>
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
