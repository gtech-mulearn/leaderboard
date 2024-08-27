import { formatISO, parseISO, startOfDay, subDays } from "date-fns";
import { fetchMergeEvents, fetchOpenPulls } from "./fetchUserData.js";
import { IGitHubEvent, ProcessData } from "./types.js";
import { fetchEvents } from "./fetchEvents.js";
import { parseEvents } from "./parseEvents.js";
import { mergedData } from "./saveData.js";
import { scrapeDiscussions } from "./discussion.js";

let processedData: ProcessData = {};

const scrapeGitHub = async (
  org: string,
  endDate: Date,
  startDate: Date,
): Promise<void> => {
  console.log(
    `Scraping GitHub data for ${org} from ${formatISO(startDate)} to ${formatISO(endDate)}`,
  );
  const events = await fetchEvents(org, startDate, endDate);
  processedData = await parseEvents(events as IGitHubEvent[]);
  for (const user of Object.keys(processedData)) {
    if (!processedData[user]) {
      processedData[user] = {
        authored_issue_and_pr: [],
        last_updated: "",
        activity: [],
        open_prs: [],
      };
    }
    try {
      const merged_prs = await fetchMergeEvents(user, org);
      for (const pr of merged_prs) {
        processedData[user].authored_issue_and_pr.push(pr);
      }
    } catch (e) {
      console.error(`Error fetching merge events for ${user}: ${e}`);
    }
    try {
      const open_prs = await fetchOpenPulls(user, org);
      for (const pr of open_prs) {
        processedData[user].open_prs.push(pr);
      }
    } catch (e) {
      console.error(`Error fetching open pulls for ${user}: ${e}`);
    }
  }

  console.log("Scraping completed");
};

const main = async () => {
  // Extract command line arguments (skip the first two default arguments)
  const args: string[] = process.argv.slice(2);

  // Destructure arguments with default values
  const [orgName, dataDir, dateArg = null, numDays = 1] = args;

  if (!orgName || !dataDir) {
    console.error("Usage: node script.js <org> <dataDir> [date] [numDays]");
    process.exit(1);
  }

  let date: string;
  try {
    if (dateArg) {
      date = new Date(dateArg).toISOString();
    } else {
      date = formatISO(new Date(), { representation: "date" });
    }
  } catch (error) {
    console.error("Invalid date value:", dateArg);
    process.exit(1);
  }
  const endDate = parseISO(date);
  const startDate = subDays(endDate, Number(numDays));

  await scrapeGitHub(orgName, endDate, startDate);
  await mergedData(dataDir, processedData);
  await scrapeDiscussions(orgName, dataDir, endDate, startDate);

  console.log("Done");
};

main();
