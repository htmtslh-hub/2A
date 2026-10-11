// Finite RAF timelines: works even when CSS animation / WAAPI is disabled.
// The current page may pause motion; new visits always start enabled.
type Job = { frame: number; draw: (progress: number) => void; done?: () => void };
export function createAdminMotion() {
  const jobs = new Map<object | string, Job>();
  let enabled = true;
  const cancel = (key: object | string) => {
    const old = jobs.get(key);
    if (old) cancelAnimationFrame(old.frame);
    jobs.delete(key);
  };
  return {
    cancel,
    run(key: object | string, duration: number, draw: Job['draw'], done?: Job['done'], delay = 0) {
      cancel(key);
      if (!enabled) { draw(1); done?.(); return; }
      const start = performance.now() + delay;
      const job: Job = { frame: 0, draw, done };
      jobs.set(key, job); draw(0);
      const frame = (time: number) => {
        if (jobs.get(key) !== job) return;
        const t = Math.max(0, Math.min(1, (time - start) / duration));
        draw(1 - Math.pow(1 - t, 3));
        if (t < 1) job.frame = requestAnimationFrame(frame);
        else { jobs.delete(key); done?.(); }
      };
      job.frame = requestAnimationFrame(frame);
    },
    setEnabled(value: boolean) {
      enabled = value;
      if (!value) {
        const remaining = [...jobs.values()];
        for (const job of remaining) cancelAnimationFrame(job.frame);
        jobs.clear();
        for (const job of remaining) { job.draw(1); job.done?.(); }
      }
    },
    destroy() {
      for (const job of jobs.values()) cancelAnimationFrame(job.frame);
      jobs.clear();
    },
  };
}
export type AdminMotion = ReturnType<typeof createAdminMotion>;
