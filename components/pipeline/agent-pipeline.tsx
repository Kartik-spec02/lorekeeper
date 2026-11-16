"use client";

import { motion } from "framer-motion";
import { Check, CircleX, LoaderCircle, Workflow } from "lucide-react";
import type { AgentStep, AgentStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  AgentStatus,
  { label: string; ring: string; icon: React.ReactNode }
> = {
  idle: {
    label: "Idle",
    ring: "border-border bg-muted/40 text-muted-foreground",
    icon: null,
  },
  running: {
    label: "Running",
    ring: "border-amber-400 bg-amber-500/10 text-amber-300",
    icon: <LoaderCircle className="h-4 w-4 animate-spin" />,
  },
  done: {
    label: "Done",
    ring: "border-emerald-400 bg-emerald-500/10 text-emerald-300",
    icon: <Check className="h-4 w-4" />,
  },
  error: {
    label: "Error",
    ring: "border-red-500 bg-red-500/10 text-red-300",
    icon: <CircleX className="h-4 w-4" />,
  },
};

const STEP_ICONS: Record<string, React.ReactNode> = {
  router: <Workflow className="h-5 w-5" />,
};

export interface AgentPipelineProps {
  steps: AgentStep[];
  isRunning: boolean;
}

export function AgentPipeline({ steps, isRunning }: AgentPipelineProps) {
  const totalLatency = steps.reduce(
    (sum, s) => sum + (s.latencyMs ?? 0),
    0
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-stretch gap-x-2 gap-y-4 sm:gap-x-3">
        {steps.map((step, index) => {
          const cfg = STATUS_CONFIG[step.status];
          const isLast = index === steps.length - 1;
          const isDone = step.status === "done";
          const isRunningStep = step.status === "running";

          return (
            <motion.div
              key={step.id}
              className="flex min-w-[150px] flex-1 flex-col items-center text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <div className="flex w-full items-center gap-2">
                {index > 0 && (
                  <Connector done={steps[index - 1].status === "done"} />
                )}

                <motion.div
                  className={`flex flex-1 flex-col items-center gap-2 rounded-xl border px-3 py-3 ring-1 ring-foreground/5 ${cfg.ring}`}
                  animate={
                    isRunningStep
                      ? {
                          scale: [1, 1.03, 1],
                          boxShadow:
                            "0 0 0 4px hsla(45 90% 60% / 0.25)",
                        }
                      : {}
                  }
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">
                      {STEP_ICONS[step.id] ?? cfg.icon ?? (
                        <LoaderCircle className="h-5 w-5" />
                      )}
                    </span>
                    <span className="text-sm font-semibold">{step.name}</span>
                  </div>

                  <Badge status={step.status} />

                  {isDone && step.latencyMs != null && (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {step.latencyMs}ms
                    </span>
                  )}
                </motion.div>
              </div>

              {!isLast && (
                <div className="mt-2 hidden sm:block">
                  <Connector done={isDone} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-4 flex justify-center"
        key={totalLatency}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
          Total pipeline: {totalLatency}ms
          {isRunning && <span className="ml-2 animate-pulse text-amber-400">● running</span>}
        </span>
      </motion.div>
    </div>
  );
}

function Badge({ status }: { status: AgentStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${cfg.ring}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function Connector({ done }: { done: boolean }) {
  return (
    <motion.div
      className="flex h-0.5 w-6 shrink-0 rounded-full sm:w-8"
      initial={{ backgroundColor: "hsl(var(--border))" }}
      animate={{
        backgroundColor: done ? "hsl(160 84% 40%)" : "hsl(var(--border))",
        boxShadow: done ? "0 0 8px hsl(160 84% 40% / 0.5)" : "none",
      }}
      transition={{ duration: 0.4 }}
    />
  );
}