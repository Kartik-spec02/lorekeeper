import { useEffect, useRef, useState } from "react";
import type { AgentStep } from "@/lib/types";

const PIPELINE_STEPS: Omit<AgentStep, "status" | "latencyMs">[] = [
  { id: "router", name: "Router" },
  { id: "retriever", name: "Lore Retriever" },
  { id: "generator", name: "Generator" },
  { id: "critic", name: "Critic" },
  { id: "validator", name: "Validator" },
];

function buildIdleSteps(): AgentStep[] {
  return PIPELINE_STEPS.map((s) => ({ ...s, status: "idle" }));
}

function randomLatency(): number {
  return Math.floor(Math.random() * 221) + 80; // 80-300ms
}

export function usePipelineSimulation() {
  const [steps, setSteps] = useState<AgentStep[]>(buildIdleSteps);
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cursorRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  function runPipeline() {
    if (activeRef.current) return;
    activeRef.current = true;
    setIsRunning(true);
    cursorRef.current = 0;
    timersRef.current = [];
    setSteps(buildIdleSteps());

    function runNext() {
      const index = cursorRef.current;
      if (index >= PIPELINE_STEPS.length) {
        activeRef.current = false;
        setIsRunning(false);
        return;
      }

      setSteps((prev) =>
        prev.map((s, i) =>
          i === index ? { ...s, status: "running" } : s
        )
      );

      const latency = randomLatency();
      timersRef.current.push(
        setTimeout(() => {
          setSteps((prev) =>
            prev.map((s, i) =>
              i === index ? { ...s, status: "done", latencyMs: latency } : s
            )
          );
          cursorRef.current += 1;
          runNext();
        }, 400)
      );
    }

    runNext();
  }

  return { steps, isRunning, runPipeline };
}