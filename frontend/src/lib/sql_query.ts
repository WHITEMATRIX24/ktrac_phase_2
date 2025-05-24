"use server";

import db from "./sql_lite";

export async function getBusPosition() {
  const stmt = db.prepare("SELECT * FROM bus_position");
  return stmt.all();
}

export async function getDockBusses() {
  const stmt = db.prepare("SELECT * FROM dock_busess");
  return stmt.all();
}

export async function getEnrouteBusses() {
  const stmt = db.prepare("SELECT * FROM enroute_busess");
  return stmt.all();
}

export async function getClasswiseDock() {
  const stmt = db.prepare("SELECT * FROM classwise_dock");
  return stmt.all();
}

export async function getUnitwiseBusDeployment() {
  const stmt = db.prepare("SELECT * FROM unitwise_bus_deployment");
  return stmt.all();
}

