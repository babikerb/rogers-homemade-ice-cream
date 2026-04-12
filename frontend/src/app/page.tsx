"use client";

import {
  AccessTime,
  Directions,
  Instagram,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_BLUE = "#3AB0FF";
const LOGO_PINK = "#FF99AA";
const DEEP_PINK = "#D81B60";
const WAFFLE_BROWN = "#5D3A1A";
const OFF_WHITE = "#FAF9F6";

const CORE_FLAVORS = [
  "Vanilla",
  "Chocolate Oreo",
  "Strawberry Cheesecake",
  "Taro",
  "Fruity Pebbles",
  "Mint Chip",
  "Cookie Dough",
  "Butter Pecan",
];

const getFormattedDate = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const dateStr = now.toLocaleDateString("en-US", options);

  const day = now.getDate();
  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${dateStr}${suffix}`;
};

const getStatus = (openMinutes: number, closeMinutes: number) => {
  const now = new Date();
  const pstDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
  );
  const currentMinutes = pstDate.getHours() * 60 + pstDate.getMinutes();
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes
    ? { text: "OPEN NOW", color: "#2E7D32", active: true }
    : { text: "CLOSED", color: "#C62828", active: false };
};

const formatMinuteTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}:00${ampm}` : `${hour}:${String(m).padStart(2, "0")}${ampm}`;
};

