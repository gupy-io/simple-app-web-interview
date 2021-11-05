export default async function handler(_, res) {
  const jobsResponse = await fetch(
    `${process.env.RS_API_ADDRESS}/jobs/list-all-jobs`
  );
  const jobsData = await jobsResponse.json();
  const applicationsData = await Promise.all(
    jobsData.data.map(async (job) => {
      const applicationsResponse = await fetch(
        `${process.env.RS_API_ADDRESS}/jobs/view-applications/${job.id}`
      );
      const applicationsData = (await applicationsResponse.json()).data;

      return {
        job: {
          id: job.id,
          name: job.name,
        },
        applications: applicationsData.map((application) => ({
          id: application.id,
          name: application.name,
          email: application.email,
        })),
      };
    })
  );

  const data = applicationsData.reduce((applications, info) => {
    return [
      ...applications,
      ...info.applications.map((application) => ({
        ...application,
        job: info.job,
      })),
    ];
  }, []);
  return res.status(jobsResponse.status).json({
    data: data
      .filter(
        (info, index, collection) =>
          collection.findIndex(
            (item) => item.id === info.id && item.job.id === info.job.id
          ) === index
      )
      .sort((a1, a2) => a1.name.localeCompare(a2.name)),
  });
}
