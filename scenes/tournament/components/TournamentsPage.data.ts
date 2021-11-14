import { useData } from "solid-app-router";
import { createResource } from "solid-js";
import { InferQueryOutput, trpcClient } from "../../../utils/trpc-client";

export default function TournamentData({
  params,
}: {
  params: { organization: string; tournament: string };
}) {
  const [user] = createResource(
    () => [params.organization, params.tournament],
    ([organization, tournament]) =>
      trpcClient.query("tournament.get", {
        organization,
        tournament,
      })
  );

  return user;
}

export const useTournamentData = (delta?: number) =>
  useData<() => InferQueryOutput<"tournament.get">>(delta);
