import db from "./sql_lite";

export async function getBusPosition() {
  const stmt = db.prepare("SELECT * FROM bus_position");
  return stmt.all();
}
