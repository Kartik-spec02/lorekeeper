"use client"

import { useState } from "react";
import { characters, canonWarnings, mockPipelineResult, scenes } from "@/lib/mock-data";
import { AgentPipeline } from "@/components/pipeline/agent-pipeline";
import { usePipelineSimulation } from "@/components/pipeline/use-pipeline-simulation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [tab, setTab] = useState("characters");
  const { steps, isRunning, runPipeline } = usePipelineSimulation();
  const result = mockPipelineResult;

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lorekeeper</h1>
            <p className="text-muted-foreground">
              Narrative consistency co-pilot — pipeline run for{" "}
              <span className="font-medium text-foreground">{result.scene.title}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>Reset</Button>
            <Button onClick={runPipeline} disabled={isRunning}>
              {isRunning ? "Running…" : "Run pipeline"}
            </Button>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Agent Pipeline</CardTitle>
            <CardDescription>
              Router → Retriever → Generator → Critic → Validator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgentPipeline steps={steps} isRunning={isRunning} />
          </CardContent>
        </Card>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="scenes">Scenes</TabsTrigger>
            <TabsTrigger value="warnings">Canon Warnings</TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="space-y-3">
            {/* TODO: components/lore/CharacterCard.tsx */}
            {characters.map((c) => (
              <Card key={c.id}>
                <CardHeader>
                  <CardTitle>{c.name}</CardTitle>
                  <CardDescription>{c.lastSeenLocation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scenes" className="space-y-3">
            {/* TODO: components/scene/SceneCard.tsx */}
            {scenes.map((s) => (
              <Card key={s.id}>
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>
                    Emotional beat: {s.emotionalBeat}/10 · {s.characters.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {s.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="warnings" className="space-y-3">
            {/* TODO: components/arc/CanonWarningCard.tsx */}
            {canonWarnings.map((w) => (
              <Card key={w.id} className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        w.severity === "high" ? "destructive" : "secondary"
                      }
                    >
                      {w.severity}
                    </Badge>
                    <CardTitle className="text-base">{w.relatedCharacter}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{w.message}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Result Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Voice fidelity</span>{" "}
              <span className="font-semibold">{result.voiceFidelityScore}/100</span>
            </div>
            <div>
              <span className="text-muted-foreground">Warnings</span>{" "}
              <span className="font-semibold">{result.warnings.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Arc points</span>{" "}
              <span className="font-semibold">{result.arcData.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}