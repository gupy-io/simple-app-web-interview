export default async function handler(req, res) {
  const response = await fetch(
    `${process.env.RS_API_ADDRESS}/jobs/create-job`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: req.body,
      method: "POST",
    }
  );
  const data = await response.json();
  return res.status(response.status).json(data);
}
