"use client";

import {
  Add,
  Delete,
  FeedbackOutlined,
  IcecreamOutlined,
  InfoOutlined,
  Logout,
  PaidOutlined,
  Save,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const API = "http://127.0.0.1:8000";
const LOGO_BLUE = "#3AB0FF";
const LOGO_PINK = "#FF99AA";
const WAFFLE_BROWN = "#5D3A1A";
const SIDEBAR_BG = "#F4F6F8";
const BORDER = "#E5E7EB";

type Owner = { owner_id: number; name: string; email: string };
type Flavor = { flavor_id: number; name: string; description: string | null };
type Category = { menu_id: number; name: string; flavors: Flavor[] };
type Price = { serving_size: string; price_amount: number };
type Shop = {
  phone_number: string;
  instagram: string;
  open_time: number;
  close_time: number;
};

const minsToTime = (m: number) =>
  `${Math.floor(m / 60).toString().padStart(2, "0")}:${(m % 60)
    .toString()
    .padStart(2, "0")}`;

const timeToMins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const getToken = () =>
  typeof window !== "undefined"
    ? (localStorage.getItem("admin_token") ?? "")
    : "";

const authFetch = (url: string, opts: RequestInit = {}) =>
  fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(opts.headers ?? {}),
    },
  });

const NAV = [
  { id: "flavors", label: "Flavors", icon: <IcecreamOutlined fontSize="small" /> },
  { id: "prices", label: "Prices", icon: <PaidOutlined fontSize="small" /> },
  { id: "shop", label: "Shop Info", icon: <InfoOutlined fontSize="small" /> },
  { id: "feedback", label: "Feedback", icon: <FeedbackOutlined fontSize="small" /> },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box id={id} sx={{ mb: 5 }}>
      <Typography
        variant="overline"
        sx={{
          fontWeight: 900,
          letterSpacing: 2,
          color: alpha(WAFFLE_BROWN, 0.45),
          display: "block",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 3, borderColor: BORDER }} />
      {children}
    </Box>
  );
}

function FlavorsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCat, setActiveCat] = useState(0);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(() => {
    authFetch(`${API}/admin/flavors`)
      .then((r) => r.json())
      .then((d) => setCategories(d.categories));
  }, []);

  useEffect(() => { load(); }, [load]);

  const addFlavor = async () => {
    if (!newName.trim() || !categories[activeCat]) return;
    const res = await authFetch(`${API}/flavors`, {
      method: "POST",
      body: JSON.stringify({
        menu_name: categories[activeCat].name,
        name: newName.trim(),
        description: newDesc.trim() || null,
      }),
    });
    if (res.ok) { setNewName(""); setNewDesc(""); setSuccess("Flavor added."); load(); }
    else setError("Failed to add flavor.");
  };

  const deleteFlavor = async (flavor_id: number) => {
    const res = await authFetch(`${API}/flavors/${flavor_id}`, { method: "DELETE" });
    if (res.ok) { setSuccess("Flavor removed."); load(); }
    else setError("Failed to delete flavor.");
  };

  const category = categories[activeCat];

  return (
    <>
      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess("")} sx={{ mb: 2 }}>{success}</Alert>}

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper variant="outlined" sx={{ flex: 1.5, p: 3, borderRadius: 3, borderColor: BORDER }}>
          <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
            {categories.map((cat, i) => (
              <Chip
                key={cat.menu_id}
                label={`${cat.name} (${cat.flavors.length})`}
                onClick={() => setActiveCat(i)}
                size="small"
                sx={{
                  fontWeight: 800,
                  bgcolor: activeCat === i ? LOGO_BLUE : "white",
                  color: activeCat === i ? "white" : WAFFLE_BROWN,
                  border: `1px solid ${activeCat === i ? LOGO_BLUE : BORDER}`,
                }}
              />
            ))}
          </Stack>

          {category && (
            category.flavors.length === 0 ? (
              <Typography color={alpha(WAFFLE_BROWN, 0.35)} fontStyle="italic" fontSize={14}>
                No flavors yet.
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {category.flavors.map((f) => (
                  <Chip
                    key={f.flavor_id}
                    label={f.name}
                    onDelete={() => deleteFlavor(f.flavor_id)}
                    deleteIcon={<Delete sx={{ fontSize: 14 }} />}
                    size="small"
                    sx={{ bgcolor: alpha(LOGO_BLUE, 0.07), fontWeight: 700, fontSize: 12 }}
                  />
                ))}
              </Box>
            )
          )}
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 3, borderRadius: 3, borderColor: BORDER }}>
          <Typography fontWeight={800} mb={2} fontSize={14} color={WAFFLE_BROWN}>
            Add to {category?.name}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Flavor Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              size="small"
              fullWidth
            />
            <TextField
              label="Description (optional)"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              size="small"
              fullWidth
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addFlavor}
              disabled={!newName.trim()}
              size="small"
              sx={{ bgcolor: LOGO_BLUE, fontWeight: 900, borderRadius: "50px", alignSelf: "flex-start", "&:hover": { bgcolor: "#2990D6" } }}
            >
              Add Flavor
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

