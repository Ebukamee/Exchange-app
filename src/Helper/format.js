// Pure formatting helpers — safe to import on the server (no client deps).

export const cut = (s) => {
  if (!s) return "there";
  return s.includes(" ") ? s.substring(0, s.indexOf(" ")) : s;
};

export const naira = (n) =>
  "₦" + Number(n || 0).toLocaleString("en-NG", { maximumFractionDigits: 2 });

export const formatDate = (value) => {
  const date = new Date(value);
  const d = date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const t = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
  return `${d} ${t}`;
};

export const statusMeta = (status) => {
  switch (status) {
    case "approved":
      return { label: "Approved", palette: "green" };
    case "rejected":
      return { label: "Rejected", palette: "red" };
    default:
      return { label: "Pending", palette: "yellow" };
  }
};

export const txTypeLabel = (type) =>
  ({ buy_crypto: "Buy Crypto", sell_crypto: "Sell Crypto", sell_giftcard: "Sell Gift Card" }[type] || type);

export const err = (s) => {
  if (!s) return "Something went wrong";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
