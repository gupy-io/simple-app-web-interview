export default async function handler(req, res) {
  const response = await fetch(
    `${process.env.RS_API_ADDRESS}/jobs/publish-job/${req.query.id}`,
    { method: "PATCH", headers: { "Content-Type": "application/json" } }
  );
  const data = await response.json();
  return res.status(response.status).json(data);
}
