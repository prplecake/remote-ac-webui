// eslint-disable-next-line @typescript-eslint/no-var-requires
const commitBranch = require("child_process")
  .execSync("git branch --show-current")
  .toString().trim();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString().trim();
const repoName = "remote-ac-webui";
const repoUrl = "https://github.com/prplecake/remote-ac-webui";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    COMMIT_BRANCH: commitBranch,
    COMMIT_HASH: commitHash,
    REPO_NAME: repoName,
    REPO_URL: repoUrl,
  }
};

module.exports = nextConfig;
