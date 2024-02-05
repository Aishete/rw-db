import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "wSK1Z6Si2nMyLBgtW1cVu2", // ID of a project you are using
      token:
        "URS3pzpbh3mNIJrB7OeTMeG3okl0nwZ4rfUQ6q5rTHnPnmDbJm2qbaf8StR87dfPzltC6Fqft6DPe8A", // API token for that project
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});
