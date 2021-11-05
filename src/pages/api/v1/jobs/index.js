export default async function handler(_, res) {
  const response = await fetch(
    `${process.env.RS_API_ADDRESS}/jobs/list-all-jobs`
  );
  const data = await response.json();
  return res.status(response.status).json(data);
}