function PricesSection() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [editAmounts, setEditAmounts] = useState<Record<string, string>>({});
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(() => {
    fetch(`${API}/prices`).then((r) => r.json()).then((d) => {
      setPrices(d.prices);
      const init: Record<string, string> = {};
      d.prices.forEach((p: Price) => { init[p.serving_size] = p.price_amount.toFixed(2); });
      setEditAmounts(init);
    });
  }, []);

  useEffect(() => { load(); }, [load]);

  const updatePrice = async (serving_size: string) => {
    const amount = parseFloat(editAmounts[serving_size]);
    if (isNaN(amount)) return;
    const res = await authFetch(`${API}/prices/${encodeURIComponent(serving_size)}`, {
      method: "PUT",
      body: JSON.stringify({ price_amount: amount }),
    });
    if (res.ok) { setSuccess("Price updated."); load(); }
    else setError("Failed to update price.");
  };

  const deletePrice = async (serving_size: string) => {
    const res = await authFetch(`${API}/prices/${encodeURIComponent(serving_size)}`, { method: "DELETE" });
    if (res.ok) { setSuccess("Price tier deleted."); load(); }
    else setError("Failed to delete.");
  };

  const addPrice = async () => {
    if (!newSize.trim() || !newPrice) return;
    const amount = parseFloat(newPrice);
    if (isNaN(amount)) return;
    const res = await authFetch(`${API}/prices`, {
      method: "POST",
      body: JSON.stringify({ serving_size: newSize.trim(), price_amount: amount }),
    });
    if (res.ok) { setNewSize(""); setNewPrice(""); setSuccess("Price tier added."); load(); }
    else setError("Failed to add price tier.");
  };

  return (
    <>
      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess("")} sx={{ mb: 2 }}>{success}</Alert>}

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Paper variant="outlined" sx={{ flex: 2, borderRadius: 3, borderColor: BORDER, overflow: "hidden" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 140px 80px", px: 3, py: 1.5, bgcolor: SIDEBAR_BG, borderBottom: `1px solid ${BORDER}` }}>
            <Typography fontSize={12} fontWeight={800} color={alpha(WAFFLE_BROWN, 0.5)} letterSpacing={1}>SERVING SIZE</Typography>
            <Typography fontSize={12} fontWeight={800} color={alpha(WAFFLE_BROWN, 0.5)} letterSpacing={1}>PRICE</Typography>
            <Typography fontSize={12} fontWeight={800} color={alpha(WAFFLE_BROWN, 0.5)} letterSpacing={1}>ACTIONS</Typography>
          </Box>
          {prices.map((p, i) => (
            <Box
              key={p.serving_size}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 80px",
                alignItems: "center",
                px: 3,
                py: 1.5,
                borderBottom: i < prices.length - 1 ? `1px solid ${BORDER}` : "none",
                "&:hover": { bgcolor: alpha(LOGO_BLUE, 0.02) },
              }}
            >
              <Typography fontWeight={700} fontSize={14}>{p.serving_size}</Typography>
              <TextField
                size="small"
                type="number"
                value={editAmounts[p.serving_size] ?? ""}
                onChange={(e) => setEditAmounts((prev) => ({ ...prev, [p.serving_size]: e.target.value }))}
                sx={{ width: 110 }}
                inputProps={{ step: "0.01", min: "0" }}
              />
              <Stack direction="row">
                <IconButton onClick={() => updatePrice(p.serving_size)} sx={{ color: LOGO_BLUE }} size="small" title="Save">
                  <Save fontSize="small" />
                </IconButton>
                <IconButton onClick={() => deletePrice(p.serving_size)} sx={{ color: LOGO_PINK }} size="small" title="Delete">
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 3, borderRadius: 3, borderColor: BORDER }}>
          <Typography fontWeight={800} mb={2} fontSize={14} color={WAFFLE_BROWN}>Add Serving Size</Typography>
          <Stack spacing={2}>
            <TextField label="Serving Size" value={newSize} onChange={(e) => setNewSize(e.target.value)} size="small" fullWidth placeholder="e.g. Large Scoop" />
            <TextField label="Price ($)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} size="small" type="number" fullWidth inputProps={{ step: "0.01", min: "0" }} />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={addPrice}
              disabled={!newSize.trim() || !newPrice}
              size="small"
              sx={{ bgcolor: LOGO_BLUE, fontWeight: 900, borderRadius: "50px", alignSelf: "flex-start", "&:hover": { bgcolor: "#2990D6" } }}
            >
              Add
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

function ShopInfoSection() {
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${API}/shop/1`).then((r) => r.json()).then((data: { shop: Shop }) => {
      setOpenTime(minsToTime(data.shop.open_time));
      setCloseTime(minsToTime(data.shop.close_time));
      setPhone(data.shop.phone_number);
      setInstagram(data.shop.instagram);
    });
  }, []);

  const save = async () => {
    const res = await authFetch(`${API}/shop/1`, {
      method: "PUT",
      body: JSON.stringify({ open_time: timeToMins(openTime), close_time: timeToMins(closeTime), phone_number: phone, instagram }),
    });
    if (res.ok) setSuccess("Shop info updated.");
    else setError("Failed to update shop info.");
  };

  return (
    <>
      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess("")} sx={{ mb: 2 }}>{success}</Alert>}

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, borderColor: BORDER, maxWidth: 560 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2}>
            <TextField label="Open Time" type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Close Time" type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} />
          </Stack>
          <TextField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} size="small" fullWidth />
          <TextField label="Instagram Handle" value={instagram} onChange={(e) => setInstagram(e.target.value)} size="small" fullWidth placeholder="rogershomemadeicecream" />
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={save}
            size="small"
            sx={{ bgcolor: LOGO_BLUE, fontWeight: 900, borderRadius: "50px", alignSelf: "flex-start", "&:hover": { bgcolor: "#2990D6" } }}
          >
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

function FeedbackSection() {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 5, borderRadius: 3, borderColor: BORDER, borderStyle: "dashed", textAlign: "center" }}
    >
      <FeedbackOutlined sx={{ fontSize: 40, color: alpha(WAFFLE_BROWN, 0.15), mb: 1 }} />
      <Typography fontWeight={900} color={alpha(WAFFLE_BROWN, 0.25)} mb={0.5}>
        Customer Feedback
      </Typography>
      <Typography fontSize={13} color={alpha(WAFFLE_BROWN, 0.3)}>
        Customer feedback will appear here once the feature is implemented
      </Typography>
    </Paper>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("flavors");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace("/admin/login"); return; }
    authFetch(`${API}/auth/me`)
      .then((r) => {
        if (r.status === 401) { localStorage.removeItem("admin_token"); router.replace("/admin/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) { setOwner(data.owner); setLoading(false); } });
  }, [router]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handler = () => {
      for (const nav of NAV) {
        const section = document.getElementById(nav.id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 120) setActiveSection(nav.id);
        }
      }
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, [loading]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  const logout = () => { localStorage.removeItem("admin_token"); router.replace("/admin/login"); };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress sx={{ color: LOGO_BLUE }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "white" }}>
      <Box
        sx={{
          width: 220,
          flexShrink: 0,
          bgcolor: SIDEBAR_BG,
          borderRight: `1px solid ${BORDER}`,
          display: "flex",
          flexDirection: "column",
          py: 3,
          px: 2,
        }}
      >
        <Box sx={{ px: 1, mb: 4 }}>
          <Typography fontWeight={900} fontSize={15} color={WAFFLE_BROWN}>
            Roger's Homemade Ice Cream Admin
          </Typography>
          <Typography fontSize={11} color={alpha(WAFFLE_BROWN, 0.45)} noWrap>
            {owner?.email}
          </Typography>
        </Box>

        <Stack spacing={0.5} flex={1}>
          {NAV.map((item) => {
            const active = activeSection === item.id;
            return (
              <Box
                key={item.id}
                onClick={() => scrollTo(item.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: active ? alpha(LOGO_BLUE, 0.1) : "transparent",
                  color: active ? LOGO_BLUE : alpha(WAFFLE_BROWN, 0.65),
                  fontWeight: active ? 800 : 600,
                  fontSize: 14,
                  transition: "all 0.15s",
                  "&:hover": {
                    bgcolor: active ? alpha(LOGO_BLUE, 0.1) : alpha(WAFFLE_BROWN, 0.06),
                    color: active ? LOGO_BLUE : WAFFLE_BROWN,
                  },
                }}
              >
                {item.icon}
                {item.label}
              </Box>
            );
          })}
        </Stack>

        <Box
          onClick={logout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 1,
            borderRadius: 2,
            cursor: "pointer",
            color: alpha(WAFFLE_BROWN, 0.5),
            fontSize: 14,
            fontWeight: 600,
            "&:hover": { bgcolor: alpha(WAFFLE_BROWN, 0.06), color: WAFFLE_BROWN },
          }}
        >
          <Logout fontSize="small" />
          Logout
        </Box>
      </Box>

      <Box ref={mainRef} sx={{ flex: 1, overflowY: "auto", px: 5, py: 4 }}>
        <Typography variant="h5" fontWeight={900} color={WAFFLE_BROWN} mb={1}>
          Dashboard
        </Typography>
        <Typography fontSize={13} color={alpha(WAFFLE_BROWN, 0.45)} mb={5}>
          Manage your menu, pricing, and shop details.
        </Typography>

        <Section id="flavors" title="Flavors">
          <FlavorsSection />
        </Section>

        <Section id="prices" title="Prices">
          <PricesSection />
        </Section>

        <Section id="shop" title="Shop Info">
          <ShopInfoSection />
        </Section>

        <Section id="feedback" title="Feedback">
          <FeedbackSection />
        </Section>
      </Box>
    </Box>
  );
}
