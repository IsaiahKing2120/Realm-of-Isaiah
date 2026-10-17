import test from "node:test";
import assert from "node:assert/strict";
import {
  packetPaths,
  tracePacket,
  scramblePacket,
  createField,
  neighbors,
  revealSector,
  bootMissions,
} from "../src/data/quests.js";

test("every relay has a valid solution and starts disconnected", () => {
  packetPaths.forEach((path, level) => {
    assert.equal(new Set(path).size, path.length);
    assert.equal(tracePacket(level, Array(16).fill(0)).won, true);
    assert.equal(tracePacket(level, scramblePacket(level)).won, false);
    for (let i = 1; i < path.length; i++)
      assert.ok(
        Math.abs(path[i] - path[i - 1]) === 4 ||
          (Math.abs(path[i] - path[i - 1]) === 1 &&
            Math.floor(path[i] / 4) === Math.floor(path[i - 1] / 4)),
      );
  });
});
test("first sector and neighbors are safe at every start position", () => {
  for (let seed = 1; seed <= 30; seed++)
    for (let first = 0; first < 25; first++) {
      let state = seed;
      const random = () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };
      const mines = createField(first, random);
      assert.equal(new Set(mines).size, 5);
      assert.ok(
        [first, ...neighbors(first)].every((cell) => !mines.includes(cell)),
      );
      let opened = revealSector(first, mines, [], []);
      assert.ok(opened.includes(first));
      assert.ok(opened.every((cell) => !mines.includes(cell)));
      // A player can always finish through safe scanning, even without guessing.
      for (let cell = 0; cell < 25; cell++)
        if (!mines.includes(cell))
          opened = revealSector(cell, mines, opened, []);
      assert.equal(opened.length, 20);
    }
});
test("flags stop flood reveal and board edges do not wrap", () => {
  assert.deepEqual(neighbors(0), [1, 5, 6]);
  const mines = createField(0, () => 0.5);
  assert.ok(!revealSector(0, mines, [], [1]).includes(1));
  assert.deepEqual(revealSector(mines[0], mines, [], []), []);
});
test("boot missions have valid, achievable dependency graphs", () => {
  for (const mission of bootMissions) {
    const ids = new Set(mission.jobs.map((job) => job.id));
    assert.equal(ids.size, mission.jobs.length);
    const done = new Set();
    while (done.size < ids.size) {
      const available = mission.jobs.filter(
        (job) => !done.has(job.id) && job.needs.every((id) => done.has(id)),
      );
      assert.ok(available.length, `Blocked mission: ${mission.title}`);
      available.forEach((job) => {
        assert.ok(job.needs.every((id) => ids.has(id)));
        done.add(job.id);
      });
    }
  }
});
