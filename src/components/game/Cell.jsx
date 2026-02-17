export default function Cell({ value }) {
  const style = {
    width: 24,
    height: 24,
    border: "1px solid rgba(255,255,255,0.08)",
    background: value === 0 ? "transparent" : "rgba(255,0,0,0.6)",
  };
  return <div style={style} />;
}