export default function RogersHomemade() {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [shop, setShop] = useState<{ street: String, city: String, state: String, phone_number: String, instagram: String, open_time: number; close_time: number } | null>(null);
  const [flavorCount, setFlavorCount] = useState<number>(10);
  const [status, setStatus] = useState<{
    text: string;
    color: string;
    active: boolean;
  } | null>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [mounted, setMounted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
    if (shop?.open_time) {
      setStatus(getStatus(shop?.open_time, shop?.close_time));
    }
    setCurrentDate(getFormattedDate());
    const timer = setInterval(() => {
      if (shop?.open_time) {
        setStatus(getStatus(shop?.open_time, shop?.close_time));
      }
      setCurrentDate(getFormattedDate());
    }, 60000);
    return () => clearInterval(timer);
  }, [shop]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/shop/1")
      .then((res) => res.json())
      .then((data) => {
        setShop({
          street: data.shop.street,
          city: data.shop.city,
          state: data.shop.state,
          phone_number: data.shop.phone_number,
          instagram: data.shop.instagram,
          open_time: data.shop.open_time,
          close_time: data.shop.close_time,
        });
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/flavors/count")
      .then((res) => res.json())
      .then((data) => {
        setFlavorCount(data.flavor_count);
      });
  }, []);

  if (!mounted) return null;

  // uses the place search endpoint which is free for simple iframes (no need for api key)
  const mapSearchUrl = `https://maps.google.com/maps?q=Rogers%20Homemade%20Ice%20Cream%20Orange%20CA&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        overflowY: "auto",
        scrollSnapType: isMobile ? "none" : "y mandatory",
        bgcolor: OFF_WHITE,
        color: WAFFLE_BROWN,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* HERO */}
      <Box
        component="section"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          scrollSnapAlign: "start",
          textAlign: "center",
          px: 3,
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha(LOGO_BLUE, 0.1)} 100%)`,
        }}
      >
        <Box
          sx={{
            width: { xs: "280px", md: "500px" },
            height: { xs: 180, md: 300 },
            position: "relative",
            mb: 2,
          }}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>

        <Stack spacing={2} alignItems="center" sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "white",
              px: 3,
              py: 1,
              borderRadius: "50px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: status?.color,
                borderRadius: "50%",
                animation: status?.active ? "pulse 2s infinite" : "none",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: `0 0 0 0 ${alpha(status?.color || "#000", 0.7)}`,
                  },
                  "70%": {
                    boxShadow: `0 0 0 10px ${alpha(status?.color || "#000", 0)}`,
                  },
                  "100%": {
                    boxShadow: `0 0 0 0 ${alpha(status?.color || "#000", 0)}`,
                  },
                },
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 900, color: status?.color, letterSpacing: 1.5 }}
            >
              {status?.text}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: LOGO_BLUE,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                mb: 0.5,
              }}
            >
              {currentDate}
            </Typography>
            <Typography
              sx={{
                color: WAFFLE_BROWN,
                fontWeight: 700,
                fontSize: { xs: "1.4rem", md: "1.8rem" },
              }}
            >
              {shop
                ? `${formatMinuteTime(shop.open_time)} — ${formatMinuteTime(shop.close_time)}`
                : "Loading..."}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            sx={{
              bgcolor: LOGO_BLUE,
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontWeight: 900,
              boxShadow: `0 4px 14px ${alpha(LOGO_BLUE, 0.4)}`,
              "&:hover": { bgcolor: "#2990D6" },
            }}
          >
            EXPLORE MENU
          </Button>

          <Button
            variant="contained"
            href="https://www.google.com/maps/dir//Rogers+Homemade+Ice+Cream,+1510+E+Lincoln+Ave,+Orange,+CA+92865"
            target="_blank"
            startIcon={<Directions />}
            sx={{
              bgcolor: WAFFLE_BROWN,
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontWeight: 900,
              boxShadow: `0 4px 14px ${alpha(WAFFLE_BROWN, 0.4)}`,
              "&:hover": { bgcolor: "#4A2E15" },
            }}
          >
            DIRECTIONS
          </Button>

          <Button
            variant="outlined"
            href={`https://www.instagram.com/${shop?.instagram}/`}
            disabled={!shop}
            target="_blank"
            startIcon={<Instagram />}
            sx={{
              borderColor: DEEP_PINK,
              borderWidth: "2px",
              color: DEEP_PINK,
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontWeight: 900,
              "&:hover": {
                borderWidth: "2px",
                bgcolor: alpha(DEEP_PINK, 0.05),
                borderColor: DEEP_PINK,
              },
            }}
          >
            INSTAGRAM
          </Button>
        </Stack>
      </Box>

      {/* OUR STORY */}
      <Box
        id="about"
        component="section"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          scrollSnapAlign: "start",
          bgcolor: "white",
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={8}
            alignItems="center"
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: LOGO_PINK,
                  fontWeight: 900,
                  letterSpacing: 2,
                  mb: 2,
                }}
              >
                PREMIUM INGREDIENTS
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.1,
                  mb: 4,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                }}
              >
                Homemade <br />{" "}
                <span style={{ color: LOGO_BLUE }}>In {shop?.city}, {shop?.state}.</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                  opacity: 0.9,
                  mb: 4,
                }}
              >
                We believe in the art of the scoop. Every batch is made right in
                our kitchen using original recipes and the finest dairy.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: OFF_WHITE,
                  borderLeft: `8px solid ${LOGO_PINK}`,
                }}
              >
                <Typography variant="h5" fontWeight={900} mb={2}>
                  {flavorCount - (flavorCount % 10)}+ Flavors
                </Typography>
                <Typography sx={{ lineHeight: 1.6 }}>
                  From classic Vanilla Bean to our signature Taro and Fruity
                  Pebbles, there is a masterpiece for every palate.
                </Typography>
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* MENU */}
      <Box
        id="menu"
        component="section"
        sx={{ py: 15, scrollSnapAlign: "start", bgcolor: OFF_WHITE }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" textAlign="center" fontWeight={900} mb={1}>
            MENU
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color={WAFFLE_BROWN}
            mb={6}
          >
            Click on a flavor to see details! Note: not all flavors are
            implemented here right now.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {CORE_FLAVORS.map((flavor) => (
              <Paper
                key={flavor}
                component="button"
                onClick={() => setSelectedFlavor(flavor)}
                sx={{
                  all: "unset",
                  cursor: "pointer",
                  bgcolor: "white",
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  border: `1px solid ${alpha(WAFFLE_BROWN, 0.1)}`,
                  transition: "0.3s",
                  "&:hover": {
                    borderColor: LOGO_BLUE,
                    transform: "translateY(-5px)",
                    boxShadow: `0 10px 20px ${alpha(LOGO_BLUE, 0.1)}`,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight={900}>
                  {flavor.toUpperCase()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: LOGO_PINK, fontWeight: 800 }}
                >
                  SIGNATURE
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          scrollSnapAlign: "end",
          py: 10,
          bgcolor: "white",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 8,
                  bgcolor: OFF_WHITE,
                  border: `1px solid ${alpha(WAFFLE_BROWN, 0.1)}`,
                }}
              >
                <Typography variant="h3" fontWeight={900} mb={1}>
                  Visit Us
                </Typography>
                <Typography
                  variant="h6"
                  color={LOGO_BLUE}
                  fontWeight={800}
                  mb={6}
                >
                  COME GET A SCOOP
                </Typography>

                <Stack spacing={4}>
                  <Stack direction="row" spacing={3}>
                    <LocationOn sx={{ color: LOGO_PINK }} />
                    <Box>
                      <Typography fontWeight={900}>ADDRESS</Typography>
                      <Typography>1510 E Lincoln Ave, Orange, CA</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <AccessTime sx={{ color: LOGO_PINK }} />
                    <Box>
                      <Typography fontWeight={900}>HOURS</Typography>
                      <Typography>Daily: 12:00pm - 9:00pm</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <Phone sx={{ color: LOGO_PINK }} />
                    <Box>
                      <Typography fontWeight={900}>GET IN TOUCH</Typography>
                      <Typography>(657) 335-9987</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Box>

            <Box
              sx={{
                flex: 1.5,
                minHeight: 450,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: 4,
              }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={mapSearchUrl}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* MENU MODAL (PER FLAVOR) */}
      <Modal open={!!selectedFlavor} onClose={() => setSelectedFlavor(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "white",
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            outline: "none",
            boxShadow: 24,
          }}
        >
          <Typography variant="h4" fontWeight={900} color={LOGO_BLUE} mb={2}>
            {selectedFlavor}
          </Typography>
          <Typography mb={4}>
            Homemade daily in small batches for the perfect texture and flavor.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: WAFFLE_BROWN }}
            onClick={() => setSelectedFlavor(null)}
          >
            CLOSE
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
