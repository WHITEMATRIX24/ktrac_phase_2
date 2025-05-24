// app/api/report-dock/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/sql_lite';

export async function POST(req: NextRequest) {
  try {
    const {
      bonnetNo,
      dockReason,
      todayStatus,
      reportedBy,
      vehicle,
    } = await req.json();

    const createdAt = new Date();
    const createdAtIso = createdAt.toISOString();
    const dateOnly = createdAtIso.split('T')[0];

    // Get next SL NO for classwise_dock
    const lastDockSl = db.prepare(`
      SELECT MAX("SL NO") as maxSlNo FROM classwise_dock
    `).get() as { maxSlNo: number | null };
    const newDockSlNo = (lastDockSl?.maxSlNo ?? 0) + 1;

    // Check if there's already an entry for this bus class today
    const existingClassDock = db.prepare(`
      SELECT rowid, "No. of Buses on Dock" 
      FROM classwise_dock 
      WHERE "CLASS OF BUS" = ? 
        AND DATE("created_at") = ?
    `).get(vehicle.CLASS, dateOnly) as { rowid: number, "No. of Buses on Dock": number } | undefined;

    if (existingClassDock) {
      const updateDock = db.prepare(`
        UPDATE classwise_dock 
        SET "No. of Buses on Dock" = ?, "updated_at" = ?
        WHERE rowid = ?
      `);
      updateDock.run(existingClassDock["No. of Buses on Dock"] + 1, createdAtIso, existingClassDock.rowid);
    } else {
      const insertDock = db.prepare(`
        INSERT INTO classwise_dock (
          "SL NO", "CLASS OF BUS", "No. of Buses on Dock", "created_at", "updated_at"
        ) VALUES (?, ?, ?, ?, ?)
      `);
      insertDock.run(newDockSlNo, vehicle.CLASS, 1, createdAtIso, createdAtIso);
    }

    // Get next SL NO for docked_buses of the same day
    const lastBusSl = db.prepare(`
      SELECT MAX("SL NO") as maxSlNo 
      FROM dock_busess 
      WHERE DATE("created_at") = ?
    `).get(dateOnly) as { maxSlNo: number | null };
    const newBusSlNo = (lastBusSl?.maxSlNo ?? 0) + 1;
    const insertBusDock = db.prepare(`
      INSERT INTO dock_busess (
        "SL NO", "BONNET NO", "CLASS", "REG NO", "DOCK REASON", 
        "TODAY\nstatus", "ALLOTTED DEPOT", "REPORT ED BY", 
        "created_at", "updated_at"
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertBusDock.run(
      newBusSlNo,
      bonnetNo,
      vehicle.CLASS,
      vehicle.REGNO,
      dockReason,
      todayStatus,
      vehicle.DEPOT,
      reportedBy,
      createdAtIso,
      createdAtIso
    );

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error('Insert error:', error);
    return NextResponse.json({ error: 'Failed to insert dock info' }, { status: 500 });
  }
}
