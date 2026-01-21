"use client";

import { Box, Flex, Text, Button, Switch } from "@radix-ui/themes";
import { useThemeMode } from "@/components/theme/ThemeProvider";
import styles from "./Footer.module.css";

export default function Footer() {
  const { mode, toggle } = useThemeMode();

  return (
    <footer style={{ width: "100%" }}>
      <Box
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <Flex className={styles.footerInner}>
          {/* LEFT */}
          <Flex
            className={styles.footerLeft}
            align="center"
            gap="3"
          >
            <Text size="1" weight="light" color="lime">
              Ночной режим
            </Text>
            <Switch
              checked={mode === "dark"}
              onCheckedChange={toggle}
              size="1"
            />
          </Flex>

          <Box style={{ flexGrow: 1 }} />

          {/* CENTER */}
          <Flex
            className={styles.footerCenter}
            align="center"
            gap="5"
          >
            <Button size="1" variant="ghost" color="lime">
              Пользовательское соглашение
            </Button>
            <Button size="1" variant="ghost" color="lime">
              Политика конфиденциальности
            </Button>
            <Button size="1" variant="ghost" color="lime">
              Обратная связь
            </Button>
            <Button size="1" variant="ghost" color="lime">
              Новости
            </Button>
            <Button size="1" variant="ghost" color="lime">
              О проекте
            </Button>
          </Flex>

          <Box style={{ flexGrow: 1 }} />

          {/* RIGHT */}
          <Text
            className={styles.footerRight}
            size="1"
            weight="light"
            color="lime"
          >
            © SwampHouse, 2025
          </Text>
        </Flex>
      </Box>
    </footer>
  );
}
