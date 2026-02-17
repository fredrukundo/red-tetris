import Cell from "./Cell";

export default function Board({ board }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${board[0]?.length ?? 10}, 24px)`,
    gap: 0,
    background: "rgba(0,0,0,0.35)",
    padding: 8,
    borderRadius: 12,
    width: "fit-content",
  };

  return (
    <div style={gridStyle}>
      {board.flat().map((cell, idx) => (
        <Cell key={idx} value={cell} />
      ))}
    </div>
  );
}
