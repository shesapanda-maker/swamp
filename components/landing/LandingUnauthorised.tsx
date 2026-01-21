"use client";

import { Box, Flex, Button, Heading, Text, Card } from "@radix-ui/themes";

import { useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import styles from "./LandingUnauthorised.module.css";
import { NewsCard } from "@/components/landing/NewsCard";
import Footer from "@/components/layout/Footer";


export default function LandingUnauthorised() {
  useEffect(() => {
    const bg = document.getElementById("hero-bg");
    if (!bg) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const offset = Math.min(scrolled * 0.7, 120);
      bg.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <main>
        {/* NAV */}
        <NavBar />

      {/* HERO */}
      
      <Box
      className={styles.hero}
        style={{
          position: "relative",
          height: 540,
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          overflow: "hidden",
        }}
      >
        {/* background */}
        <Box
          id="hero-bg"
          style={{
            position: "absolute",
            top: "-10%",
            left: 0,
            width: "100%",
            height: "120%",
            backgroundImage: "url('/images/boloto.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            willChange: "transform",
          }}
        />

        {/* overlay */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(28, 32, 36, 0.15)",
            pointerEvents: "none",
          }}
        />

        {/* CONTENT CONTAINER */}
        <Box className="container" style={{ height: "100%", position: "relative", zIndex: 1 }}>
          <Flex
          className={styles.heroContent}
            direction="column"
            justify="end"
            align="start"
            gap="4"
            style={{
              height: "100%",
              paddingTop: 140,
              paddingBottom: 200,
            }}
          >
            <Heading
              as="h1"
              size="9"
              weight="light"
              className={styles.heroTitle}
              style={{ maxWidth: 589, color: "#FCFDFA" }}
            >
              ДОМ НА БОЛОТЕ
            </Heading>

            <Heading
              as="h3"
              size="5"
              weight="light"
              className={styles.heroSubtitle}
              style={{ maxWidth: 589, color: "#FCFDFA" }}
            >
              Место, где живут любимые истории и создаются новые миры
            </Heading>

            <Text
              size="2"
              weight="light"
              className={styles.heroText}
              style={{ maxWidth: 520, color: "#FCFDFA" }}
            >
              Это некоммерческий проект, созданный и поддерживаемый силами небольшой группы энтузиастов.
            </Text>

            <Box style={{ flexGrow: 1 }} />

            <Button
              size="4"
              variant="ghost"
              color="gray"
              className={styles.heroOutlineButton}
            >
              О проекте
            </Button>
          </Flex>
        </Box>
      </Box>


        {/* MAIN BLOCKS */}
        <Box >
          <Flex
            className={styles.mainGrid}
            gap="9"
            style={{
              maxWidth: 1152,
              margin: "0 auto",
              padding: "48px 24px",
            }}
          >
            {/* NEWS */}
            <Box style={{ flex: 1 }}>
              <Flex direction="column" gap="4">

              {/* HEADER + ACTION */}
              <Flex justify="between" align="center">
              <Heading size="5">Новости</Heading>
              <Button size="2" variant="ghost" color="gray">Читать все новости</Button>
                </Flex>
                  
                <Flex direction="column" gap="3">
                    <NewsCard
                      title="Обновление платформы, теперь она еще лучше и еще прекраснее, хотя казалось бы куда еще. Здесь все и так прекрасно, здорово, великолепно"
                      date="12 сентября 2025"
                    />

                    <NewsCard
                      title="Мы запустились 🎉"
                      date="5 сентября 2025"
                    />
                  </Flex>
              </Flex>
            </Box>

    {/* INVITE */}
    <Box style={{ flex: 1 }}>
      <Flex direction="column" gap="4">
        <Heading size="5">Хотите присоединиться?</Heading>

    <Card
      size="2"
      variant="surface"
    >
      <Flex direction="column" gap="4">
        <Text size="2" color="gray">
          Работы на этом сайте можно читать без регистрации. 
          Если вы хотите публиковать свои работы или оставлять 
          комментарии к чужим, вам необходимо зарегистрироваться. 

          По техническим причинам пока это можно сделать 
          только по приглашению. 
        </Text>

        <Button
          size="2"
          color="lime"
          style={{
            alignSelf: "flex-start",
            "--accent-9": "var(--lime-11)",
            "--accent-10": "var(--lime-12)",
            "--accent-11": "var(--lime-11)",
            "--accent-12": "var(--lime-12)",
            color: "var(--lime-1)",
          } as React.CSSProperties}
        >
          Запросить приглашение
        </Button>
      </Flex>
    </Card>
  </Flex>
</Box>

  </Flex>
</Box>

 {/*Spacer*/}
     

      </main>

    <Box style={{ flexGrow: 1 }} />
  
    {/* FOOTER */}
        <Footer />
    </Box>
  );
}

