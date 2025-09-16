import path from "node:path";
import * as core from "@actions/core";
import consola from "consola";
import { Octokit, RequestError } from "octokit";
import { getOwnerRepo } from "../../../lib";

function getWorkflowId(): string {
  let workflow: string = core.getInput("workflow", { required: true });
  workflow = workflow.split("@")[0]!;
  workflow = path.basename(workflow);
  return workflow;
}

export async function run(): Promise<void> {
  const [owner, repo] = getOwnerRepo();
  const token: string = core.getInput("token", { required: true });
  const octokit = new Octokit({ auth: token });
  const maxDeletions: number = Number.parseInt(
    core.getInput("max-deletions", { required: true }),
    10,
  );
  const workflow_id: string = getWorkflowId();

  const {
    data: { workflow_runs },
  } = await octokit.rest.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id,
    status: "cancelled",
    per_page: maxDeletions,
  });
  for (const run of workflow_runs) {
    try {
      core.info(
        `\
        Deleting cancelled workflow run: ${run.display_title}.
        ${run.name} #${run.run_number}: ${run.event} by ${run.actor?.login} 📅 ${run.created_at}`,
      );
      await octokit.rest.actions.deleteWorkflowRun({
        owner,
        repo,
        run_id: run.id,
      });
    } catch (err) {
      if (err instanceof RequestError) {
        if (err.status === 404) {
          consola.error(`${err}`);
        } else {
          core.error(`${err}`);
        }
      } else {
        core.error(`${err}`);
      }
    }
  }
}
