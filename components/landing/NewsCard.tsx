"use client";

import { Card, Flex, Text, Button, Box } from "@radix-ui/themes";

type NewsCardProps = {
  title: string;
  date: string;
  actionLabel?: string;
};

export function NewsCard({
  title,
  date,
  actionLabel = "Подробнее",
}: NewsCardProps) {
  return (
    <Card
      size="2"
      variant="surface"
      style={{
        padding: 10,

        width: "100%",
      }}
    >
    <Flex direction="column" gap="3">
        <Text size="2" weight="light">
          {title}
        </Text>
    
         
    <Box 
    >
      <Flex justify="between" align="center" >
        <Text size="1" weight="light" color="gray"
        >
          {date}

        </Text>

        <Button
          size="1"
          variant="outline"
          color="gray"
        >
            {actionLabel}
          </Button>
          
        </Flex>
      </Box>
      </Flex>
    </Card>
  );
}
