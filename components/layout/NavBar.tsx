"use client";

import { Box, Flex, Button } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { SwampHouseLogo } from "@/components/icons/SwampHouseLogo";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      {/* LOGO */}
      <Link href="/" aria-label="Go to homepage">
        <Box className={styles.logo}>
          <SwampHouseLogo />
        </Box>
      </Link>

      {/* DESKTOP MENU — геометрия как раньше */}
      <div className={styles.desktopMenu}>
        <Flex gap="3" align="end">
          <Button size="2" variant="outline" color="lime">Фандомы</Button>
          <Button size="2" variant="outline" color="lime">Авторы</Button>
          <Button size="2" variant="outline" color="lime">Работы</Button>
          <Button size="2" variant="outline" color="lime">Расширенный поиск</Button>
        </Flex>
      </div>

      {/* DESKTOP CTA — геометрия как раньше */}
      <div className={styles.desktopCta}>
        <Button
          size="2"
          variant="solid"
          color="lime"
          style={{
            "--accent-9": "var(--lime-11)",
            "--accent-10": "var(--lime-12)",
            "--accent-11": "var(--lime-11)",
            "--accent-12": "var(--lime-12)",
            color: "var(--lime-1)",
          } as React.CSSProperties}
        >
          Войти
        </Button>
      </div>

      {/* BURGER */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={styles.burger} aria-label="Open menu">
            ☰
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.mobileMenu}>
            <Dialog.Close asChild>
              <button className={styles.close}>×</button>
            </Dialog.Close>

            <Flex direction="column" gap="4">
              <Button variant="ghost">Фандомы</Button>
              <Button variant="ghost">Авторы</Button>
              <Button variant="ghost">Работы</Button>
              <Button variant="ghost">Расширенный поиск</Button>

              <Button variant="solid" color="lime">Войти</Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
}
