import { mapWorkerListItemToWorker, type Worker } from "@/lib/worker-map"
import { getWorkers } from "@/services/workerService"

/** Fetches verified workers via the `get-workers` edge function. */
export async function fetchWorkers(
  payload: Parameters<typeof getWorkers>[0] = { page: 1, limit: 50 }
): Promise<Worker[]> {
  try {
    const result = await getWorkers(payload)
    return result.workers.map(mapWorkerListItemToWorker)
  } catch (err) {
    console.error(
      "fetchWorkers:",
      err instanceof Error ? err.message : "Failed to load workers"
    )
    return []
  }
}
